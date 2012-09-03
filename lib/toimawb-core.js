var TOIMAWB = {};

var TYPE = {
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

TOIMAWB.draw = function(set) {
    var image = document.getElementsByClassName('image');
    image = image[0];

    var newLink;
    var newEl;
    var newSubEl;
    var newSubSubText;

    for (var i in set) {
        if (set[i].type === 'div') {
            console.log(set[i]);
            console.log(set[i]);

            newLink = document.createElement('a');
            var href;
            if (set[i].url === undefined) {
                //href = set[i].name+'/'+set[i].name+'.html'; 
                href = '#/'+set[i].name;
            } else {
                href = set[i].url;
            }
            var patt = /\s/g;
            href = href.replace(patt,'-');    
            newLink.href = href;

            newEl = document.createElement('div');
            newEl.style.backgroundColor = set[i].colors[0];
            newEl.className = 'object';
            newEl.id = set[i].name;

            newSubEl = document.createElement('div');
            newSubEl.style.backgroundColor = set[i].colors[1];
            newSubEl.className = 'sub-object';

            newSubSubText = document.createElement('h1');
            newSubSubText.className = 'white';
            newSubSubText.innerHTML = set[i].name;

            newSubEl.appendChild(newSubSubText);
            newEl.appendChild(newSubEl);
            newLink.appendChild(newEl);
            image.appendChild(newLink);
        } else if (set[i].type === 'kinetic') {
            console.log(set[i]);

            newEl = document.createElement('div');
            newEl.className = 'canvas-object';
            newEl.id = set[i].name;
            image.appendChild(newEl);

            set[i].draw();
        } else if (set[i].type === 'blank') {
            console.log(set[i]);

            newEl = document.createElement('div');
            newEl.className = 'canvas-object';
            image.appendChild(newEl);
        }
    }

    return 'test';
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
