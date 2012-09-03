TOIMAWB.HOME = [
    {
        'name': 'circle-logo',
        'type': 'kinetic',
        'draw': function() {
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

            var stage1 = new Kinetic.Stage({
                container: "circle-logo",
                width: width,
                height: height
            });

            var layer1 = new Kinetic.Layer({
                id: "layer1" 
            });


            var circleFace = (function() {
                var obj = {};

                obj.face = {
                    id: "face",
                    x: x,
                    y: y,
                    radius: {
                        x: radius,
                        y: radius
                    },
                    fill: 'rgb(127,0,127)'
                };

                obj.eye1 = {
                    id: "eye1",
                    x: x-45,
                    y: x-34,
                    radius: {
                        x: 18,
                        y: 18 
                    },
                    fill: 'black'
                }
                obj.eye2 = {
                    id: "eye2",
                    x: x+45,
                    y: x-34,
                    radius: {
                        x: 18,
                        y: 18 
                    },
                    fill: 'black'
                }
                obj.eye3 = {
                    id: "eye3",
                    x: x,
                    y: x-59,
                    radius: {
                        x: 18,
                        y: 18 
                    },
                    fill: 'black'
                }

                obj.eyeMask1 = {
                    id: "eyeMask1",
                    x: x-45,
                    y: y-22,
                    radius: {
                        x: 16,
                        y: 16
                    },
                    fill: 'rgb(127,0,127)'
                };
                obj.eyeMask2 = {
                    id: "eyeMask2",
                    x: x+45,
                    y: y-22,
                    radius: {
                        x: 16,
                        y: 16
                    },
                    fill: 'rgb(127,0,127)'
                };
                obj.eyeMask3 = {
                    id: "eyeMask3",
                    x: x,
                    y: y-70,
                    radius: {
                        x: 16,
                        y: 16
                    },
                    fill: 'rgb(127,0,127)'
                };
                obj.mouth = {
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
                obj.mouthMask = {
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
            }());

            var squareFace = (function() {
                var obj = {};

                obj.face = {
                    id: 'face',
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    fill: 'rgb(207,140,40)'
                };

                obj.eye1 = {
                    x: x-22 - 56,
                    y: 30,
                    width: 44,
                    height: 44,
                    fill: 'black'
                }
                obj.eye2 = {
                    x: x-22 + 56,
                    y: 30,
                    width: 44,
                    height: 44,
                    fill: 'black'
                }
                // middle eye
                obj.eye3 = {
                    x: x-22,
                    y: 30,
                    width: 43,
                    height: 43,
                    fill: 'black'
                }

                obj.eyeMask1 = {
                    x: x-22 - 56 + 10,
                    y: 30 + 15,
                    width: 44 - 20,
                    height: 44,
                    fill: 'rgb(207,140,40)'
                };
                obj.eyeMask2 = {
                    x: x-22 + 56 + 10,
                    y: 30 + 15,
                    width: 44 - 20,
                    height: 44,
                    fill: 'rgb(207,140,40)'
                };
                obj.eyeMask3 = {
                    x: x-22 + 10,
                    y: 30 + 15,
                    width: 43 - 20,
                    height: 43,
                    fill: 'rgb(207,140,40)'
                };

                obj.mouth = {
                    x: 9,
                    y: 126,
                    width: 178,
                    height: 50,
                    fill: 'black'
                };
                obj.mouthMask = {
                    x: 9+15,
                    y: 126-15,
                    width: 178-30,
                    height: 50,
                    fill: 'rgb(207,140,40)'
                };

                return obj;
            }());

            var circleToSquareFace = (function() {
                var obj = {};

                obj.face = {
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

                obj.eye1 = {
                    x: x-45 - 18,
                    y: y-34 - 18,
                    width: 36,
                    height: 36,
                    cornerRadius: 18,
                    fill: 'black'
                }
                obj.eye2 = {
                    x: x+45 - 18,
                    y: y-34 - 18,
                    width: 36,
                    height: 36,
                    cornerRadius: 18,
                    fill: 'black'
                }
                // middle eye
                obj.eye3 = {
                    x: x-18,
                    y: y-59 - 18,
                    width: 36,
                    height: 36,
                    cornerRadius: 18,
                    fill: 'black'
                }

                obj.eyeMask1 = {
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
                obj.eyeMask2 = {
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
                obj.eyeMask3 = {
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

                obj.mouth = {
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
                obj.mouthMask = {
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
            }());
            var squareToCircleFace = (function() {
                var obj = {};

                obj.face = {
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

                obj.eye1 = {
                    x: x-22 - 56,
                    y: 30,
                    width: 44,
                    height: 44,
                    cornerRadius: 0,
                    fill: 'black'
                }
                obj.eye2 = {
                    x: x-22 + 56,
                    y: 30,
                    width: 44,
                    height: 44,
                    cornerRadius: 0,
                    fill: 'black'
                }
                obj.eye3 = {
                    x: x-22,
                    y: 30,
                    width: 43,
                    height: 43,
                    cornerRadius: 0,
                    fill: 'black'
                }

                obj.eyeMask1 = {
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
                obj.eyeMask2 = {
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
                obj.eyeMask3 = {
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

                obj.mouth = {
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
                obj.mouthMask = {
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
            }());

            var face = new Kinetic.Rect(circleToSquareFace.face); 
            var eye1 = new Kinetic.Rect(circleToSquareFace.eye1);
            var eye2 = new Kinetic.Rect(circleToSquareFace.eye2);
            var eye3 = new Kinetic.Rect(circleToSquareFace.eye3);
            var eyeMask1 = new Kinetic.Rect(circleToSquareFace.eyeMask1);
            var eyeMask2 = new Kinetic.Rect(circleToSquareFace.eyeMask2);
            var eyeMask3 = new Kinetic.Rect(circleToSquareFace.eyeMask3);
            var mouth = new Kinetic.Rect(circleToSquareFace.mouth);
            var mouthMask = new Kinetic.Rect(circleToSquareFace.mouthMask);

            layer1.add(face);
            layer1.add(eye1);
            layer1.add(eye2);
            layer1.add(eye3);
            layer1.add(eyeMask1);
            layer1.add(eyeMask2);
            layer1.add(eyeMask3);
            layer1.add(mouth);
            layer1.add(mouthMask);

            stage1.add(layer1);

            stage1.get('#layer1')[0].on('mousemove tap', circleToSquare);

            function circleToSquare(evt) {
                console.log('circleToSquare');

                stage1.get('#layer1')[0].off('mousemove tap');

                face.transitionTo({
                    duration: duration,
                    cornerRadius: 0,
                    fill: {
                        r: 207,
                        g: 140,
                        b: 40
                    },
                    callback: function() {
                        stage1.get('#layer1')[0].on('mousemove tap', squareToCircle);
                    }
                });

                eye1.transitionTo({
                    duration: duration,
                    x: x-22 - 56,
                    y: 30,
                    width: 44,
                    height: 44,
                    cornerRadius: 0
                });
                eye2.transitionTo({
                    duration: duration,
                    x: x-22 + 56,
                    y: 30,
                    width: 44,
                    height: 44,
                    cornerRadius: 0
                });
                //middle eye
                eye3.transitionTo({
                    duration: duration,
                    x: x-22,
                    y: 30,
                    width: 43,
                    height: 43,
                    cornerRadius: 0
                });

                eyeMask1.transitionTo({
                    duration: duration,
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
                });
                eyeMask2.transitionTo({
                    duration: duration,
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
                });
                eyeMask3.transitionTo({
                    duration: duration,
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
                });

                mouth.transitionTo({
                    duration: duration,
                    x: 9,
                    y: 126,
                    width: 178,
                    height: 50,
                    cornerRadius: {
                        topLeft: 0,
                        topRight: 0,
                        bottomRight: 0,
                        bottomLeft: 0
                    }
                });
                mouthMask.transitionTo({
                    duration: duration,
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
                });
            }

            function squareToCircle(e) {
                console.log('squareToCircle');

                stage1.get('#layer1')[0].off('mousemove tap');

                face.transitionTo({
                    duration: duration,
                    cornerRadius: x,
                    fill: {
                        r: 127,
                        g: 0,
                        b: 127
                    },
                    callback: function() {
                        stage1.get('#layer1')[0].on('mousemove tap', circleToSquare);
                    }
                });
                eye1.transitionTo({
                    duration: duration,
                    x: x-45 - 18,
                    y: y-34 - 18,
                    width: 36,
                    height: 36,
                    cornerRadius: 18
                });
                eye2.transitionTo({
                    duration: duration,
                    x: x+45 - 18,
                    y: y-34 - 18,
                    width: 36,
                    height: 36,
                    cornerRadius: 18
                });
                eye3.transitionTo({
                    duration: duration,
                    x: x-18,
                    y: y-59 - 18,
                    width: 36,
                    height: 36,
                    cornerRadius: 18
                });

                eyeMask1.transitionTo({
                    duration: duration,
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
                });
                eyeMask2.transitionTo({
                    duration: duration,
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
                });
                eyeMask3.transitionTo({
                    duration: duration,
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
                });

                mouth.transitionTo({
                    duration: duration,
                    x: 10,
                    y: y,
                    width: width-20,
                    height: height/2-10,
                    cornerRadius: {
                        topLeft: 0,
                        topRight: 0,
                        bottomRight: radius-10,
                        bottomLeft: radius-10 
                    }
                });
                mouthMask.transitionTo({
                    duration: duration,
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
                });
            }

            return o;
        },
        'position': 0,
        'width': 1,
    },
{
    'name': 'square-logo',
    'type': 'kinetic',
    'draw': function () {},
    'position': 0,
    'width': 1,
},
{
    'name': 'triangle-logo',
    'type': 'kinetic',
    'draw': function () {},
    'position': 0,
    'width': 1,
},
{
    'name': 'about',
    'type': 'div',
    'draw': function () {},
    'position': 3,
    'width': 1,
    'colors': ['rgb(0,0,0)', 'rgb(145,145,145)']
},
{
    'name': 'github',
    'url': 'http://github.com/vijayrudraraju/toimawb',
    'type': 'div',
    'draw': function () {},
    'position': 2,
    'width': 1,
    'colors': ['rgb(85,0,0)', 'rgb(145,0,0)']
},
{
    'name': 'guest book',
    'type': 'div',
    'draw': function () {},
    'position': 1,
    'width': 1,
    'colors': ['rgb(0,85,0)', 'rgb(0,145,0)']
},
{
    'name': 'sketch pad',
    'type': 'div',
    'draw': function () {},
    'position': 0,
    'width': 1,
    'colors': ['rgb(0,0,85)', 'rgb(0,0,145)']
}
];

var image = document.getElementById('app-image');
image.innerHTML = '';

TOIMAWB.bubbleSort(TOIMAWB.HOME);
TOIMAWB.draw(TOIMAWB.HOME);
TOIMAWB.ROUTER = new TOIMAWB.Router(TOIMAWB.HOME);

Backbone.history.start();

if (window.location.href.search(/#$/g) === -1) {
    if (window.location.href.search(/\/$/g) === -1) {
        window.location.href = window.location.href+'/#';
    } else {
        window.location.href = window.location.href+'#';
    }
}
