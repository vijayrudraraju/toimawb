/*TOIMAWB.HOME = [
    {
        'name': 'about',
        'shapes': [
            (function() {
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

                var obj = [];

                obj[0] = {
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    cornerRadius: x,
                    fill: {
                        r: 127,
                        g: 0,
                        b: 127
                    }
                };
                obj[1] = {
                    x: x-45 - 18,
                    y: y-34 - 18,
                    width: 36,
                    height: 36,
                    cornerRadius: 18,
                    fill: 'black'
                };
                obj[2] = {
                    x: x+45 - 18,
                    y: y-34 - 18,
                    width: 36,
                    height: 36,
                    cornerRadius: 18,
                    fill: 'black'
                };
                // middle eye
                obj[3] = {
                    x: x-18,
                    y: y-59 - 18,
                    width: 36,
                    height: 36,
                    cornerRadius: 18,
                    fill: 'black'
                };
                obj[4] = {
                    x: x-45 - 17,
                    y: y-22 - 17,
                    width: 36 - 3,
                    height: 36 - 3,
                    cornerRadius: 16,
                    fill: {
                        r: 127,
                        g: 0,
                        b: 127
                    }
                };
                obj[5] = {
                    x: x+45 - 17,
                    y: y-22 - 17,
                    width: 36 - 3,
                    height: 36 - 3,
                    cornerRadius: 16,
                    fill: {
                        r: 127,
                        g: 0,
                        b: 127
                    }
                };
                obj[6] = {
                    x: x-17,
                    y: y-70 - 17,
                    width: 36 - 3,
                    height: 36 - 3,
                    cornerRadius: 16,
                    fill: {
                        r: 127,
                        g: 0,
                        b: 127
                    }
                };
                obj[7] = {
                    id: "mouth",
                    x: 10,
                    y: y,
                    width: width-20,
                    height: height/2-10,
                    cornerRadius: {
                        topLeft: 0,
                        topRight: 0,
                        bottomRight: radius-10,
                        bottomLeft: radius-10 
                    },
                    fill: {
                        r: 0,
                        g: 0,
                        b: 0
                    }
                };
                obj[8] = {
                    id: "mouthMask",
                    x: 10, 
                    y: y-25,
                    width: width-20,
                    height: height/2-10,
                    cornerRadius: {
                        topLeft: 0,
                        topRight: 0,
                        bottomRight: radius-10,
                        bottomLeft: radius-10 
                    },
                    fill: {
                        r: 127,
                        g: 0,
                        b: 127
                    }
                };

                return obj;
            }()),
            (function() {
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

                var obj = [];

                obj[0] = {
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    cornerRadius: 0,
                    fill: {
                        r: 207,
                        g: 140,
                        b: 40 
                    }
                };
                obj[1] = {
                    x: x-22 - 56,
                    y: 30,
                    width: 44,
                    height: 44,
                    cornerRadius: 0,
                    fill: 'black'
                };
                obj[2] = {
                    x: x-22 + 56,
                    y: 30,
                    width: 44,
                    height: 44,
                    cornerRadius: 0,
                    fill: 'black'
                };
                obj[3] = {
                    x: x-22,
                    y: 30,
                    width: 43,
                    height: 43,
                    cornerRadius: 0,
                    fill: 'black'
                };
                obj[4] = {
                    x: x-22 - 56 + 10,
                    y: 30 + 15,
                    width: 44 - 20,
                    height: 44,
                    cornerRadius: 0,
                    fill: {
                        r: 207,
                        g: 140,
                        b: 40 
                    }
                };
                obj[5] = {
                    x: x-22 + 56 + 10,
                    y: 30 + 15,
                    width: 44 - 20,
                    height: 44,
                    cornerRadius: 0,
                    fill: {
                        r: 207,
                        g: 140,
                        b: 40 
                    }
                };
                obj[6] = {
                    x: x-22 + 10,
                    y: 30 + 15,
                    width: 43 - 20,
                    height: 43,
                    cornerRadius: 0,
                    fill: {
                        r: 207,
                        g: 140,
                        b: 40 
                    }
                };
                obj[7] = {
                    id: "mouth",
                    x: 9,
                    y: 126,
                    width: 178,
                    height: 50,
                    cornerRadius: {
                        topLeft: 0,
                        topRight: 0,
                        bottomRight: 0,
                        bottomLeft: 0
                    },
                    fill: {
                        r: 0,
                        g: 0,
                        b: 0
                    }
                };
                obj[8] = {
                    id: "mouthMask",
                    x: 9+15,
                    y: 126-15,
                    width: 178-30,
                    height: 50,
                    cornerRadius: {
                        topLeft: 0,
                        topRight: 0,
                        bottomRight: 0,
                        bottomLeft: 0
                    },
                    fill: {
                        r: 207,
                        g: 140,
                        b: 40 
                    }
                };

                return obj;
            }())
        ],
        'position': 0,
        'width': 1,
        'colors': ['rgb(0,0,0)', 'rgb(145,145,145)']
    },
    {
        'name': 'github',
        'url': 'http://github.com/vijayrudraraju/toimawb',
        'shapes': [],
        'position': 2,
        'width': 1,
        'colors': ['rgb(85,0,0)', 'rgb(145,0,0)']
    },
    {
        'name': 'guest book',
        'shapes': [],
        'position': 1,
        'width': 1,
        'colors': ['rgb(0,85,0)', 'rgb(0,145,0)']
    },
    {
        'name': 'sketch pad',
        'shapes': [],
        'position': 0,
        'width': 1,
        'colors': ['rgb(0,0,85)', 'rgb(0,0,145)']
    },
    {
        'name': 'physics',
        'colors': ['rgb(0,0,85)', 'rgb(0,0,145)']
    },
    {
        'name': 'math',
        'colors': ['rgb(0,0,85)', 'rgb(0,0,145)']
    },
    {
        'name': 'music',
        'colors': ['rgb(0,0,85)', 'rgb(0,0,145)']
    }
];
*/

TOIMAWB.LETTERS = [
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
];

TOIMAWB.COLORS = [
    'rgb(155,0,0)', 'rgb(0,155,0)', 'rgb(0,0,155)',
    'rgb(155,155,0)', 'rgb(155,0,155)', 'rgb(0,155,155)'
]

TOIMAWB.HOMENOTES = [
    {
        'name': 'add text',
        'position': 0,
        'colors': ['rgb(0,0,85)', 'rgb(0,0,145)']
    },
    {
        'name': 'draw sketch',
        'position': 1,
        'colors': ['rgb(0,0,85)', 'rgb(0,0,145)']
    },
];

var image = document.getElementById('app-image');
image.innerHTML = '';

TOIMAWB.PROCESSED_LETTERS = TOIMAWB.process(TOIMAWB.LETTERS);
console.log('TOIMAWB.PROCESSED_LETTERS', TOIMAWB.PROCESSED_LETTERS);
TOIMAWB.GENERATED_LETTERS = TOIMAWB.generate(TOIMAWB.PROCESSED_LETTERS);
TOIMAWB.draw(TOIMAWB.GENERATED_LETTERS);

//TOIMAWB.bubbleSort(TOIMAWB.HOME);
//TOIMAWB.draw(TOIMAWB.HOME);
//TOIMAWB.stick(TOIMAWB.HOMENOTES);
TOIMAWB.ROUTER = new TOIMAWB.Router(TOIMAWB.HOME);

Backbone.history.start();

if (window.location.href.search(/#$/g) === -1) {
    if (window.location.href.search(/\/$/g) === -1) {
        window.location.href = window.location.href+'/#';
    } else {
        window.location.href = window.location.href+'#';
    }
}
