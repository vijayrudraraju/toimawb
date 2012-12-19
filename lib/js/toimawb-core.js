var TOIMAWB = {};



TOIMAWB.TIME = [
0
];



TOIMAWB.CONFIG = {
    'numPoints': 9,
    'frameTypes': []
};
// the different frame types are constructed from these arrays
TOIMAWB.CONFIG.frameTypes[0] = ['marker0','word0','word0','letter0','paragraph0','paragraph0','letter1','paragraph0','paragraph0'];
TOIMAWB.CONFIG.frameTypes[1] = ['letter0','marker0','letter1','paragraph0','paragraph0','letter2','paragraph0','paragraph0','letter3'];
TOIMAWB.CONFIG.frameTypes[2] = ['word0','word0','marker0','paragraph0','paragraph0','letter0','paragraph0','paragraph0','letter1'];
TOIMAWB.CONFIG.frameTypes[3] = ['letter0','word0','word0','marker0','word1','word1','letter1','word2','word2'];
TOIMAWB.CONFIG.frameTypes[4] = ['letter0','letter1','letter2','letter3','marker0','letter4','letter5','letter6','letter7'];
TOIMAWB.CONFIG.frameTypes[5] = ['word0','word0','letter0','word1','word1','marker0','word2','word2','letter1'];
TOIMAWB.CONFIG.frameTypes[6] = ['letter0','paragraph0','paragraph0','letter1','paragraph0','paragraph0','marker0','word0','word0'];
TOIMAWB.CONFIG.frameTypes[7] = ['letter0','paragraph0','paragraph0','letter1','paragraph0','paragraph0','letter2','marker0','letter3'];
TOIMAWB.CONFIG.frameTypes[8] = ['paragraph0','paragraph0','letter0','paragraph0','paragraph0','letter1','word0','word0','marker0'];
TOIMAWB.CONFIG.calcFrameConfigs = function() {
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
}
TOIMAWB.CONFIG.frameConfigs = TOIMAWB.CONFIG.calcFrameConfigs();



TOIMAWB.DATA = {};
TOIMAWB.DATA.createDoc = function(docs, atom) {
    docs[atom] = { _id:atom, letterhood:[], wordhood:[], paragraphhood:[], letters:{}, words:{}, paragraphs:{} };    
};
TOIMAWB.DATA.calcHood = function(obj, array, hoodSize) {
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
        array[i] = sortedPairs[i][0];
    }
};
TOIMAWB.DATA.calcNeighborhoods = function(docs) {
    var that = this;

    var LETTERHOODSIZE = 8;
    var WORDHOODSIZE = 3;
    var PARAGRAPHHOODSIZE = 1;

    _.each(docs, function(el, i, list) {
        //console.log('el',el['_id']);    

        // we need to find a complete neighborhood
        var obj = el['letters'];
        var trialCount = 0;
        while (el['letterhood'].length < LETTERHOODSIZE) {
            //console.log('letter trial',trialCount,obj);
            that.calcHood(obj,el['letterhood'], LETTERHOODSIZE);
            //console.log('el["letterhood"]',el['letterhood']);
            if (el['letterhood'].length > trialCount) {
                obj = docs[el['letterhood'][trialCount]]['letters'];
            }
            //console.log('next',obj,trialCount);
            if (trialCount >= LETTERHOODSIZE) {
                console.log(' ');
                console.log('WHERE ARE YOU LETTERS');
                console.log(el);
                console.log(' ');
                break;
            }
            trialCount++;
        }
    });

    _.each(docs, function(el, i, list) {
        //console.log('el',el['_id']);    

        obj = el['words'];
        trialCount = 0;
        while (el['wordhood'].length < WORDHOODSIZE) {
            //console.log('word trial',trialCount,obj);
            that.calcHood(obj,el['wordhood'], WORDHOODSIZE);
            //console.log('el["wordhood"]',el['wordhood']);
            if (el['wordhood'].length > trialCount) {
                //console.log(docs[el['wordhood'][trialCount]]['words']);
                obj = docs[el['wordhood'][trialCount]]['words'];
            }
            if (trialCount >= WORDHOODSIZE) {
                console.log(' ');
                console.log('WHERE ARE YOU WORDS');
                console.log(el);
                console.log(' ');
                break;
            }
            trialCount++;
        }
    });

    _.each(docs, function(el, i, list) {
        console.log('el',el['_id']);    

        obj = el['paragraphs'];
        trialCount = 0;
        while (el['paragraphhood'].length < PARAGRAPHHOODSIZE) {
            //console.log('paragraph trial',trialCount,obj);
            that.calcHood(obj,el['paragraphhood'],PARAGRAPHHOODSIZE);
            if (el['wordhood'].length > trialCount) {
                //console.log('setting',docs[el['wordhood'][trialCount]]['paragraphs']);
                obj = docs[el['wordhood'][trialCount]]['paragraphs'];
            }
            if (trialCount > PARAGRAPHHOODSIZE) {
                console.log(' ');
                console.log('WHERE ARE YOU PARAGRAPHS');
                console.log(el);
                console.log(' ');
                break;
            }
            trialCount++;
        }
        console.log('el["paragraphhood"]',el['paragraphhood']);
    });
};
TOIMAWB.DATA.parseAlphabet = function(docs, letters) {
    for (var i=0;i<letters.length;i++) {
        if (!docs.hasOwnProperty(letters[i])) {
            this.createDoc(docs, letters[i]);
            //docs[words[i]] = { _id:letters[i], letterhood:[], wordhood:[], paragraphhood:[], letters:{}, words:{}, paragraphs:{} };    
        }
        // connect letters with simultaneously adjacent letters
        for (var j=1;j<=letters.length;j++) {
            // connect forward
            if (i+j < letters.length) {
                if (!docs[letters[i]]['letters'].hasOwnProperty(letters[i+j])) {
                    //console.log('forward', i, j, docs[letters[i]]['letters'][letters[i+j]], 1/Math.pow(j,1));
                    docs[letters[i]]['letters'][letters[i+j]] = 1/Math.pow(j,2);
                } else {
                    docs[letters[i]]['letters'][letters[i+j]] += 1/Math.pow(j,2);
                }
            }

            // connect backwards
            if (i-j >= 0) {
                if (!docs[letters[i]]['letters'].hasOwnProperty(letters[i-j])) {
                    //console.log('back', i, j, docs[letters[i]]['letters'][letters[i-j]], 1/Math.pow(j,1));
                    docs[letters[i]]['letters'][letters[i-j]] = 1/Math.pow(j,3);
                } else {
                    docs[letters[i]]['letters'][letters[i-j]] += 1/Math.pow(j,3);
                }
            }
        }
        //console.log('letters[i]', docs[letters[i]]);
    }
};
TOIMAWB.DATA.parseWordset = function(docs, words) {
    for (var i=0;i<words.length;i++) {
        // perform lower level processing
        this.parseAlphabet(docs, words[i]); 

        // perform higher level processing

        // connect words to the first letter it contains
        //console.log(i,0,words[i][0], 1/Math.pow(j+1,2));
        if (!docs.hasOwnProperty(words[i])) {
            this.createDoc(docs, words[i]);
            //docs[words[i]] = { _id:words[i], letterhood:[], wordhood:[], paragraphhood:[], letters:{}, words:{}, paragraphs:{} };    
        }
        if (!docs[words[i]]['letters'].hasOwnProperty(words[i][0])) {
            docs[words[i]]['letters'][words[i][0]] = 1;
        } else {
            docs[words[i]]['letters'][words[i][0]] += 1;
        }

        // connect letters to the word
        for (var j=0;j<words[i].length;j++) {
            if (!docs[words[i][j]]['words'].hasOwnProperty(words[i])) {
                docs[words[i][j]]['words'][words[i]] = 1/Math.pow(j,2);
            } else {
                docs[words[i][j]]['words'][words[i]] += 1/Math.pow(j,2);
            }
        }

        // connect words with simultaneously adjacent words
        for (var j=1;j<=10;j++) {
            // connect forwards
            if (i+j < words.length) {
                if (!docs[words[i]]['words'].hasOwnProperty(words[i+j])) {
                    docs[words[i]]['words'][words[i+j]] = 1/Math.pow(j,1);
                } else {
                    docs[words[i]]['words'][words[i+j]] += 1/Math.pow(j,1);
                }
            }

            // connect backwords
            if (i-j >= 0) {
                if (!docs[words[i]]['words'].hasOwnProperty(words[i-j])) {
                    docs[words[i]]['words'][words[i-j]] = 1/Math.pow(j,2);
                } else {
                    docs[words[i]]['words'][words[i-j]] += 1/Math.pow(j,2);
                }
            }
        }
        //console.log('words[i]', docs[words[i]]);
    }
};
TOIMAWB.DATA.parseParagraphset = function(docs, paragraphs) {
    for (var i=0;i<paragraphs.length;i++) {
        // perform lower level processing
        this.parseWordset(docs, paragraphs[i]); 

        // perform higher level processing
        //console.log(paragraphs, paragraphs[i]);
        // connect paragraphs to the first letter of the words it contains
        for (var j=0;j<paragraphs[i].length;j++) {
            if (!docs[paragraphs[i]]['letters'].hasOwnProperty(paragraphs[i][j][0])) {
                docs[paragraphs[i]]['letters'][paragraphs[i][j][0]] = 1/Math.pow(j+1,1);
            } else {
                docs[paragraphs[i]]['letters'][paragraphs[i][j][0]] += 1/Math.pow(j+1,1);
            }
        }
        // connect first letter of the words it contains to the paragraph
        for (var j=0;j<paragraphs[i].length;j++) {
            if (!docs[paragraphs[i][j][0]]['paragraphs'].hasOwnProperty(paragraphs[i])) {
                docs[paragraphs[i][j][0]]['paragraphs'][paragraphs[i]] = 1/Math.pow(j+1,1);
            } else {
                docs[paragraphs[i][j][0]]['paragraphs'][paragraphs[i]] += 1/Math.pow(j+1,1);
            }
        }

        // connect paragraphs to the words it contains
        for (var j=0;j<paragraphs[i].length;j++) {
            if (!docs[paragraphs[i]]['words'].hasOwnProperty(paragraphs[i][j])) {
                docs[paragraphs[i]]['words'][paragraphs[i][j]] = 1/Math.pow(j+1,2);
            } else {
                docs[paragraphs[i]]['words'][paragraphs[i][j]] += 1/Math.pow(j+1,2);
            }
        }
        // connect words to paragraphs they're contained in
        for (var j=0;j<paragraphs[i].length;j++) {
            if (!docs.hasOwnProperty(paragraphs[i][j])) {
                this.createDoc(docs, paragraphs[i][j]);
                //docs[paragraphs[i][j]] = { _id:paragraphs[i][j], letterhood:[], wordhood:[], paragraphhood:[], letters:{}, words:{}, paragraphs:{} };    
            }
            //console.log(i,j,paragraphs[i][j],docs[paragraphs[i][j]]['paragraphs']);
            if (!docs[paragraphs[i][j]]['paragraphs'].hasOwnProperty(paragraphs[i])) {
                docs[paragraphs[i][j]]['paragraphs'][paragraphs[i]] = 1/Math.pow(j+1,2);
            } else {
                docs[paragraphs[i][j]]['paragraphs'][paragraphs[i]] += 1/Math.pow(j+1,2);
            }
        }

        // connect paragraphs with simultaneously adjacent paragraphs
        for (var j=1;j<=10;j++) {
            // connect forwards
            if (i+j < paragraphs.length) {
                if (!docs[paragraphs[i]]['paragraphs'].hasOwnProperty(paragraphs[i+j])) {
                    docs[paragraphs[i]]['paragraphs'][paragraphs[i+j]] = 1/Math.pow(j,1);
                } else {
                    docs[paragraphs[i]]['paragraphs'][paragraphs[i+j]] += 1/Math.pow(j,1);
                }
            }

            // connect backwards
            if (i-j >= 0) {
                if (!docs[paragraphs[i]]['paragraphs'].hasOwnProperty(paragraphs[i-j])) {
                    docs[paragraphs[i]]['paragraphs'][paragraphs[i-j]] = 1/Math.pow(j,2);
                } else {
                    docs[paragraphs[i]]['paragraphs'][paragraphs[i-j]] += 1/Math.pow(j,2);
                }
            }
        }
        //console.log('paragraphs[i]', docs[paragraphs[i]]);
    }
};



TOIMAWB.DATA.INIT = {
    //'letters': ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','@'],
    //'words': ['toimawb','notepad','diary','typewriter','explore','thoughts','@apasian','github','couchapp'],
    'paragraphs': [['toimawb','is','a','typewriter','and','notebook'], ['toimawb', 'is', 'a', 'tool', 'for', 'introspection'], ['toimawb', 'finds', 'patterns', 'in', 'your', 'thoughts']]
};
TOIMAWB.DATA.TRAIL = _.union(TOIMAWB.DATA.INIT.paragraphs);
//TOIMAWB.DATA.TRAIL = _.union(TOIMAWB.DATA.INIT.letters, TOIMAWB.DATA.INIT.words, TOIMAWB.DATA.INIT.paragraphs);



// a letter is adjacent to at most 4 letters, 3 words, 1 paragraph
// a word is adjacent to at most 8 letters, 3 words, 1 paragraph
// a paragraph is adjacent to at most 8 letters, 3 words, 1 paragraph
TOIMAWB.DATA.DOCS = {};
// the first pass through the initial data seed
TOIMAWB.DATA.INIT.processOne = function() {
    var docs = TOIMAWB.DATA.DOCS;
    var paragraphs = this.paragraphs;

    // initialize atom documents
    var i=0;
    for (i=0;i<paragraphs.length;i++) {
        TOIMAWB.DATA.createDoc(docs, paragraphs[i]);
    }

    TOIMAWB.DATA.parseParagraphset(docs, paragraphs);
};
console.log('TOIMAWB.DATA.INIT.paragraphs',TOIMAWB.DATA.INIT.paragraphs);
TOIMAWB.DATA.INIT.processOne();
TOIMAWB.DATA.calcNeighborhoods(TOIMAWB.DATA.DOCS);
console.log('TOIMAWB.DATA.DOCS',TOIMAWB.DATA.DOCS);



TOIMAWB.start = function() {
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
        var frameConfig = TOIMAWB.CONFIG.frameConfigs[index];

        var letters = TOIMAWB.DATA.INIT.letters;
        var words = TOIMAWB.DATA.INIT.words;
        var paragraphs = TOIMAWB.DATA.INIT.paragraphs;

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



TOIMAWB.start();
