$(function() {
    window.scrollTo(0,0.9);
    console.log(this);

    var TOIMAWB = 
    (function() {
        var o = {
            _width: 196,
            _height: 196
        };

        var stage = new Kinetic.Stage({
            container: "circle-logo-container",
            width: o._width,
            height: o._height
        });

        var stage2 = new Kinetic.Stage({
            container: "square-logo-container",
            width: o._width,
            height: o._height
        });

        var stage3 = new Kinetic.Stage({
            container: "triangle-logo-container",
            width: o._width,
            height: o._height
        });

        var layer1 = new Kinetic.Layer({
            id: "layer1" 
        });
        var layer2 = new Kinetic.Layer();
        var layer3 = new Kinetic.Layer();

        var x = o._width/2;
        var y = o._height/2;
        var radius = o._width/2;
        var width = o._width;
        var height = o._height;

        var circleFace = (function() {
            var obj = {};

            obj.face = {
                id: "face",
                x: x,
                y: y,
                radius: radius,
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
        var triangleFace = (function() {
            var obj = {};

            obj.face = {
                id: 'face',
                points: [
                    0, 0,
                    width, 0,
                    x, height
                ],
                fill: {
                    r: 17,
                    g: 140,
                    b: 200
                }
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

        var squareToTriangleFace = (function() {
        });

        layer1.add(new Kinetic.Ellipse(circleFace.face));
        layer1.add(new Kinetic.Ellipse(circleFace.eye1));
        layer1.add(new Kinetic.Ellipse(circleFace.eye2));
        layer1.add(new Kinetic.Ellipse(circleFace.eye3));
        layer1.add(new Kinetic.Ellipse(circleFace.eyeMask1));
        layer1.add(new Kinetic.Ellipse(circleFace.eyeMask2));
        layer1.add(new Kinetic.Ellipse(circleFace.eyeMask3));
        layer1.add(new Kinetic.Rect(circleFace.mouth));
        layer1.add(new Kinetic.Rect(circleFace.mouthMask));

        layer2.add(new Kinetic.Rect(squareFace.face));
        layer2.add(new Kinetic.Rect(squareFace.eye1));
        layer2.add(new Kinetic.Rect(squareFace.eye2));
        layer2.add(new Kinetic.Rect(squareFace.eye3));
        layer2.add(new Kinetic.Rect(squareFace.eyeMask1));
        layer2.add(new Kinetic.Rect(squareFace.eyeMask2));
        layer2.add(new Kinetic.Rect(squareFace.eyeMask3));
        layer2.add(new Kinetic.Rect(squareFace.mouth));
        layer2.add(new Kinetic.Rect(squareFace.mouthMask));

        layer3.add(new Kinetic.Ellipse(circleFace.face));
        layer3.add(new Kinetic.Ellipse(circleFace.eye1));
        layer3.add(new Kinetic.Ellipse(circleFace.eye2));
        layer3.add(new Kinetic.Ellipse(circleFace.eye3));
        layer3.add(new Kinetic.Ellipse(circleFace.eyeMask1));
        layer3.add(new Kinetic.Ellipse(circleFace.eyeMask2));
        layer3.add(new Kinetic.Ellipse(circleFace.eyeMask3));
        layer3.add(new Kinetic.Rect(circleFace.mouth));
        layer3.add(new Kinetic.Rect(circleFace.mouthMask));
        /*
        var test  = new Kinetic.Polygon({
            points: [73, 192, 73, 160, 340, 23, 500, 109, 499, 139, 342, 93],
            fill: "#00D2FF",
            stroke: "black",
            strokeWidth: 5
        });
        layer1.add(test);
        */
        stage.add(layer);
        stage2.add(layer2);
        stage3.add(layer3);

        stage.get('#face')[0].on('mouseover tap', circleToSquare);

        function circleToSquare(evt) {
            console.log('circleToSquare');

            layer1.clear();

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

            face.transitionTo({
                duration: 2,
                cornerRadius: 0,
                fill: {
                    r: 207,
                    g: 140,
                    b: 40
                },
                callback: function() {
                    stage.get('#face')[0].off('mouseover tap');
                    layer1.clear();
                    layer1.add(new Kinetic.Rect(squareFace.face));
                    layer1.add(new Kinetic.Rect(squareFace.eye1));
                    layer1.add(new Kinetic.Rect(squareFace.eye2));
                    layer1.add(new Kinetic.Rect(squareFace.eye3));
                    layer1.add(new Kinetic.Rect(squareFace.eyeMask1));
                    layer1.add(new Kinetic.Rect(squareFace.eyeMask2));
                    layer1.add(new Kinetic.Rect(squareFace.eyeMask3));
                    layer1.add(new Kinetic.Rect(squareFace.mouth));
                    layer1.add(new Kinetic.Rect(squareFace.mouthMask));

                    stage.get('#face')[0].on('mouseover tap', squareToTriangle);
                }
            });
            eye1.transitionTo({
                duration: 2,
                x: x-22 - 56,
                y: 30,
                width: 44,
                height: 44,
                cornerRadius: 0
            });
            eye2.transitionTo({
                duration: 2,
                x: x-22 + 56,
                y: 30,
                width: 44,
                height: 44,
                cornerRadius: 0
            });
            eye3.transitionTo({
                duration: 2,
                x: x-22,
                y: 30,
                width: 44,
                height: 44,
                cornerRadius: 0
            });
            eyeMask1.transitionTo({
                duration: 2,
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
                duration: 2,
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
                duration: 2,
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
                duration: 2,
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
                duration: 2,
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

        function squareToTriangle(evt) {
            console.log('squareToTriangle');

            layer1.clear();

/*
            var test = {
                id: 'face',
                points: [
                    0, 0,
                    width, 0,
                    x, height
                ],
                fill: {
                    r: 17,
                    g: 140,
                    b: 200
                },
                stroke: 'black'
            };
            */

            var test  = new Kinetic.Polygon({
                points: [73, 192, 73, 160, 340, 23, 500, 109, 499, 139, 342, 93],
                fill: "#00D2FF",
                stroke: "black",
                strokeWidth: 5
            });
            var face = new Kinetic.Rect(circleToSquareFace.face); 

            //var face = new Kinetic.Polygon(test); 
            //var face = new Kinetic.Polygon(triangleFace.face); 

            layer1.add(face);
            layer1.add(test);
            stage.add(layer);

        }

        o.drawTriangleFace = function(p)
        {
            var x = this._logoWidth/2;
            var y = this._logoHeight/2;
            var width = this._logoWidth;
            var height = this._logoHeight;

            // face
            p.fill(17,140,200);
            p.noStroke();
            p.triangle(
                0, 0,
                width, 0,
                x, height
            );

            // eyes
            p.fill(0,0,0);
            p.triangle(
                x - 40, 15,
                x-22 - 40, 40+15,
                x+22 - 40, 40+15
            );
            p.triangle(
                x + 40, 15,
                x-22 + 40, 40+15,
                x+22 + 40, 40+15
            );
            p.triangle(
                x, 40+30,
                x-22, 30,
                x+22, 30 
            );
            p.fill(17,140,200);
            p.triangle(
                x - 40, 15 + 20,
                x-22 - 40, 40+15 + 20,
                x+22 - 40, 40+15 + 20
            );
            p.triangle(
                x + 40, 15 + 20,
                x-22 + 40, 40+15 + 20,
                x+22 + 40, 40+15 + 20
            );
            p.triangle(
                x, 40+30 - 20,
                x-22, 30 - 20,
                x+22, 30 - 20 
            );

            // mouth
            p.fill(0,0,0);
            p.triangle(
                60, 100,
                width-60, 100,
                x, height-20
            );
            p.fill(17,140,200);
            p.triangle(
                80, 100,
                width-80, 100,
                x, height-60
            );
        };

        return o;
    })();

    console.log('TOIMAWB', TOIMAWB);
});
