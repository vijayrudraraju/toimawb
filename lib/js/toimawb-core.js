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

TOIMAWB.start = function() {
    var letters = ['a','b','c','d','e','f','g','h'];
    var words = ['apple','berkeley','california','down','elephants','furniture','ghostly','horizon'];
    var paragraphs = ['apple in berkeley bloom in a california, ghostly with down elements cruzing down furniture on the horizon'];

    var frame = document.getElementById('app-frm');
    var body = document.getElementById('app-bdy');

    var frameTypes = [];
    frameTypes[0] = ['marker0','word0','word0','letter0','paragraph0','paragraph0','letter1','paragraph0','paragraph0'];
    frameTypes[1] = ['letter0','marker0','letter1','paragraph0','paragraph0','letter2','paragraph0','paragraph0','letter3'];
    frameTypes[2] = ['word0','word0','marker0','paragraph0','paragraph0','letter0','paragraph0','paragraph0','letter1'];
    frameTypes[3] = ['letter0','word0','word0','marker0','word1','word1','letter1','word2','word2'];
    frameTypes[4] = ['letter0','letter1','letter2','letter3','marker','word4','word5','word6','word7'];
    frameTypes[5] = ['word0','word0','letter0','word1','word1','marker0','word2','word2','letter1'];
    frameTypes[6] = ['letter0','paragraph0','paragraph0','letter1','paragraph0','paragraph0','marker0','word0','word0'];
    frameTypes[7] = ['letter0','paragraph0','paragraph0','letter1','paragraph0','paragraph0','letter2','marker0','letter3'];
    frameTypes[8] = ['paragraph0','paragraph0','letter0','paragraph0','paragraph0','letter1','word0','word1','marker0'];

    var obj = [];
    var text = [];
    for (var i=0;i<9;i++) {
        obj[i] = document.createElement('div');
        text[i] = document.createElement('p');
        obj[i].appendChild(text[i]);
    }

    var obj1 = document.createElement('div');
    var text1 = document.createElement('p');
    var obj2 = document.createElement('div');
    var text2 = document.createElement('p');
    var obj3 = document.createElement('div');
    var text3 = document.createElement('p');
    var obj4 = document.createElement('div');
    var text4 = document.createElement('p');
    var obj5 = document.createElement('div');
    var text5 = document.createElement('p');
    var obj6 = document.createElement('div');
    var text6 = document.createElement('p');
    var obj7 = document.createElement('div');
    var text7 = document.createElement('p');
    var obj8 = document.createElement('div');
    var text8 = document.createElement('p');
    var obj9 = document.createElement('div');
    var text9 = document.createElement('p');
    obj2.appendChild(text2);
    obj3.appendChild(text3);
    obj4.appendChild(text4);
    obj5.appendChild(text5);
    obj6.appendChild(text6);
    obj7.appendChild(text7);
    obj8.appendChild(text8);
    obj9.appendChild(text9);

    var cellNumber = 3;
    var markedThought = '';
    var previousFrame = [];

    var frameMouseClickFunc = function(ev) {
        updateFrame(ev.x,ev.y);
    };
    var frameMouseMoveFunc = function(ev) {
        updateFrame(ev.x,ev.y);
    };
    var updateFrame = function(xIn,yIn) {
        var cellWidth = frame.offsetWidth/cellNumber;
        var cellHeight = frame.offsetHeight/cellNumber;
        var x = Math.floor((xIn-frame.offsetLeft+body.scrollLeft) / cellWidth);
        var y = Math.floor((yIn-frame.offsetTop+body.scrollTop) / cellHeight);
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
            console.log('setPos',el.style.left,el.style.top);
        }
        function setText(el, text) {
            el.innerHTML = text;
            console.log('setText', text);
        }
        function setFrame(index) {
            var frameType = frameTypes[index];
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
                if (captured) {
                    break;
                } else {
                    //putTapatioOnCatesFace();
                    //eatCatesFace();
                    console.log('test setFrame',obj[objCount], frameType[i].slice(0,frameType[i].length-1));
                    //setType(obj[objCount], frameType[i].slice(0,frameType[i].length-1));
                    capturedObjects.push(frameType[i]);
                    objCount++;
                }
            }
        }

        // calculate index based on position
        var index = x+(3*y);
        // clear frame
        frame.innerHTML = '';
        setFrame(index);
        /*
        switch (index) {
            case 0:
                setType(obj2,'paragraph');
                setText(text2,paragraphs[0]);
                setPos(obj2,1+(3*1))

                setType(obj3,'word');
                setText(text3,words[0]);
                setPos(obj3,1+(3*0));

                setType(obj4,'letter');
                setText(text4,letters[0]);
                setPos(obj4,0+(3*1));

                setType(obj5,'letter');
                setText(text5,letters[1]);
                setPos(obj5,0+(3*2));
                break;
            case 1:
                setType(obj2,'paragraph');
                setText(text2,paragraphs[0]);
                setPos(obj2,0+(3*1))

                setType(obj3,'letter');
                setText(text3,letters[1]);
                setPos(obj3,2+(3*1));

                setType(obj4,'letter');
                setText(text4,letters[2]);
                setPos(obj4,2+(3*2));

                setType(obj5,'letter');
                setText(text5,letters[3]);
                setPos(obj5,0+(3*0));

                setType(obj6,'letter');
                setText(text6,letters[4]);
                setPos(obj6,2+(3*0));
                break;
            case 2:
                setType(obj2,'paragraph');
                setText(text2,paragraphs[0]);
                setPos(obj2,0+(3*1))

                setType(obj3,'word');
                setText(text3,words[0]);
                setPos(obj3,0+(3*0));

                setType(obj4,'letter');
                setText(text4,letters[1]);
                setPos(obj4,2+(3*1));

                setType(obj5,'letter');
                setText(text5,letters[2]);
                setPos(obj5,2+(3*2));
                break;
            case 3:
                setType(obj2,'word');
                setText(text2,words[0]);
                setPos(obj2,1+(3*0))

                setType(obj3,'word');
                setText(text3,words[1]);
                setPos(obj3,1+(3*1));

                setType(obj4,'word');
                setText(text4,words[2]);
                setPos(obj4,1+(3*2));

                setType(obj5,'letter');
                setText(text5,letters[3]);
                setPos(obj5,0+(3*0));

                setType(obj6,'letter');
                setText(text6,letters[4]);
                setPos(obj6,0+(3*2));
                break;
            case 4:
                setType(obj2,'letter');
                setText(text2,letters[0]);
                setPos(obj2,0+(3*0))

                setType(obj3,'letter');
                setText(text3,letters[1]);
                setPos(obj3,1+(3*0));

                setType(obj4,'letter');
                setText(text4,letters[2]);
                setPos(obj4,2+(3*0));

                setType(obj5,'letter');
                setText(text5,letters[3]);
                setPos(obj5,0+(3*1));

                setType(obj6,'letter');
                setText(text6,letters[4]);
                setPos(obj6,2+(3*1));

                setType(obj7,'letter');
                setText(text7,letters[5]);
                setPos(obj7,0+(3*2));

                setType(obj8,'letter');
                setText(text8,letters[6]);
                setPos(obj8,1+(3*2));

                setType(obj9,'letter');
                setText(text9,letters[7]);
                setPos(obj9,2+(3*2));
                break;
            case 5:
                setType(obj2,'word');
                setText(text2,words[4]);
                setPos(obj2,0+(3*0))

                setType(obj3,'word');
                setText(text3,words[5]);
                setPos(obj3,0+(3*1));

                setType(obj4,'word');
                setText(text4,words[6]);
                setPos(obj4,0+(3*2));

                setType(obj5,'letter');
                setText(text5,letters[2]);
                setPos(obj5,2+(3*0));

                setType(obj6,'letter');
                setText(text6,letters[6]);
                setPos(obj6,2+(3*2));
                break;
            case 6:
                setType(obj2,'paragraph');
                setText(text2,paragraphs[0]);
                setPos(obj2,1+(3*0));

                setType(obj3,'word');
                setText(text3,words[6]);
                setPos(obj3,1+(3*2));

                setType(obj4,'letter');
                setText(text4,letters[6]);
                setPos(obj4,0+(3*0));

                setType(obj5,'letter');
                setText(text5,letters[7]);
                setPos(obj5,0+(3*1));
                break;
            case 7:
                setType(obj2,'paragraph');
                setText(text2,paragraphs[0]);
                setPos(obj2,1+(3*0))

                setType(obj3,'letter');
                setText(text3,letters[0]);
                setPos(obj3,0+(3*0));

                setType(obj4,'letter');
                setText(text4,letters[1]);
                setPos(obj4,0+(3*1));

                setType(obj5,'letter');
                setText(text5,letters[2]);
                setPos(obj5,0+(3*2));

                setType(obj6,'letter');
                setText(text6,letters[3]);
                setPos(obj6,2+(3*2));
                break;
            case 8:
                setType(obj2,'paragraph');
                setText(text2,paragraphs[0]);
                setPos(obj2,0+(3*0));

                setType(obj3,'word');
                setText(text3,words[0]);
                setPos(obj3,0+(3*2));

                setType(obj4,'letter');
                setText(text4,letters[0]);
                setPos(obj4,2+(3*0));

                setType(obj5,'letter');
                setText(text5,letters[1]);
                setPos(obj5,2+(3*1));
                break;
        }

        console.log(index);
        setType(obj1,'marker');
        setPos(obj1,index);
        */
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
