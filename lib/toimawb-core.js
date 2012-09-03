var TOIMAWB = {};

TOIMAWB.TYPE = {
    'isFunction': function(value) {
        var getType = {};
        return value && getType.toString.call(value) == "[object Function]";
    }
};

TOIMAWB.bubbleSort = function(set) {
    var temp;
    var swap = false;
    for (var j in set) {
        swap = false; 
        for (var i=set.length-1;i>0;i--) {
            if (set[i].position < set[i-1].position) {
                set.splice(i-1,0,set.splice(i,1)[0]);
                swap = true;
            }
        }
        if (!swap)
            break;
    }
};

TOIMAWB.drawKinetic = function(obj) {
    var shapes = obj.shapes;
    console.log(obj.shapes);
    if (shapes === null || !shapes.length) {
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

TOIMAWB.draw = function(set) {
    var image = document.getElementsByClassName('image');
    image = image[0];

    var newLink;
    var newEl;
    var newSubEl;
    var newSubSubText;

    for (var i=0; i<set.length; i+=3) {

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

    return set;
};

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

        var image = document.getElementById('app-image');
        image.innerHTML = '';

        TOIMAWB.bubbleSort(TOIMAWB.HOME);
        TOIMAWB.draw(TOIMAWB.HOME);
    },
    aboutRoute: function(path) {
        console.log('aboutRoute', path);

        var image = document.getElementById('app-image');
        image.innerHTML = '';

        TOIMAWB.bubbleSort(TOIMAWB.ABOUT);
        TOIMAWB.draw(TOIMAWB.ABOUT);
    }
});
