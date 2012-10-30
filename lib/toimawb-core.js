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

TOIMAWB.init = function() {
    var frame = document.getElementById('app-frm');
    var frameMouseMoveFunc = function(ev) {
        //console.log(ev.x, ev.y, frame.offsetLeft, frame.offsetTop, frame.offsetWidth/6, frame.offsetHeight/6, frame.attributes);
        var x = Math.floor((ev.x-frame.offsetLeft) / (frame.offsetWidth/6));
        var y = Math.floor((ev.y-frame.offsetTop) / (frame.offsetHeight/6));
        console.log(x,y);

        var cellWidth = frame.offsetWidth/6;
        var cellHeight = frame.offsetHeight/6;

        var obj1 = document.getElementById('app-obj1');
        var obj2 = document.getElementById('app-obj2');
        var obj3 = document.getElementById('app-obj3');
        var obj4 = document.getElementById('app-obj4');
        var superObj1 = document.createElement('div');

        console.log(cellWidth, cellHeight);

        if (x === 0) {
            if (y === 0) {
                obj1.style.width = cellWidth*4 - 10 + 'px';
                obj1.style.height = cellHeight*4 - 10 + 'px';

                obj2.style.width = cellWidth*2 - 10 + 'px';
                obj2.style.height = cellHeight*2 - 10 + 'px';
                obj3.style.width = cellWidth*4 - 10 + 'px';
                obj3.style.height = cellHeight*2 - 10 + 'px';
                obj4.style.width = cellWidth*2 - 10 + 'px';
                obj4.style.height = cellHeight*4 - 10 + 'px';
                obj4.style.cssFloat = 'right';

                frame.innerHTML = '';
                frame.appendChild(obj1);
                frame.appendChild(obj2);
                frame.appendChild(obj4);
                frame.appendChild(obj3);
            } else if (y === 1) {
                obj1.style.width = cellWidth*4 - 10 + 'px';
                obj1.style.height = cellHeight*4 - 10 + 'px';

                obj2.style.width = cellWidth*2 - 10 + 'px';
                obj2.style.height = cellHeight*2 - 10 + 'px';
                obj3.style.width = cellWidth*6 - 10 + 'px';
                obj3.style.height = cellHeight*2 - 10 + 'px';
                obj4.style.width = cellWidth*2 - 10 + 'px';
                obj4.style.height = cellHeight*2 - 10 + 'px';
                obj4.style.cssFloat = 'right';

                frame.innerHTML = '';
                frame.appendChild(obj1);
                frame.appendChild(obj2);
                frame.appendChild(obj4);
                frame.appendChild(obj3);
            } else if (y === 2) {
                obj1.style.width = cellWidth*4 - 10 + 'px';
                obj1.style.height = cellHeight*4 - 10 + 'px';

                obj2.style.width = cellWidth*6 - 10 + 'px';
                obj2.style.height = cellHeight*1 - 10 + 'px';
                obj3.style.width = cellWidth*4 - 10 + 'px';
                obj3.style.height = cellHeight*1 - 10 + 'px';
                obj4.style.width = cellWidth*2 - 10 + 'px';
                obj4.style.height = cellHeight*5 - 10 + 'px';
                obj4.style.cssFloat = 'right';

                frame.innerHTML = '';
                frame.appendChild(obj2);
                frame.appendChild(obj1);
                frame.appendChild(obj4);
                frame.appendChild(obj3);
            } else if (y === 3) {
                obj1.style.width = cellWidth*4 - 10 + 'px';
                obj1.style.height = cellHeight*4 - 10 + 'px';

                obj2.style.width = cellWidth*6 - 10 + 'px';
                obj2.style.height = cellHeight*1 - 10 + 'px';
                obj3.style.width = cellWidth*6 - 10 + 'px';
                obj3.style.height = cellHeight*1 - 10 + 'px';
                obj4.style.width = cellWidth*2 - 10 + 'px';
                obj4.style.height = cellHeight*4 - 10 + 'px';
                obj4.style.cssFloat = 'right';

                frame.innerHTML = '';
                frame.appendChild(obj2);
                frame.appendChild(obj1);
                frame.appendChild(obj4);
                frame.appendChild(obj3);
            } else if (y === 4) {
                obj1.style.width = cellWidth*4 - 10 + 'px';
                obj1.style.height = cellHeight*4 - 10 + 'px';

                obj2.style.width = cellWidth*6 - 10 + 'px';
                obj2.style.height = cellHeight*2 - 10 + 'px';
                obj3.style.width = cellWidth*2 - 10 + 'px';
                obj3.style.height = cellHeight*2 - 10 + 'px';
                obj4.style.width = cellWidth*2 - 10 + 'px';
                obj4.style.height = cellHeight*2 - 10 + 'px';
                obj4.style.cssFloat = 'right';

                frame.innerHTML = '';
                frame.appendChild(obj2);
                frame.appendChild(obj4);
                frame.appendChild(obj1);
                frame.appendChild(obj3);
            } else {
                obj1.style.width = cellWidth*4 - 10 + 'px';
                obj1.style.height = cellHeight*4 - 10 + 'px';

                obj2.style.width = cellWidth*4 - 10 + 'px';
                obj2.style.height = cellHeight*2 - 10 + 'px';
                obj3.style.width = cellWidth*2 - 10 + 'px';
                obj3.style.height = cellHeight*4 - 10 + 'px';
                obj4.style.width = cellWidth*2 - 10 + 'px';
                obj4.style.height = cellHeight*2 - 10 + 'px';
                obj4.style.cssFloat = 'right';

                frame.innerHTML = '';
                frame.appendChild(obj2);
                frame.appendChild(obj4);
                frame.appendChild(obj1);
                frame.appendChild(obj3);
            }
        } else if (x === 1) {
            obj1.style.width = cellWidth*4 - 10 + 'px';
            obj1.style.height = cellHeight*4 - 10 + 'px';

            obj2.style.width = cellWidth*2 - 10 + 'px';
            obj2.style.height = cellHeight*4 - 10 + 'px';
            obj3.style.width = cellWidth*4 - 10 + 'px';
            obj3.style.height = cellHeight*2 - 10 + 'px';
            obj4.style.width = cellWidth*2 - 10 + 'px';
            obj4.style.height = cellHeight*2 - 10 + 'px';

            frame.innerHTML = '';
            frame.appendChild(obj1);
            frame.appendChild(obj2);
            frame.appendChild(obj3);
            frame.appendChild(obj4);
        } else if (x === 2) {
            obj1.style.width = cellWidth*4 - 10 + 'px';
            obj1.style.height = cellHeight*4 - 10 + 'px';

            obj2.style.width = cellWidth*1 - 10 + 'px';
            obj2.style.height = cellHeight*4 - 10 + 'px';
            obj3.style.width = cellWidth*1 - 10 + 'px';
            obj3.style.height = cellHeight*6 - 10 + 'px';
            obj4.style.width = cellWidth*5 - 10 + 'px';
            obj4.style.height = cellHeight*2 - 10 + 'px';

            frame.innerHTML = '';
            frame.appendChild(obj3);
            frame.appendChild(obj1);
            frame.appendChild(obj2);
            frame.appendChild(obj4);
        } else if (x === 3) {
            obj1.style.width = cellWidth*4 - 10 + 'px';
            obj1.style.height = cellHeight*4 - 10 + 'px';

            obj2.style.width = cellWidth*1 - 10 + 'px';
            obj2.style.height = cellHeight*6 - 10 + 'px';
            obj3.style.width = cellWidth*1 - 10 + 'px';
            obj3.style.height = cellHeight*6 - 10 + 'px';
            obj4.style.width = cellWidth*4 - 10 + 'px';
            obj4.style.height = cellHeight*2 - 10 + 'px';

            superObj1.style.width = cellWidth*4 + 'px';
            superObj1.style.height = cellHeight*6 + 'px';
            superObj1.style.cssFloat = 'left';

            frame.innerHTML = '';
            frame.appendChild(obj3);
            frame.appendChild(superObj1);
            superObj1.appendChild(obj1);
            superObj1.appendChild(obj4);
            frame.appendChild(obj2);
        } else if (x === 4) {
            obj1.style.width = cellWidth*4 - 10 + 'px';
            obj1.style.height = cellHeight*4 - 10 + 'px';

            obj2.style.width = cellWidth*2 - 10 + 'px';
            obj2.style.height = cellHeight*2 - 10 + 'px';
            obj3.style.width = cellWidth*2 - 10 + 'px';
            obj3.style.height = cellHeight*4 - 10 + 'px';
            obj4.style.width = cellWidth*4 - 10 + 'px';
            obj4.style.height = cellHeight*2 - 10 + 'px';
            obj4.style.cssFloat = 'left';

            frame.innerHTML = '';
            frame.appendChild(obj3);
            frame.appendChild(obj1);
            frame.appendChild(obj4);
            frame.appendChild(obj2);
        } else {
            obj1.style.width = cellWidth*4 - 10 + 'px';
            obj1.style.height = cellHeight*4 - 10 + 'px';

            obj2.style.width = cellWidth*4 - 10 + 'px';
            obj2.style.height = cellHeight*2 - 10 + 'px';
            obj3.style.width = cellWidth*2 - 10 + 'px';
            obj3.style.height = cellHeight*4 - 10 + 'px';
            obj4.style.width = cellWidth*2 - 10 + 'px';
            obj4.style.height = cellHeight*2 - 10 + 'px';
            obj4.style.cssFloat = 'left';

            frame.innerHTML = '';
            frame.appendChild(obj3);
            frame.appendChild(obj1);
            frame.appendChild(obj4);
            frame.appendChild(obj2);
        }
    };
    frame.addEventListener('mousemove', frameMouseMoveFunc);
};
TOIMAWB.init();

TOIMAWB.display = function() {

};

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

TOIMAWB.process = function(set) {
    console.log('TOIMAWB.process', set);

    var num = Math.ceil(set.length/2);
    var outSet = [];

    for (var i=0;i<2;i++) {
        outSet[i] = set.slice(i*num,i*num+num); 
    }

    return outSet;
};

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
