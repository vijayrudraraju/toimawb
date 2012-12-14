var TOIMAWB = {};

TOIMAWB.TIME = [
0
];

TOIMAWB.TYPE = {
    'isFunction': function(value) {
        var getType = {};
        return value && getType.toString.call(value) == "[object Function]";
    }
};

TOIMAWB.CONFIG = {
    'numPoints': 9,
    'frameTypes': []
};
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
console.log('TOIMAWB.CONFIG.frameConfigs',TOIMAWB.CONFIG.frameConfigs);

TOIMAWB.DATA = {};
TOIMAWB.DATA.INIT = {
    'letters': ['a','b','c','d','e','f','g','h','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    'words': ['toimawb','notepad','diary','explore','thoughts','@apasian','github','couchapp'],
    'paragraphs': ['toimawb is a typewriter and notebook', 'toimawb is a tool for introspection', 'toimawb finds patterns in your thoughts']
};

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

/*
TOIMAWB.display = function() {

};
*/

TOIMAWB.bubbleSort = function(set) {
    var temp;
    var swap = false;
    for (var j in set) {
        swap = false; 
        for (var i=set.length-1;i>0;i--) {
            if (set[i].position && set[i].position < set[i-1].position) {
                set.splice(i-1,0,set.splice(i,1)[0]);
                swap = true;
            }
        }
        if (!swap)
            break;
    }
};

/*
TOIMAWB.process = function(set) {
    console.log('TOIMAWB.process', set);

    var num = Math.ceil(set.length/2);
    var outSet = [];

    for (var i=0;i<2;i++) {
        outSet[i] = set.slice(i*num,i*num+num); 
    }

    return outSet;
};
*/

/*
TOIMAWB.generate = function(set) {
    console.log('TOIMAWB.generate', set);
    var outSet = [];

    // there may be different types:
    // letters
    // words
    // phrases
    
    for (var i=0;i<set.length;i++) {
        outSet[i] = {'texts':set[i], 'colors':[TOIMAWB.COLORS[i]]};
    }

    return outSet;
};
*/

TOIMAWB.draw = function(set) { 
    console.log('TOIMAWB.draw', set);

    var image = document.getElementsByClassName('image');
    image = image[0];
    // clear image
    image.innerHTML = '';

    var newLink;
    var newEl;
    var newSubEl;
    var newSubSubText;
    var els = [];

    for (var i=0; i<set.length; i++) {
        //if (set[i].shapes === undefined || set[i].shapes.length === 0) {
        if (set[i].texts.length === 1) {


        } else if (set[i].texts.length) {
            console.log('generate', set[i].texts[0]);
        /*
            newLink = document.createElement('a');

            var href;
            if (set[i].url === undefined) {
                href = '#/'+set[i].name;
            } else {
                href = set[i].url;
            }

            var patt = /\s/g;
            href = href.replace(patt,'-');    
            newLink.href = href;
            */

            newEl = document.createElement('div');
            if (set[i].colors && set[i].colors[0]) {
                newEl.style.backgroundColor = set[i].colors[0];
            }
            newEl.className = 'object';
            newEl.id = set[i].texts[0];
            newEl.dataset['id'] = i;

            for (var j=0; j<set[i].texts.length; j++) {
                newSubEl = document.createElement('div');
                if (set[i].colors && set[i].colors[0]) {
                    newSubEl.style.backgroundColor = set[i].colors[1];
                }
                newSubEl.className = 'sub-object';
                newEl.appendChild(newSubEl);

                newSubSubText = document.createElement('h1');
                newSubSubText.className = 'white';
                newSubSubText.innerHTML = set[i].texts[j];
                newSubEl.appendChild(newSubSubText);
            }

            els.push(newSubSubText);

            image.appendChild(newEl);

            newEl.addEventListener('click',
                function(ev) {
                    var texts = set[ev.currentTarget.dataset['id']].texts;
                    console.log('click', texts, ev);
                    if (texts && texts.length > 1) {
                        var processed = TOIMAWB.process(texts);
                        //console.log(processed);
                        var generated = TOIMAWB.generate(processed);
                        TOIMAWB.draw(generated);
                    } else {
                        console.log('sequence');
                    }
                },
            false);
        } /*else {
            if (set[i]) {
                newEl = document.createElement('div');
                newEl.className = 'canvas-object';
                newEl.id = set[i].name+'-kinetic';
                image.appendChild(newEl);
                TOIMAWB.drawKinetic(set[i]);
            } else {
                newEl = document.createElement('div');
                newEl.className = 'canvas-object';
                image.appendChild(newEl);
            }
        }*/

/*
        if (i % 3 === 1) {
            newEl.className += ' middle';
        }
        if (Math.floor(i/3) === 1) {
            newEl.className += ' vert-middle';
        }
        */
        if (i % 2 === 0) {
            newEl.className += ' left';
        }
    }

/*
    for (var i=0; i<set.length; i+=3) {
        // text input
        newEl = document.createElement('div');
        newEl.className = 'text-input-object';
        newEl.id = set[i+j].name+'-text-input';
        image.appendChild(newEl);

        // sketch input

        // heads
        for (var j=0; j<3; j++) {
            if (set[i+j]) {
                newEl = document.createElement('div');
                newEl.className = 'canvas-object';
                newEl.id = set[i+j].name+'-kinetic';
                image.appendChild(newEl);
                TOIMAWB.drawKinetic(set[i+j]);
            } else {
                newEl = document.createElement('div');
                newEl.className = 'canvas-object';
                image.appendChild(newEl);
            }
            if (j === 1) {
                newEl.className += ' middle';
            }
        }
        // bodies 
        for (var j=0; j<3; j++) {
            if (!set[i+j]) {
                continue;    
            }

            newLink = document.createElement('a');
            var href;
            if (set[i+j].url === undefined) {
                href = '#/'+set[i+j].name;
            } else {
                href = set[i+j].url;
            }
            var patt = /\s/g;
            href = href.replace(patt,'-');    
            newLink.href = href;

            newEl = document.createElement('div');
            newEl.style.backgroundColor = set[i+j].colors[0];
            newEl.className = 'object';
            newEl.id = set[i+j].name;

            newSubEl = document.createElement('div');
            newSubEl.style.backgroundColor = set[i+j].colors[1];
            newSubEl.className = 'sub-object';

            newSubSubText = document.createElement('h1');
            newSubSubText.className = 'white';
            newSubSubText.innerHTML = set[i+j].name;

            newSubEl.appendChild(newSubSubText);
            newEl.appendChild(newSubEl);
            newLink.appendChild(newEl);
            image.appendChild(newLink);

            if (j === 1) {
                newEl.className += ' middle';
            }
        }
    }
    */
    /*
    newEl.dataset['timer'] = setInterval(
        function() {
            for (var i=0; i<els.length; i++) {
                els[i].innerHTML = set[i].texts[TOIMAWB.TIME[0] % set[i].texts.length];
            }
            TOIMAWB.TIME[0]++;
        },
    500);
    */

    return set;
};

TOIMAWB.stick = function(set) {
    console.log('TOIMAWB.stick', set);

    var image = document.getElementsByClassName('sticky');
    image = image[0];

    if (image.className.search('open') === -1) {
        return;
    }

    var newLink;
    var newEl;
    var newSubEl;
    var newSubSubText;

    for (var i=0; i<set.length; i++) {
        if (set[i].name) {
            newEl = document.createElement('div');
            newEl.className = 'sticky-object';
            newEl.id = set[i].name+'-sticky';

            newSubText = document.createElement('h2');
            newSubText.className = 'white';
            newSubText.innerHTML = set[i].name;

            newEl.appendChild(newSubText);
            image.appendChild(newEl);
        }
    }
};

/*
TOIMAWB.Router = Backbone.Router.extend({
    routes: {
        'about': 'aboutRoute',
        '*any': 'defaultRoute'
    },
    initialize: function(set) {
        console.log('router initialize with', set);
    },
    defaultRoute: function(path) {
        console.log('defaultRoute', path);

        //var image = document.getElementById('app-image');
        //image.innerHTML = '';

        //TOIMAWB.bubbleSort(TOIMAWB.HOME);
        //TOIMAWB.draw(TOIMAWB.HOME);
    },
    aboutRoute: function(path) {
        console.log('aboutRoute', path);

        var image = document.getElementById('app-image');
        image.innerHTML = '';

        TOIMAWB.bubbleSort(TOIMAWB.ABOUT);
        TOIMAWB.draw(TOIMAWB.ABOUT);
    }
});
*/
