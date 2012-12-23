var TOI = {};

TOI.DEBUG = {};

TOI.TIME = [
0
];



TOI.CONFIG = {
    'numPoints': 9,
    'frameTypes': []
};
// the different frame types are constructed from these arrays
TOI.CONFIG.frameTypes[0] = ['marker0','word0','word0','letter0','paragraph0','paragraph0','letter1','paragraph0','paragraph0'];
TOI.CONFIG.frameTypes[1] = ['letter0','marker0','letter1','paragraph0','paragraph0','letter2','paragraph0','paragraph0','letter3'];
TOI.CONFIG.frameTypes[2] = ['word0','word0','marker0','paragraph0','paragraph0','letter0','paragraph0','paragraph0','letter1'];
TOI.CONFIG.frameTypes[3] = ['letter0','word0','word0','marker0','word1','word1','letter1','word2','word2'];
TOI.CONFIG.frameTypes[4] = ['letter0','letter1','letter2','letter3','marker0','letter4','letter5','letter6','letter7'];
TOI.CONFIG.frameTypes[5] = ['word0','word0','letter0','word1','word1','marker0','word2','word2','letter1'];
TOI.CONFIG.frameTypes[6] = ['letter0','paragraph0','paragraph0','letter1','paragraph0','paragraph0','marker0','word0','word0'];
TOI.CONFIG.frameTypes[7] = ['letter0','paragraph0','paragraph0','letter1','paragraph0','paragraph0','letter2','marker0','letter3'];
TOI.CONFIG.frameTypes[8] = ['paragraph0','paragraph0','letter0','paragraph0','paragraph0','letter1','word0','word0','marker0'];
TOI.CONFIG.calcFrameConfigs = function() {
    var returnArray = [];

    for (var index=0;index<this.frameTypes.length;index++) {
        returnArray.push([]);

        var frameType = this.frameTypes[index];
        var frameConfig = returnArray[index];

        var capturedObjects = [];
        var objCount = 0;

        for (var i=0;i<frameType.length;i++) {
            var captured = false;
            for (var j=0;j<capturedObjects.length;j++) {
                if (frameType[i] === capturedObjects[j]) {
                    captured = true;
                    break;
                }
            }
            if (!captured) {
                frameConfig.push([frameType[i].slice(0,frameType[i].length-1),i]);
                capturedObjects.push(frameType[i]);
                objCount++;
            }
        }

    }
    return returnArray;
};
TOI.CONFIG.frameConfigs = TOI.CONFIG.calcFrameConfigs();



TOI.DATA = {};
TOI.createDoc = function(docs, atom) {
    docs[atom] = { _id:atom, letterhood:[], wordhood:[], paragraphhood:[], letters:{}, words:{}, paragraphs:{} };    
    return docs[atom];
};
TOI.getAtom = function(atom) {
    if (!TOI.DATA.DOCS.hasOwnProperty(atom)) {
        return TOI.createDoc(TOI.DATA.DOCS, atom);
    } else {
        return TOI.DATA.DOCS[atom];
    }
};
TOI.calcLinearDist = function(i) {
    return 1/Math.pow(i,1);
};
TOI.calcSquareDist = function(i) {
    return 1/Math.pow(i,2);
};
TOI.updateDist = function(atom, type, connection, newDist) {
    //console.log('updateDist', atom, type, connection, newDist);
    if (!atom[type].hasOwnProperty(connection)) {
        atom[type][connection] = newDist;
    } else {
        atom[type][connection] += newDist;
    }
};



TOI.DATA.calcPartialHood = function(obj, array, hoodSize) {
    console.log('calcHood begin', obj, array, array.length);
    var pairs = _.pairs(obj);
    var sortedPairs = _.sortBy(pairs, function(innerEl, innerI, innerList) {
        return innerEl[1];
    });

    var currentLength = array.length;
    var iterLength = hoodSize;
    if (sortedPairs.length < hoodSize) {
        iterLength = sortedPairs.length;
    }
    for (var i=currentLength;i<iterLength;i++) {
        array[i] = sortedPairs[i-currentLength][0];
    }
    console.log('calcHood end', obj, array, array.length);
};
TOI.DATA.calcCompleteHood = function(atom, type, hoodSize) {
    var toi = TOI.getAtom;

    var obj = atom[type+'s'];
    var arr = atom[type+'hood'];

    this.calcPartialHood(obj,arr, hoodSize);
    if (arr.length < hoodSize) {
        if (arr.length > 0) {
            obj = toi(atom[type+'hood'][0])[type+'s'];
            arr = toi(atom[type+'hood'][0])[type+'hood'];
            console.log('try',atom[type+'hood'][0]);
            this.calcPartialHood(obj, arr, hoodSize);
            arr = atom[type+'hood'];
            this.calcPartialHood(obj, arr, hoodSize);
        }
    }
    if (arr.length < hoodSize) {
        if (arr.length > 1) {
            obj = toi(atom[type+'hood'][1])[type+'s'];
            arr = toi(atom[type+'hood'][1])[type+'hood'];
            console.log('try',atom[type+'hood'][1]);
            this.calcPartialHood(obj, arr, hoodSize);
            arr = atom[type+'hood'];
            this.calcPartialHood(obj, arr, hoodSize);
        }
    }
};
TOI.DATA.calcNeighborhoods = function(docs) {
    var that = this;

    var LETTERHOODSIZE = 8;
    var WORDHOODSIZE = 3;
    var PARAGRAPHHOODSIZE = 1;

    var obj = {};
    var arr = []; 

    _.each(docs, function(atom, i, list) {
        console.log('letter',atom['_id']);    
        that.calcCompleteHood(atom, 'letter', LETTERHOODSIZE);
        //console.log('el["letterhood"]',el['letterhood']);
    });

    _.each(docs, function(atom, i, list) {
        console.log('word',atom['_id']);    
        that.calcCompleteHood(atom,'word', WORDHOODSIZE);
    });

    /*
    _.each(docs, function(el, i, list) {
        console.log('paragraph',el['_id']);    
        obj = el['paragraphs'];

        that.calcHood(obj,el['paragraphhood'],PARAGRAPHHOODSIZE);
    });
    */

    console.log('initial parse complete',docs);
    _.each(docs, function(el, i, list) {
        //console.log('initial parse complete',el['letterhood'].length,el['wordhood'].length,el['paragraphhood'].length);
    });
};



TOI.DATA.parseAlphabet = function(docs, letters) {

    var toi = TOI.getAtom;
    var dist = TOI.calcLinearDist;
    var sqDist = TOI.calcSquareDist;
    var update = TOI.updateDist;

    for (var i=0;i<letters.length;i++) {
        var thisLetter = letters[i];

        // perform higher level processing
        // 1(a) connect letters with simultaneously adjacent letters
        for (var j=1;j<=letters.length;j++) {
            // connect in forward direction
            if (i+j < letters.length) {
                update(toi(thisLetter), 'letters', letters[i+j], sqDist(j));
            }
            // connect in backwards direction
            if (i-j >= 0) {
                update(toi(thisLetter), 'letters', letters[i-j], sqDist(j));
            }
        }
        //console.log('letters[i]', docs[letters[i]]);
    }

};
TOI.DATA.parseWordset = function(docs, words) {

    var toi = TOI.getAtom;
    var dist = TOI.calcLinearDist;
    var sqDist = TOI.calcSquareDist;
    var update = TOI.updateDist;

    for (var i=0;i<words.length;i++) {
        var thisWord = words[i];

        // perform lower level processing
        this.parseAlphabet(docs, thisWord); 

        // perform higher level processing
        // iterate through letters
        for (var j=0;j<thisWord.length;j++) {
            var thisLetter = thisWord[j];

            // 1(a) connect this word to the letters it contains
            update(toi(thisWord), 'letters', thisLetter, dist(j+1));
            // 1(b) connect the letters it contains to the word
            update(toi(thisLetter), 'words', thisWord, sqDist(j+1));
        }

        // 2(a) connect words with closest simultaneously adjacent words
        for (var j=1;j<=10;j++) {
            // connect forwards
            if (i+j < words.length) {
                update(toi(thisWord), 'words', words[i+j], dist(j));
            }
            // connect backwords
            if (i-j >= 0) {
                update(toi(thisWord), 'words', words[i-j], dist(j));
            }
        }
    }
};
TOI.DATA.parseParagraphset = function(docs, paragraphs) {

    var toi = TOI.getAtom;
    var dist = TOI.calcLinearDist;
    var sqDist = TOI.calcSquareDist;
    var update = TOI.updateDist;

    for (var i=0;i<paragraphs.length;i++) {
        var thisPara = paragraphs[i];

        // perform lower level processing
        this.parseWordset(docs, thisPara); 

        // perform higher level processing
        // iterate through words
        for (var j=0;j<thisPara.length;j++) {
            var thisWord = thisPara[j];
            var firstLetter = thisWord[0];
            // 1(a) connect the paragraph to the firstLetter of the words it contains
            update(toi(thisPara), 'letters', firstLetter, dist(j+1));
            // 1(b) connect first letter of the words it contains to the paragraph
            update(toi(firstLetter), 'paragraphs', thisPara, dist(j+1));
            // 2(a) connect the paragraph to the words it contains
            update(toi(thisPara), 'words', thisWord, sqDist(j+1));
            // 2(b) connect words it contains to the paragraph
            update(toi(thisWord), 'paragraphs', thisPara, sqDist(j+1));
        }

        // 3(a) connect paragraphs with closest simultaneously adjacent paragraphs
        for (var j=1;j<=10;j++) {
            // connect in forward direction
            if (i+j < paragraphs.length) {
                update(toi(thisPara), 'paragraphs', paragraphs[i+j], dist(j));
            }
            // connect in backward direction
            if (i-j >= 0) {
                update(toi(thisPara), 'paragraphs', paragraphs[i-j], sqDist(j));
            }
        }
    }

};



// a letter is adjacent to at most 4 letters, 3 words, 1 paragraph
// a word is adjacent to at most 8 letters, 3 words, 1 paragraph
// a paragraph is adjacent to at most 8 letters, 3 words, 1 paragraph
TOI.DATA.INIT = [['toimawb','is','a','typewriter','and','notebook'], ['toimawb', 'is', 'a', 'tool', 'for', 'introspection'], ['toimawb', 'finds', 'patterns', 'in', 'your', 'thoughts']]; 
TOI.DATA.TRAIL = _.union(TOI.DATA.INIT.paragraphs);
TOI.DATA.DOCS = {};
// the first pass through the initial data seed
TOI.DATA.INIT.process = function(docs, paragraphs) {
    console.log('parsing', paragraphs, 'into', docs);
    TOI.DATA.parseParagraphset(docs, paragraphs);
};
TOI.DATA.INIT.process(TOI.DATA.DOCS, TOI.DATA.INIT);
TOI.DATA.calcNeighborhoods(TOI.DATA.DOCS);



TOI.start = function() {
    var frame = document.getElementById('app-frm');
    var body = document.getElementById('app-bdy');

    var obj = [];
    var text = [];
    for (var i=0;i<9;i++) {
        obj[i] = document.createElement('div');
        text[i] = document.createElement('p');
        obj[i].appendChild(text[i]);
    }

    var cellNumber = 3;
    var markedThought = '';
    var previousFrame = [];

    var cellWidth = frame.offsetWidth/cellNumber;
    var cellHeight = frame.offsetHeight/cellNumber;
    var pos = [
    {x:0,y:0},{x:cellWidth,y:0},{x:cellWidth*2,y:0},
    {x:0,y:cellHeight},{x:cellWidth,y:cellHeight},{x:cellWidth*2,y:cellHeight},
    {x:0,y:cellHeight*2},{x:cellWidth,y:cellHeight*2},{x:cellWidth*2,y:cellHeight*2},
    ];



    function setType(el, type) {
        var padding = 2+20;
        switch(type) {
            case 'marker':
                el.style.width = cellWidth-padding+'px';
                el.style.height = cellHeight-padding+'px';
                el.className = 'marker';
                break;
            case 'paragraph':
                el.style.width = cellWidth*2-padding+'px';
                el.style.height = cellHeight*2-padding+'px';
                el.className = 'paragraph';
                break;
            case 'word':
                el.style.width = cellWidth*2-padding+'px';
                el.style.height = cellHeight-padding+'px';
                el.className = 'word';
                break;
            case 'letter':
                el.style.width = cellWidth-padding+'px';
                el.style.height = cellHeight-padding+'px';
                el.className = 'letter';
                break;
        }
        el.className += ' frame-obj';
    }
    function setPos(el, index) {
        el.style.left = pos[index].x+'px';
        el.style.top = pos[index].y+'px';
        frame.appendChild(el);
    }
    function clearText(el) {
        el.innerHTML = '';
    }
    function setText(el, text) {
        el.innerHTML = text;
    }



    function setFrame(index) {
        var frameConfig = TOI.CONFIG.frameConfigs[index];

        var letters = TOI.DATA.INIT.letters;
        var words = TOI.DATA.INIT.words;
        var paragraphs = TOI.DATA.INIT.paragraphs;

        clearFrame();

        for (var i=0;i<frameConfig.length;i++) {
            setType(obj[i],frameConfig[i][0]);             
            if (frameConfig[i][0] === 'letter') {
                setText(text[i],letters[0]);
            } else if (frameConfig[i][0] === 'word') {
                setText(text[i],words[0]);
            } else if (frameConfig[i][0] === 'paragraph') {
                setText(text[i],paragraphs[0]);
            }
            setPos(obj[i],frameConfig[i][1]);
        }
    }
    function clearFrame() {
        frame.innerHTML = '';
        for (var i=0;i<text.length;i++) {
            clearText(text[i]);
        }
    }



    var frameMouseClickFunc = function(ev) {
        updateFrame(ev.x,ev.y);
    };
    var frameMouseMoveFunc = function(ev) {
        updateFrame(ev.x,ev.y);
    };
    var updateFrame = function(xIn,yIn) {
        // figure out position from mousePosition
        var x = Math.floor((xIn-frame.offsetLeft+body.scrollLeft) / cellWidth);
        var y = Math.floor((yIn-frame.offsetTop+body.scrollTop) / cellHeight);

        // calculate index based on position
        var index = x+(3*y);
        // clear frame
        setFrame(index);
    };

    frame.addEventListener('mousemove', frameMouseMoveFunc);
    frame.addEventListener('click', frameMouseClickFunc);
};



TOI.start();
