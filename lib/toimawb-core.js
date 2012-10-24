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

/*
TOIMAWB.drawKinetic = function(obj) {
    var shapes = obj.shapes;
    console.log('TOIMAWB.drawKinetic', obj.shapes);
    if (shapes === undefined || !shapes.length) {
        return;
    }

    var o = {
        _width: 196,
        _height: 196,
        _duration: 1
    };

    var x = o._width/2;
    var y = o._height/2;
    var radius = o._width/2;
    var width = o._width;
    var height = o._height;
    var duration = o._duration;

    var kineticObj = {};

    kineticObj['stage'] = new Kinetic.Stage({
        container: obj.name+'-kinetic', 
        width: width,
        height: height
    });
    kineticObj['layer'] = new Kinetic.Layer({
        id: "layer" 
    });
    
    for (var i=0; i<shapes[0].length; i++) {
        kineticObj[i] = new Kinetic.Rect($.extend(true, {}, shapes[0][i]));  
        kineticObj['layer'].add(kineticObj[i]);
    }

    kineticObj['stage'].add(kineticObj['layer']);

    var transitionFunc = function(shapes, index) {
        var context = kineticObj;

        return function (evt) {
            context['stage'].get('#layer')[0].off('mousemove tap');

            for (var i=0; i<shapes[index].length; i++) {
                shapes[index][i].duration = duration;
                shapes[index][i].callback =

                function() {
                    context['stage'].get('#layer')[0].off('mousemove tap');

                    if (index < shapes.length-1) {
                        context['stage'].get('#layer')[0].on('mousemove tap', transitionFunc(shapes,index+1));
                    } else {
                        context['stage'].get('#layer')[0].on('mousemove tap', transitionFunc(shapes,0));
                    }
                }

                context[i].transitionTo(shapes[index][i]);
            }

        };
    };

    kineticObj['stage'].get('#layer')[0].on('mousemove tap', transitionFunc(shapes,1));

    return obj;
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
