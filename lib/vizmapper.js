// node properties
// > name
// > direction
// > rate - source
// > x - sink
// > y - sink

//FIXME all structures seem to have a last element of undefined
var _nodes = new Assoc();
var _connections = new Assoc();
var _oscillators = [];
var ids = [];

var _appMode = 0; //


var globalP;
var isAbouting = false;
var isHelping = false;


// app coordinates
var _screenWidth = 1280;
var _screenHeight = 680;
var _graphWidth = 500;

var _graphCenterX = 640;
var _graphCenterY = 45+(600/2);
var _graphCenterLeftX = 550;
var _graphCenterLeftY = 45+(600/2);
var _graphCenterRightX = _screenWidth-550;
var _graphCenterRightY = 45+(600/2);


// button layouts
var buttonGlyphMap = [{mouseOver:false,x:290,y:118},{mouseOver:false,x:_screenWidth-290,y:118},{mouseOver:false},{mouseOver:false},{mouseOver:false}]; // add source, add sink, select source, select sink, modify conneciton

// data layouts
var connectionGlyphMap = [];
var nodeGlyphMap = {sources:new Assoc(),sinks:new Assoc()};

// navigation layouts
var listGlyphMap = [[],[]];
var traversalGlyphMap = [[],[]];

var mousedSource = "";
var mousedSink = "";
var selectedSource = "none";
var selectedSink = "none";
var changingSource = "none";
var changingSink = "none";

var _mouseX = globalP.mouseX;
var _mouseY = globalP.mouseY;

var _sourceBranchTrace = [];
var _sinkBranchTrace = [];
var _sourceLabelTrace = ["all sources"];
var _sinkLabelTrace = ["all sinks"];

var _updateDataGraph = true;



$(function() 
{
    globalP = new Processing($('#global-canvas')[0],globalP);


    $('#create-source-button').click(function() 
    {
        window.App.saveNewSourceToServer();
    });
    $('#create-sink-button').click(function() 
    {
        window.App.saveNewSinkToServer();
    });
    $('#edit-source-button').click(function() 
    {
        window.App.saveUpdatedSourceToServer();
    });
    $('#edit-sink-button').click(function() 
    {
        window.App.saveUpdatedSinkToServer();
    });
    $('#delete-source-button').click(function() 
    {
        window.App.deleteSourceFromServer();
    });
    $('#delete-sink-button').click(function() 
    {
        window.App.deleteSinkFromServer();
    });


    $('#connection-button').click(function()
    {
        window.App.saveConnectionsToServer();
    });
    $('#delete-connection-button').click(function()
    {
        window.App.deleteConnectionFromServer();
    });


    $('#edit-source-rate-range').change(function()
    {
        var num = parseFloat($('#edit-source-rate-range').val()).toFixed(1);
        $('#edit-source-rate-range-value').html(num);
    });
    $('#edit-sink-minx-range').change(function()
    {
        var num = parseInt($('#edit-sink-minx-range').val());
        $('#edit-sink-minx-range-value').html(num);
    });
    $('#edit-sink-maxx-range').change(function()
    {
        var num = parseInt($('#edit-sink-maxx-range').val());
        $('#edit-sink-maxx-range-value').html(num);
    });
    $('#edit-sink-miny-range').change(function()
    {
        var num = parseInt($('#edit-sink-miny-range').val());
        $('#edit-sink-miny-range-value').html(num);
    });
    $('#edit-sink-maxy-range').change(function()
    {
        var num = parseInt($('#edit-sink-maxy-range').val());
        $('#edit-sink-maxy-range-value').html(num);
    });





    $('#about-switch').click(function() 
    {
        isAbouting = !isAbouting;
        if (isAbouting) 
        {
            activateAboutMode();
        } 
        else 
        {
            deactivateAboutMode();
        }
        globalP.redraw();
    });
    $('#help-switch').click(function() 
    {
        isHelping = !isHelping;
        if (isHelping) 
        {
            activateHelpMode();
        } 
        else 
        {
            deactivateHelpMode();
        }
        globalP.redraw();
    });



    $('#create-tab').click(function() 
    {
        activateCreateMode();
        _updateDataGraph = true;
        globalP.redraw();
        _updateDataGraph = true;
        globalP.redraw();
    });
    $('#watch-tab').click(function() 
    {
        activateWatchMode();
        globalP.redraw();
    });
    $('#add-tab').click(function() 
    {
        activateAddMode();
        _updateDataGraph = true;
        globalP.redraw();
        _updateDataGraph = true;
        globalP.redraw();
    });

    $('#filter-input').keyup(function(event) 
    {
        event.preventDefault();
        _updateDataGraph = true;
        globalP.redraw();
    });
    $('#source-name-input').keyup(function(event) 
    {
        event.preventDefault();
        console.log($('#source-name-input').val());

        var str = getCurrentSourcePathPrefix() + $('#source-name-input').val();
        $('#source-path').text(str);
    });
    $('#sink-name-input').keyup(function(event) 
    {
        event.preventDefault();
        console.log($('#sink-name-input').val());

        var str = getCurrentSinkPathPrefix() + $('#sink-name-input').val();
        $('#sink-path').text(str);
    });
    $('#edit-source-name-input').keyup(function(event) 
    {
        event.preventDefault();

        var str = getCurrentSourcePathPrefix() + $('#edit-source-name-input').val();
        $('#edit-source-path').text(str);
    });
    $('#edit-sink-name-input').keyup(function(event) 
    {
        event.preventDefault();

        var str = getCurrentSinkPathPrefix() + $('#edit-sink-name-input').val();
        $('#edit-sink-path').text(str);
    });



    $('#global-canvas').dblclick(function(event)
    {
        event.preventDefault();
        if (document.selection && document.selection.empty) 
        {
            document.selection.empty();
        }
        else if (window.getSelection)
        {
            var sel = window.getSelection();
            sel.removeAllRanges();
        }
    });



    Backbone.couch_connector.config.db_name = "toimawb";
    Backbone.couch_connector.config.ddoc_name = "one";

    window.BlawkModel= Backbone.Model.extend(
    {
        url: '/mappings'
    }); 

    window.BlawkCollection = Backbone.Collection.extend(
    {

        model: BlawkModel,
        localStorage: new Store('mappings'),
        url: "/mappings"
    });

    window.Blawks = new BlawkCollection;

    window.AppView = Backbone.View.extend(
    {
        events: {
        },  
        onReset: function(coll,resp) 
        {
            console.log('onReset(coll, resp)');
            console.log('remote coll', coll);
            console.log('local coll', coll.localStorage);
            console.log('resp', resp);

            if (coll.length === 0 && coll.localStorage.records.length === 0) 
            {
                console.log('local and remote mawbs empty');
                var nodes = [];
                var connections = [];
                Blawks.create({nodes:nodes, connections:connections});
            } 
            else if (coll.length === 0) 
            {
                console.log('remote mawbs empty, loading local mawbs');
                var localModel = coll.localStorage.findAll()[0];
                Blawks.create({nodes:localModel.nodes, connections:localModel.connections});
            } 
            else if (coll.localStorage.records.length === 0) 
            {
                console.log('local mawbs empty, loading remote mawbs');
                Blawks.at(0).sync = Backbone.localSync;
                try 
                {
                    Blawks.at(0).save();
                } 
                catch(e) 
                {
                    console.log('>> In private browsing mode');
                    //alert('Private browsing mode!');
                }
                delete Blawks.at(0).sync;
            } 
            else 
            {
                console.log('local and remote mawbs found, using remote as true copy');
                Blawks.at(0).sync = Backbone.localSync;
                try 
                {
                    Blawks.at(0).save();
                } 
                catch(e) 
                {
                    console.log('>> In private browsing mode');
                    //alert('Private browsing mode!');
                }
                delete Blawks.at(0).sync;
            }

            _nodes.removeAll(); 
            var nodes = Blawks.at(0).get('nodes');
            for (var i=0;i<nodes.length;i++) 
            {
                _nodes.add(nodes[i].name+' '+nodes[i].direction, nodes[i]);
            }

            _connections.removeAll(); 
            var connections = Blawks.at(0).get('connections');
            for (var i=0;i<connections.length;i++) 
            {
                _connections.add(connections[i].source+'>'+connections[i].sink, connections[i]);
            }

            _updateDataGraph = true;
            globalP.redraw();
        },
        saveToServer: function() 
        {
            Blawks.at(0).save({},{
                success: function() 
                { 
                    console.log('save success'); 
                    Blawks.fetch({
                        success: function() 
                        { 
                            console.log('post-save fetch success');
                            $('#add-source-form').toggle(false);
                            $('#add-sink-form').toggle(false);
                            $('#edit-source-form').toggle(false);
                            $('#edit-sink-form').toggle(false);
                            $('#edit-connection-form').toggle(false);
                            _appMode = 0;
                        }
                    });
                }
            });
        },
        saveNewSourceToServer: function() 
        {
            console.log('saveNewSourceToServer()');

            var nameSink = $('#source-name-input').val();

            if (nameSink === '') 
            {
                return;
            }

            //console.log(_sourceBranchTrace,_sourceLabelTrace); 
            var nodes = Blawks.at(0).get('nodes');

            var str = getCurrentSourcePathPrefix();

            var name = '';
            for (var i=nodes.length-1;i>=0;i--)
            {
                name = nodes[i].name;

                // already exists
                if (str+nameSink === name && nodes[i].direction === '1') 
                {
                    this.saveToServer(); 
                    return;
                }
            }

            nodes.push({name:str+nameSink, direction:'1', rate:0.5});

            Blawks.at(0).set('nodes',nodes);
            this.saveToServer(); 
        },
        saveUpdatedSourceToServer: function() 
        {
            console.log('saveUpdatedSourceToServer()');

            var nameSink = $('#edit-source-name-input').val();

            if (nameSink === '') 
            {
                return;
            }

            var nodes = Blawks.at(0).get('nodes');
            var updatedNode = {};

            var name = '';
            var num;

            var str = getCurrentSourcePathPrefix()+nameSink;

            console.log(str);
            console.log(changingSource);
            console.log(nodes);

            for (var i=0; i<nodes.length; i++) 
            {
                name = nodes[i].name;
                name = name.indexOf(changingSource);

                if (name !== -1 && nodes[i].direction === '1')
                {
                    nodes[i].name = nodes[i].name.replace(changingSource,str);
                    num = parseFloat($('#edit-source-rate-range').val()).toFixed(1);
                    nodes[i].rate = num;
                }
            }

            Blawks.at(0).set('nodes',nodes);
            this.saveToServer(); 
        },
        deleteSourceFromServer: function()
        {
            console.log('deleteSourceFromServer()');

            var nodes = Blawks.at(0).get('nodes');
            var name = '';

            for (var i=nodes.length-1;i>=0;i--)
            {
                name = nodes[i].name;
                name = name.indexOf(changingSource);
                if (name !== -1 && nodes[i].direction === '1')
                {
                    nodes.splice(i,1);
                }
            }

            Blawks.at(0).set('nodes',nodes);
            this.saveToServer();
        },
        saveNewSinkToServer: function() 
        {
            console.log('saveNewSinkToServer()');

            var nameSink = $('#sink-name-input').val();

            if (nameSink === '') 
            {
                return;
            }
            
            //console.log(_sinkBranchTrace,_sinkLabelTrace); 
            var nodes = Blawks.at(0).get('nodes');

            var str = getCurrentSinkPathPrefix();

            var name = '';
            for (var i=nodes.length-1;i>=0;i--)
            {
                name = nodes[i].name;

                // already exists
                if (str+nameSink === name && nodes[i].direction === '0') 
                {
                    this.saveToServer(); 
                    return;
                }
            }

            nodes.push({name:str+nameSink, direction:'0', minx:0, maxx:0, miny:0, maxy:0});

            Blawks.at(0).set('nodes',nodes);
            this.saveToServer(); 
        },
        saveUpdatedSinkToServer: function() 
        {
            console.log('saveUpdatedSinkToServer()');

            var nameSink = $('#edit-sink-name-input').val();

            if (nameSink === '') 
            {
                return;
            }
            
            var nodes = Blawks.at(0).get('nodes');
            var updatedNode = {};

            var name = '';
            var num = 0;

            var str = getCurrentSinkPathPrefix()+nameSink;

            for (var i=0; i<nodes.length; i++) 
            {
                name = nodes[i].name;
                name = name.indexOf(changingSink);

                if (name !== -1 && nodes[i].direction === '0')
                {
                    nodes[i].name = nodes[i].name.replace(changingSink,str);

                    num = parseInt($('#edit-sink-minx-range').val());
                    nodes[i].minx = num;
                    num = parseInt($('#edit-sink-maxx-range').val());
                    nodes[i].maxx = num;
                    num = parseInt($('#edit-sink-miny-range').val());
                    nodes[i].miny = num;
                    num = parseInt($('#edit-sink-maxy-range').val());
                    nodes[i].maxy = num;
                }
            }

            Blawks.at(0).set('nodes',nodes);
            this.saveToServer(); 
        },
        deleteSinkFromServer: function()
        {
            console.log('deleteSinkFromServer()');

            var nodes = Blawks.at(0).get('nodes');
            var name = '';

            for (var i=nodes.length-1; i>=0; i--) 
            {
                name = nodes[i].name;
                name = name.indexOf(changingSink);
                if (name !== -1 && nodes[i].direction === '0')
                {
                    nodes.splice(i,1);
                }
            }

            Blawks.at(0).set('nodes',nodes);
            this.saveToServer();
        },
        saveConnectionsToServer: function()
        {
            console.log('saveConnectionsToServer()');

            var connections = Blawks.at(0).get('connections');
            connections.push({source:selectedSource,sink:selectedSink});

            Blawks.at(0).set('connections',connections);
            this.saveToServer();
        },
        deleteConnectionFromServer: function()
        {
            console.log('deleteConnectionFromServer()');
        },
        initialize: function() 
        {
            Blawks.on('reset', this.onReset, this);
            Blawks.fetch({success: function() 
                { 
                    console.log('initial fetch success');
                }
            });
        }
    });

    window.App = new AppView;

    activateCreateMode();
    globalP.redraw();

});






var mousePressed = false;
function globalP(p) 
{
	p.mouseMoved = function() 
    {
		if ($('#create-tab').hasClass('active')) 
        {
            _mouseX = p.mouseX;
            _mouseY = p.mouseY;
            p.redraw();
        }
	};

	p.mouseClicked = function() 
    {
		if ($('#create-tab').hasClass('active')) 
        {
            //detectConnectButtonClick();
            detectNodeClick();
            detectAddButtonClick();
            detectTraversalClick();
            detectListGlyphClick();

            mousePressed = false;
            p.redraw();
		} 
	};

    p.mousePressed = function() 
    {
		if ($('#create-tab').hasClass('active')) 
        {
            mousePressed = true;
            p.redraw();
        }
    }

	p.setup = function() 
    {
		p.size(_screenWidth,_screenHeight);
		var font = p.loadFont("monospace");
		p.textFont(font);
        p.frameRate(40);
	};

	p.draw = function() 
    {
        if ($('#create-tab').hasClass('active')) 
        {
            console.log('> creating');

            if (_updateDataGraph) 
            {
                updateActiveFilter();
                updateSignalMatches();
                updateLevelStructure();

                updateNodeGlyphMap(false);
                updateConnectionGlyphMap(false);

                if (_updateDataGraph == 2) 
                {
                    _updateDataGraph = false;
                    p.redraw();
                } 
                else 
                {
                    _updateDataGraph = 2;
                    p.redraw();
                }
            }

            $('html').toggleClass('viewColor',true);
            $('html').toggleClass('editColor',false);

            p.background(204,238,204);
            drawBackground();

            updateNodeMouseState();
            updateListGlyphMouseState();
            if (_appMode === 0)
            {
                updateAddButtonMouseState();
            }

            // if viewing all nodes
            if (_appMode === 0)
            {
                drawConnections();
                drawTraversalGlyphs();
                drawAddButtons();
                drawListGlyphs();
            }
            // if editing a source node
            else if (_appMode === 1)
            {
                drawChangingSourceConnections();
                drawChangingSourceNode();
            }
            // if editing a sink node
            else if (_appMode === 2)
            {
                drawChangingSinkConnections();
                drawChangingSinkNode();
            }
            drawNodes();

            p.noLoop();
        } 
        else if ($('#watch-tab').hasClass('active')) 
        {
            //console.log('> watching');

            $('html').toggleClass('viewColor',false);
            $('html').toggleClass('editColor',true);

            p.background(203,246,245);

            drawScene();

            p.loop();
        } 

	};
}



function initializeScene()
{
    _oscillators = [];
    for (var i=0;i<_connections.keys().length;i++)
    {
        _oscillators.push([0.0,1]);
    }
}
function drawScene()
{
    var keys = _connections.keys();
    var source = {};
    var sink = {};
    for (var i=0;i<keys.length;i++) {
        source = getNodeByName(_connections.get(keys[i]).source,'1');
        sink = getNodeByName(_connections.get(keys[i]).sink,'0');

        if (source !== null && sink !== null) {
            globalP.ellipse(
                sink.minx+(sink.maxx-sink.minx)*_oscillators[i][0],
                sink.miny+(sink.maxy-sink.miny)*_oscillators[i][0],
                100,
                100
            );

            if (_oscillators[i][1] === 1) 
            {
                _oscillators[i][0] += 1.0/10.0*source.rate;
                if (_oscillators[i][0] > 1.0)
                {
                    _oscillators[i][1] = -1;
                }
            }
            else 
            {
                _oscillators[i][0] -= 1.0/10.0*source.rate;
                if (_oscillators[i][0] < 0.0)
                {
                    _oscillators[i][1] = 1;
                }
            }
        }
    }
}



function updateNodeMouseState() 
{
    mousedSource = "";
    mousedSink = "";

    // hover detection of source nodes and destination nodes 
    if ($('#create-tab').hasClass('active')) 
    {
        var thisX = 0; // sink,level,container,drawingNumbers,thisX
        var thisY = 0;
        var thisRadius = 0;

        var keys = nodeGlyphMap.sources.keys();
        var sourcePaths = getCurrentSourcePathsFromNodes();
        for (var i=0;i<keys.length;i++) 
        {
            if (!nodeGlyphMap.sources.get(keys[i]).visible) 
            {
                continue;
            }

            thisX = nodeGlyphMap.sources.get(keys[i]).layoutX;
            thisY = nodeGlyphMap.sources.get(keys[i]).layoutY;
            thisRadius = nodeGlyphMap.sources.get(keys[i]).symbolWidth/2;

            // is the mouse within the bounds of the node glyph?
            if (Math.pow(_mouseX-thisX,2)+Math.pow(_mouseY-thisY,2) < Math.pow(thisRadius,2)) 
            {
                nodeGlyphMap.sources.get(keys[i]).mouseOver = true;
                mousedSource = sourcePaths[i];
            } 
            else 
            {
                nodeGlyphMap.sources.get(keys[i]).mouseOver = false;
            }
        }

        keys = nodeGlyphMap.sinks.keys();
        var destinationPaths = getCurrentSinkPathsFromNodes();
        for (var i=0;i<keys.length;i++) 
        {
            if (!nodeGlyphMap.sinks.get(keys[i]).visible) 
            {
                continue;
            }

            thisX = nodeGlyphMap.sinks.get(keys[i]).layoutX;
            thisY = nodeGlyphMap.sinks.get(keys[i]).layoutY;
            thisRadius = nodeGlyphMap.sinks.get(keys[i]).symbolWidth/2;

            // is the mouse within the bounds of the node glyph?
            if (Math.pow(_mouseX-thisX,2)+Math.pow(_mouseY-thisY,2) < Math.pow(thisRadius,2)) 
            {
                nodeGlyphMap.sinks.get(keys[i]).mouseOver = true;
                mousedSink = destinationPaths[i];
            } 
            else 
            {
                nodeGlyphMap.sinks.get(keys[i]).mouseOver = false;
            }
        }
    }

    if (mousedSource == "") 
    {
        $('#selected-source').text(selectedSource);
    } 
    else 
    {
        $('#selected-source').text(mousedSource);
    }
    if (mousedSink == "") 
    {
        $('#selected-sink').text(selectedSink);
    } 
    else 
    {
        $('#selected-sink').text(mousedSink);
    }
}
function updateConnectionMouseState() 
{
    // hover detection of connections
    // check mouse position against where points are on the bezier equation
    // B(t) = ((1-t)^3)*(P0) + (3*(1-t)^2)*(t)*(P1) + (3*(1-t)*t^2)*(P2) + (t^3)*(P3)
    var keys = connectionGlyphMap.keys();
    var x1, y1, x2, y2;
    var cx1, cy1, cx2, cy2;
    var xs;
    var ys;
    for (var i=0;i<keys.length;i++) 
    {
        x1 = connectionGlyphMap.get(keys[i]).x1;
        y1 = connectionGlyphMap.get(keys[i]).y1;
        x2 = connectionGlyphMap.get(keys[i]).x2;
        y2 = connectionGlyphMap.get(keys[i]).y2;
        cx1 = connectionGlyphMap.get(keys[i]).cx1;
        cy1 = connectionGlyphMap.get(keys[i]).cy1;
        cx2 = connectionGlyphMap.get(keys[i]).cx2;
        cy2 = connectionGlyphMap.get(keys[i]).cy2;
        xs = [x1,cx1,cx2,x2];
        ys = [y1,cy1,cy2,y2];
        xs.sort(function(a,b){return a-b;});
        ys.sort(function(a,b){return a-b;});

        if (_mouseX<xs[3] && _mouseX>xs[0] &&
        _mouseY<ys[3] && _mouseY>ys[0]) 
        {
            var xLength = Math.abs(Math.round(x1-x2));
            for (var j=0;j<xLength;j++) 
            {
                var t = j/xLength;

                var microX = (Math.pow(1-t,3)*x1) +
                    (3*Math.pow(1-t,2)*t*cx1) +
                    (3*(1-t)*Math.pow(t,2)*cx2) +
                    (Math.pow(t,3)*x2);
                var microY = (Math.pow(1-t,3)*y1) +
                    (3*Math.pow(1-t,2)*t*cy1) +
                    (3*(1-t)*Math.pow(t,2)*cy2) +
                    (Math.pow(t,3)*y2);
                if (_mouseX<microX+4 && _mouseX>microX-4 &&
                _mouseY<microY+4 && _mouseY>microY-4) 
                {
                    connectionGlyphMap.get(keys[i]).mouseOver = true;
                    break;
                }
                if (j==xLength-1) 
                {
                    connectionGlyphMap.get(keys[i]).mouseOver = false;
                }
            }
        } 
        else 
        {
            connectionGlyphMap.get(keys[i]).mouseOver = false;
        }
    }

}



function detectAddButtonClick() 
{
    if (buttonGlyphMap[0].clicked)
    {
        $('#source-name-input').val('');
        $('#add-source-form').toggle(true);

        $('#source-path').text(getCurrentSourcePathPrefix());
    }
    else 
    {
        $('#add-source-form').toggle(false);
    }

    if (buttonGlyphMap[1].clicked)
    {
        $('#sink-name-input').val('');
        $('#add-sink-form').toggle(true);

        $('#sink-path').text(getCurrentSinkPathPrefix());
    }
    else 
    {
        $('#add-sink-form').toggle(false);
    }
}
function detectConnectButtonClick() {
    if (buttonGlyphMap[2].clicked)
    {
        buttonGlyphMap[2].toggled = !buttonGlyphMap[2].toggled;
        buttonGlyphMap[3].toggled = false;
    }

    if (buttonGlyphMap[3].clicked)
    {
        buttonGlyphMap[3].toggled = !buttonGlyphMap[3].toggled;
        buttonGlyphMap[2].toggled = false;
    }

    if (buttonGlyphMap[4].clicked)
    {
        $('#edit-connection-form').toggle(true);
    }
    else
    {
        $('#edit-connection-form').toggle(false);
    }
}





function detectListGlyphClick() 
{
    console.log('detectListGlyphClick()');

    var str = '';
    var node = {};
    var toggle = false;
    _appMode = 0;
    var keys = nodeGlyphMap.sources.keys();
    var connections = [];

    for (var i=0;i<keys.length;i++) 
    {
        if (nodeGlyphMap.sources.get(keys[i]).edit) 
        {
            _appMode = 1;
            toggle = true;
            str = getCurrentSourcePathPrefix();
            $('#edit-source-path').text(str+keys[i]);
            $('#edit-source-name-input').val(keys[i]);

            node = getNodeByName(str+keys[i],'1');
            connections = getConnectionsBySourceName(str+keys[i]);

            if (node) 
            {
                $('#edit-source-rate-range').val(node.rate);
                $('#edit-source-rate-range-value').html(node.rate);
                $('#edit-source-rate').toggle(true);
                $('#edit-source-connections').html('');
                for (var j=0;j<connections.length;j++)
                {
                    $('#edit-source-connections').append('<option value="'+j+'">'+connections[j].source+' > '+connections[j].sink+'</option>');
                }
            }
            else
            {
                $('#edit-source-rate-range').val(0);
                $('#edit-source-rate').toggle(false);
            }

            changingSource = str+keys[i];
        }
    }
    $('#edit-source-form').toggle(toggle);

    toggle = false;
    keys = nodeGlyphMap.sinks.keys();
    for (var i=0;i<keys.length;i++) 
    {
        if (nodeGlyphMap.sinks.get(keys[i]).edit) 
        {
            _appMode = 2;
            toggle = true;
            str = getCurrentSinkPathPrefix();
            $('#edit-sink-path').text(str+keys[i]);
            $('#edit-sink-name-input').val(keys[i]);

            node = getNodeByName(str+keys[i],'0');
            connections = getConnectionsBySinkName(str+keys[i]);

            if (node) 
            {
                $('#edit-sink-minx-range').val(node.minx);
                $('#edit-sink-maxx-range').val(node.maxx);
                $('#edit-sink-miny-range').val(node.miny);
                $('#edit-sink-maxy-range').val(node.maxy);
                $('#edit-sink-minx-range-value').html(node.minx);
                $('#edit-sink-maxx-range-value').html(node.maxx);
                $('#edit-sink-miny-range-value').html(node.miny);
                $('#edit-sink-maxy-range-value').html(node.maxy);
                $('#edit-sink-display').toggle(true);
                $('#edit-sink-connections').html('');
                for (var j=0;j<connections.length;j++)
                {
                    $('#edit-sink-connections').append('<option value="'+j+'">'+connections[j].source+' > '+connections[j].sink+'</option>');
                }
            }
            else
            {
                $('#edit-sink-minx-range').val(0);
                $('#edit-sink-maxx-range').val(0);
                $('#edit-sink-miny-range').val(0);
                $('#edit-sink-maxy-range').val(0);
                $('#edit-sink-display').toggle(false);
            }

            changingSink = str+keys[i];
        }
    }
    $('#edit-sink-form').toggle(toggle);
}



function getNodeByName(str,dir) 
{
    var nodes = Blawks.at(0).get('nodes');
    for (var i=0; i<nodes.length; i++) 
    {
        if (str === nodes[i].name && dir === nodes[i].direction) 
        {
            return nodes[i];
        }
    }

    return null;
}
function getConnectionsBySourceName(str)
{
    var connections = Blawks.at(0).get('connections');
    var returnConnections = [];

    for (var i=0; i<connections.length; i++) 
    {
        if (str === connections[i].source) 
        {
            returnConnections.push(connections[i]);
        }
    }

    return returnConnections;
}
function getConnectionsBySinkName(str)
{
    var connections = Blawks.at(0).get('connections');
    var returnConnections = [];

    for (var i=0; i<connections.length; i++) 
    {
        if (str === connections[i].sink) 
        {
            returnConnections.push(connections[i]);
        }
    }

    return returnConnections;
}
function detectNodeClick() 
{
    var sourcePaths = getCurrentSourcePathsFromNodes();
    var destinationPaths = getCurrentSinkPathsFromNodes();

    var isSource = null;

    var keys = nodeGlyphMap.sources.keys();
    for (var i=0;i<keys.length;i++) 
    {
        if (nodeGlyphMap.sources.get(keys[i]).mouseOver && nodeGlyphMap.sources.get(keys[i]).visible) 
        {
            isSource = true;
            break;
        }
    }

    keys = nodeGlyphMap.sinks.keys();
    for (var i=0;i<keys.length;i++) 
    {
        if (nodeGlyphMap.sinks.get(keys[i]).mouseOver && nodeGlyphMap.sinks.get(keys[i]).visible) 
        {
            isSource = false;
            break;
        }
    }

    if (isSource == null)
    {
        return;
    }

    if (isSource) 
    {
        keys = nodeGlyphMap.sources.keys();
        for (var i=0;i<keys.length;i++) 
        {
            if (nodeGlyphMap.sources.get(keys[i]).mouseOver) 
            {
                if (buttonGlyphMap[2].toggled && nodeGlyphMap.sources.get(keys[i]).subNodes.length() === 0) 
                {
                    resetSourceNodes();
                    console.log('source selected!');
                    selectedSource = sourcePaths[i];
                    nodeGlyphMap.sources.get(keys[i]).selected = true;
                    return;
                }
                else if (!buttonGlyphMap[3].toggled && !buttonGlyphMap[2].toggled)
                {
                    descendSourceTree(keys[i]);
                    return;
                }
            } 
        }
    } 
    else 
    {
        keys = nodeGlyphMap.sinks.keys();
        for (var i=0;i<keys.length;i++) 
        {
            if (nodeGlyphMap.sinks.get(keys[i]).mouseOver) 
            {
                if (buttonGlyphMap[3].toggled && nodeGlyphMap.sinks.get(keys[i]).subNodes.length() === 0) 
                {
                    resetSinkNodes();
                    console.log('sink selected!');
                    selectedSink = destinationPaths[i];
                    nodeGlyphMap.sinks.get(keys[i]).selected = true;
                    return;
                }
                else if (!buttonGlyphMap[2].toggled && !buttonGlyphMap[3].toggled)
                {
                    descendSinkTree(keys[i]);
                    return;
                }
            } 
        }
    }

}
function resetSourceNodes() 
{
    var keys = nodeGlyphMap.sources.keys();
    for (var i=0;i<keys.length;i++) 
    {
        nodeGlyphMap.sources.get(keys[i]).selected = false;
    }
}
function resetSinkNodes() 
{
    var keys = nodeGlyphMap.sinks.keys();
    for (var i=0;i<keys.length;i++) 
    {
        nodeGlyphMap.sinks.get(keys[i]).selected = false;
    }
}





function resetToRootLevel() 
{
    _sourceBranchTrace = [];
    _sinkBranchTrace = [];
    _sourceLabelTrace = ["all sources"];
    _sinkLabelTrace = ["all sinks"];
}



function detectTraversalClick() 
{
    var thisX = 0;
    var thisY = 0;
    var thisWidth = 0;
    var thisHeight = 0;

    for (var i=0;i<traversalGlyphMap[0].length;i++) 
    {
        thisX = traversalGlyphMap[0][i][0][0];
        thisY = traversalGlyphMap[0][i][0][1];
        thisWidth = traversalGlyphMap[0][i][0][2];
        thisHeight = traversalGlyphMap[0][i][0][3];
        if (_mouseX<thisX+thisWidth && _mouseX>thisX &&
        _mouseY<thisY+thisHeight && _mouseY>thisY) 
        {
            climbSourceTree(i);
        }
    }
    for (var i=0;i<traversalGlyphMap[1].length;i++) 
    {
        thisX = traversalGlyphMap[1][i][0][0];
        thisY = traversalGlyphMap[1][i][0][1];
        thisWidth = traversalGlyphMap[1][i][0][2];
        thisHeight = traversalGlyphMap[1][i][0][3];
        if (_mouseX<thisX+thisWidth && _mouseX>thisX &&
        _mouseY<thisY+thisHeight && _mouseY>thisY) 
        {
            climbSinkTree(i);
        }
    }
}

function isSourceLeafNode(index) 
{
    var keys = nodeGlyphMap.sources.keys();
    if (nodeGlyphMap.sources.get(keys[index]).subNodes.length() == 0) 
    {
        return true;
    } 
    else 
    {
        return false;
    }
}
function getSubnodesForSourceLevel() 
{
    var numbers = [];
    var sourcePointer = levels[0][1];
    var sourcePaths = getCurrentSourcePaths();

    for (var i=0;i<_sourceBranchTrace.length;i++) 
    {
        if (sourcePointer.length == 0) 
        {
            sourcePointer = [];
            break;
        }
        sourcePointer = sourcePointer[_sourceBranchTrace[i]][1];
    }

    if (sourcePointer === undefined) 
    {
        sourcePointer = [];
    }

    var isSignal = [];
    for (var i=0; i<sourcePointer.length; i++) 
    {
        if (sourcePointer[i] != 0) 
        {
            for (var j=0;j<sourcePointer[i][1].length;j++) 
            {
                if (sourcePointer[i][1][j] == 0) 
                {
                    isSignal.push({name:sourcePaths[i]+"/"+sourcePointer[i][0][j],isSignal:1});
                    //isSignal.push(1);
                } 
                else 
                {
                    isSignal.push({name:sourcePaths[i]+"/"+sourcePointer[i][0][j],isSignal:0});
                    //isSignal.push(0);
                }
            }
        }
        numbers.push(isSignal.slice());
        isSignal = [];
    }
    return numbers;
}
function getCurrentSourceLevelSet() {
    var sourceSet = levels[0][0];
    var sourcePointer = levels[0][1];

    for (var i=0;i<_sourceBranchTrace.length;i++) {
        if (sourcePointer.length == 0) {
            sourceSet = [];
            break;
        }
        sourceSet = sourcePointer[_sourceBranchTrace[i]][0]; 
        sourcePointer = sourcePointer[_sourceBranchTrace[i]][1];
    }

    if (sourceSet === undefined) 
    {
        sourceSet = [];
    }
    else 
    {
        sourceSet = sourceSet.slice();
    }

    return sourceSet;
}
function getCurrentSourcePathPrefix()
{
    var str = '';
    if (_sourceLabelTrace.length > 1)
    {
        str += _sourceLabelTrace.slice(1,_sourceLabelTrace.length).join('')+'/';
    }
    else
    {
        str += '/'+_sourceLabelTrace.slice(1,_sourceLabelTrace.length).join('');
    }

    return str;
}
function getCurrentSourcePaths() 
{
    var sourceSet = getCurrentSourceLevelSet();
    var prefixString = _sourceLabelTrace.slice(1,_sourceLabelTrace.length).join('');

    for (var i=0;i<sourceSet.length;i++) 
    {
        sourceSet[i] = prefixString+"/"+sourceSet[i];
    }

    return sourceSet;
}
function getCurrentSourcePathsFromNodes() 
{
    var sourceSet = nodeGlyphMap.sources.keys();
    var prefixString = _sourceLabelTrace.slice(1,_sourceLabelTrace.length).join('');

    for (var i=0;i<sourceSet.length;i++) 
    {
        sourceSet[i] = prefixString+"/"+sourceSet[i];
    }

    return sourceSet;
}
function descendSourceTree(key) 
{
    var keyPointer = levels[0][0];
    var sourcePointer = levels[0][1];
    for (var i=0;i<_sourceBranchTrace.length;i++) 
    {
        keyPointer = sourcePointer[_sourceBranchTrace[i]][0];
        sourcePointer = sourcePointer[_sourceBranchTrace[i]][1];
    }

    var index = 0; 
    for (var i=0;i<keyPointer.length;i++) 
    {
        if (key == keyPointer[i]) 
        {
            index = i;
        }
    }

    _sourceBranchTrace.push(index); 
    _sourceLabelTrace.push('/'+key);
    _updateDataGraph = true;
}
function climbSourceTree(level) 
{
    if (level == 0) 
    {
        _sourceBranchTrace = [];
        _sourceLabelTrace = ["all sources"];
    } 
    else 
    {
        _sourceBranchTrace = _sourceBranchTrace.slice(0,level);   
        _sourceLabelTrace = _sourceLabelTrace.slice(0,level+1);
    }
    _updateDataGraph = true;
}
function isSinkLeafNode(index) 
{
    var keys = nodeGlyphMap.sinks.keys();
    if (nodeGlyphMap.sinks.get(keys[index]).subNodes.length() == 0) 
    {
        return true;
    } 
    else 
    {
        return false;
    }
}
function getSubnodesForSinkLevel() 
{
    var numbers = [];
    var sinkPointer = levels[1][1];
    var sinkPaths = getCurrentSinkPaths();

    for (var i=0;i<_sinkBranchTrace.length;i++) 
    {
        if (sinkPointer.length == 0) 
        {
            sinkPointer = [];
            break;
        }
        sinkPointer = sinkPointer[_sinkBranchTrace[i]][1];
    }

    if (sinkPointer === undefined) 
    {
        sinkPointer = [];
    }

    var isSignal = [];
    for (var i=0;i<sinkPointer.length;i++) 
    {
        if (sinkPointer[i] != 0) 
        {
            for (var j=0;j<sinkPointer[i][1].length;j++) 
            {
                if (sinkPointer[i][1][j] == 0) 
                {
                    isSignal.push({name:sinkPaths[i]+"/"+sinkPointer[i][0][j],isSignal:1});
                } 
                else 
                {
                    isSignal.push({name:sinkPaths[i]+"/"+sinkPointer[i][0][j],isSignal:0});
                }
            }
        }
        numbers.push(isSignal.slice());
        isSignal = [];
    }
    return numbers;
}
function getCurrentSinkLevelSet() 
{
    var sinkSet = levels[1][0];
    var sinkPointer = levels[1][1];
    for (var i=0;i<_sinkBranchTrace.length;i++) 
    {
        if (sinkPointer.length == 0) 
        {
            sinkSet = [];
            break;
        }
        sinkSet = sinkPointer[_sinkBranchTrace[i]][0]; 
        sinkPointer = sinkPointer[_sinkBranchTrace[i]][1];
    }

    if (sinkSet === undefined) 
    {
        sinkSet = [];
    }
    else 
    {
        sinkSet = sinkSet.slice();
    }

    return sinkSet;
}
function getCurrentSinkPathPrefix()
{
    var str = '';
    if (_sinkLabelTrace.length > 1) 
    {
        str += _sinkLabelTrace.slice(1,_sinkLabelTrace.length).join('')+'/';
    }
    else
    {
        str += '/'+_sinkLabelTrace.slice(1,_sinkLabelTrace.length).join('');
    }

    return str;
}
function getCurrentSinkPaths() 
{
    var sinkSet = getCurrentSinkLevelSet();
    var prefixString = _sinkLabelTrace.slice(1,_sinkLabelTrace.length).join('');

    for (var i=0;i<sinkSet.length;i++) 
    {
        sinkSet[i] = prefixString+"/"+sinkSet[i];
    }

    return sinkSet;
}
function getCurrentSinkPathsFromNodes() 
{
    var sinkSet = nodeGlyphMap.sinks.keys();
    var prefixString = _sinkLabelTrace.slice(1,_sinkLabelTrace.length).join('');

    for (var i=0;i<sinkSet.length;i++) 
    {
        sinkSet[i] = prefixString+"/"+sinkSet[i];
    }

    return sinkSet;
}
function descendSinkTree(key) 
{
    var keyPointer = levels[1][0];
    var sinkPointer = levels[1][1];
    for (var i=0;i<_sinkBranchTrace.length;i++) 
    {
        keyPointer = sinkPointer[_sinkBranchTrace[i]][0];
        sinkPointer = sinkPointer[_sinkBranchTrace[i]][1];
    }

    var index = 0;
    for (var i=0;i<keyPointer.length;i++) 
    {
        if (key == keyPointer[i]) 
        {
            index = i;
        }
    }

    _sinkBranchTrace.push(index); 
    _sinkLabelTrace.push('/'+key);
    _updateDataGraph = true;
}
function climbSinkTree(level) 
{
    if (level == 0) 
    {
        _sinkBranchTrace = [];
        _sinkLabelTrace = ["all sinks"];
    } 
    else 
    {
        _sinkBranchTrace = _sinkBranchTrace.slice(0,level);   
        _sinkLabelTrace = _sinkLabelTrace.slice(0,level+1);
    }
    _updateDataGraph = true;
}










function drawBackground() 
{
    globalP.strokeWeight(4);
    globalP.stroke(0,225,0);
    globalP.noFill();
    globalP.arc(_graphCenterLeftX,_graphCenterLeftY,_graphWidth,_graphWidth,Math.PI/2,3*Math.PI/2);

    globalP.strokeWeight(4);
    globalP.stroke(225,225,0);
    globalP.noFill();
    globalP.arc(_graphCenterRightX,_graphCenterRightY,_graphWidth,_graphWidth,0,Math.PI/2);
    globalP.arc(_graphCenterRightX,_graphCenterRightY,_graphWidth,_graphWidth,3*Math.PI/2,2*Math.PI);
}



function updateAddButtonMouseState() 
{
    var rad = 40;

    if (Math.pow(_mouseX-buttonGlyphMap[0].x,2)+Math.pow(_mouseY-buttonGlyphMap[0].y,2) < Math.pow(rad,2)) 
    {
        buttonGlyphMap[0].mouseOver = true;
        if (mousePressed) 
        {
            buttonGlyphMap[0].clicked = true;
        } 
        else 
        {
            buttonGlyphMap[0].clicked = false;
        }
    } 
    else 
    {
        buttonGlyphMap[0].mouseOver = false;
    }

    if (Math.pow(_mouseX-buttonGlyphMap[1].x,2)+Math.pow(_mouseY-buttonGlyphMap[1].y,2) < Math.pow(rad,2)) 
    {
        buttonGlyphMap[1].mouseOver = true;
        if (mousePressed) 
        {
            buttonGlyphMap[1].clicked = true;
        }
        else 
        {
            buttonGlyphMap[1].clicked = false;
        }
    } 
    else 
    {
        buttonGlyphMap[1].mouseOver = false;
    }
}
function drawAddButtons() 
{
    globalP.textAlign(globalP.LEFT);
    globalP.textSize(14);

    var str = _sourceLabelTrace.slice(1,_sourceLabelTrace.length).join('');
    if (buttonGlyphMap[0].mouseOver) 
    {
        globalP.fill(0,200,0);
    }
    else
    {
        globalP.fill(0);
    }
    globalP.text('create oscillation source',buttonGlyphMap[0].x-280,buttonGlyphMap[0].y+30);
    //globalP.text('@   '+str,buttonGlyphMap[0].x-280,buttonGlyphMap[0].y);
    str = _sinkLabelTrace.slice(1,_sinkLabelTrace.length).join('');
    if (buttonGlyphMap[1].mouseOver) 
    {
        globalP.fill(200,200,0);
    }
    else
    {
        globalP.fill(0);
    }
    globalP.text('create display sink',buttonGlyphMap[1].x+100,buttonGlyphMap[1].y+30);
    //globalP.text('@   '+str,buttonGlyphMap[1].x+50,buttonGlyphMap[1].y);

    globalP.strokeWeight(5);
    globalP.stroke(0,200,0);
    if (buttonGlyphMap[0].mouseOver) 
    {
        globalP.fill(0,200,130,230);
        if (mousePressed) 
        {
            globalP.fill(255,100,130,230);
        }
    }
    else 
    {
        globalP.noFill();
    }
    globalP.ellipse(buttonGlyphMap[0].x, buttonGlyphMap[0].y, 80, 80);
    globalP.fill(0);
    globalP.textSize(50);
    globalP.text('+', buttonGlyphMap[0].x-14, buttonGlyphMap[0].y+15);

    globalP.stroke(200,200,0);
    if (buttonGlyphMap[1].mouseOver) 
    {
        globalP.fill(180,180,100,230);
        if (mousePressed) 
        {
            globalP.fill(255,100,130,230);
        }
    }
    else 
    {
        globalP.noFill();
    }
    globalP.ellipse(buttonGlyphMap[1].x, buttonGlyphMap[1].y, 80, 80);
    globalP.fill(0);
    globalP.textSize(50);
    globalP.text('+', buttonGlyphMap[1].x-14, buttonGlyphMap[1].y+15);
}
function updateConnectButtonMouseState() 
{
    var height = 60;
    var topY = 5 + height/2;
    var leftX = 500 + height/2;
    var rightX = _screenWidth-leftX;

    if (Math.pow(_mouseX-leftX,2)+Math.pow(_mouseY-topY,2) < Math.pow(height/2,2)) 
    {
        buttonGlyphMap[2].mouseOver = true;
        if (mousePressed) 
        {
            buttonGlyphMap[2].clicked = true;
        } 
        else 
        {
            buttonGlyphMap[2].clicked = false;
        }
    } 
    else 
    {
        buttonGlyphMap[2].mouseOver = false;
    }

    if (Math.pow(_mouseX-rightX,2)+Math.pow(_mouseY-topY,2) < Math.pow(height/2,2)) 
    {
        buttonGlyphMap[3].mouseOver = true;
        if (mousePressed) 
        {
            buttonGlyphMap[3].clicked = true;
        }
        else 
        {
            buttonGlyphMap[3].clicked = false;
        }
    } 
    else 
    {
        buttonGlyphMap[3].mouseOver = false;
    }

    leftX = 500+height;
    rightX = _screenWidth-leftX;
    topY = 5;
    bottomY = topY+height;

    if (_mouseX < rightX && _mouseX > leftX && _mouseY < bottomY && _mouseY > topY) 
    {
        buttonGlyphMap[4].mouseOver = true;
        if (mousePressed) 
        {
            buttonGlyphMap[4].clicked = true;
        }
        else 
        {
            buttonGlyphMap[4].clicked = false;
        }
    }
    else
    {
        buttonGlyphMap[4].mouseOver = false;
    }
}





function updateListGlyphMouseState() 
{
    var sourceSet = getCurrentSourceLevelSet();
    var sinkSet = getCurrentSinkLevelSet();

    var topY = 220;

    var thisX = 0;
    var thisY = 0;
    var thisWidth = 200;
    var thisHeight = 28;

    var keys = nodeGlyphMap.sources.keys();
    for (var i=0;i<sourceSet.length;i++) 
    {
        thisX = 0;
        thisY = topY+12+(i*32);
        if (_mouseX > thisX && _mouseX < thisX+thisWidth && _mouseY > thisY && _mouseY < thisY+thisHeight) 
        {
            nodeGlyphMap.sources.get(keys[i]).edit = true;
        } 
        else 
        {
            nodeGlyphMap.sources.get(keys[i]).edit = false;
        }
    }

    keys = nodeGlyphMap.sinks.keys();
    for (var i=0;i<sinkSet.length;i++) 
    {
        thisX = _screenWidth-200;
        thisY = topY+12+(i*32);
        if (_mouseX > thisX && _mouseX < thisX+thisWidth && _mouseY > thisY && _mouseY < thisY+thisHeight) 
        {
            nodeGlyphMap.sinks.get(keys[i]).edit = true;
        } 
        else 
        {
            nodeGlyphMap.sinks.get(keys[i]).edit = false;
        }
    }
}
function drawListGlyphs() {
    var sourceSet = getCurrentSourceLevelSet();
    var sinkSet = getCurrentSinkLevelSet();

    var topY = 220;

    globalP.textAlign(globalP.LEFT);
    globalP.noStroke();

    var font = globalP.loadFont("monospace");
    globalP.textFont(font);
    globalP.textSize(14);

    var someSourceActive = false;
    for (var i=0;i<sourceSet.length;i++) {
        if (nodeGlyphMap.sources.get(sourceSet[i]).mouseOver || nodeGlyphMap.sources.get(sourceSet[i]).edit) {
            globalP.fill(0,230,0,250);
            someSourceActive = true;
        } else {
            globalP.fill(0,230,0,50);
        }
        globalP.rect(0,topY+12+(i*32),200,28);
        globalP.fill(0);
        globalP.text(sourceSet[i],10,topY+32+(i*32));
    }
    var someSinkActive = false;
    for (var i=0;i<sinkSet.length;i++) {
        if (nodeGlyphMap.sinks.get(sinkSet[i]).mouseOver || nodeGlyphMap.sinks.get(sinkSet[i]).edit) {
            globalP.fill(230,230,0,250);
            someSinkActive = true;
        } else {
            globalP.fill(230,230,0,50);
        }
        globalP.rect(_screenWidth-200,topY+12+(i*32),200,28);
        globalP.fill(0);
        globalP.text(sinkSet[i],_screenWidth+10-200,topY+32+(i*32));
    }

    if (someSourceActive) 
    {
        globalP.fill(0,200,0);
    }
    else
    {
        globalP.fill(0);
    }
    globalP.text('modify/destroy sources',10,topY);

    if (someSinkActive) 
    {
        globalP.fill(200,200,0);
    }
    else
    {
        globalP.fill(0);
    }
    globalP.text('modify/destroy sinks',_screenWidth-190,topY);
}

function drawTraversalGlyphs() 
{
    traversalGlyphMap = [[],[]];

    var previousX = 40;
    var previousWidth = 0;
    for (var i=1;i<_sourceLabelTrace.length;i++) 
    {
        traversalGlyphMap[0].push([[previousX+previousWidth,160,_sourceLabelTrace[i].length*10+4,28], _sourceLabelTrace[i]]);
        previousX = traversalGlyphMap[0][i-1][0][0];
        previousWidth = traversalGlyphMap[0][i-1][0][2];
    }
    previousWidth = 0;
    var totalWidth = 0;
    for (var i=1;i<_sinkLabelTrace.length;i++) 
    {
        totalWidth += _sinkLabelTrace[i].length*10+4;
    }
    previousX = _screenWidth-totalWidth;
    for (var i=1;i<_sinkLabelTrace.length;i++) 
    {
        traversalGlyphMap[1].push([[previousX+previousWidth,160,_sinkLabelTrace[i].length*10+4,28], _sinkLabelTrace[i]]);
        previousX = traversalGlyphMap[1][i-1][0][0];
        previousWidth = traversalGlyphMap[1][i-1][0][2];
    }

    var thisX = 0;
    var thisY = 0;
    var thisWidth = 0;
    var thisHeight = 0;
    var thisStr = '';

    globalP.fill(0);
    globalP.textAlign(globalP.LEFT);
    globalP.textSize(16);
    globalP.text('@', 10, 180);

    var someSourceActive = false;
    globalP.noStroke();
    for (var i=0;i<traversalGlyphMap[0].length;i++) 
    {
        thisX = traversalGlyphMap[0][i][0][0];
        thisY = traversalGlyphMap[0][i][0][1];
        thisWidth = traversalGlyphMap[0][i][0][2];
        thisHeight = traversalGlyphMap[0][i][0][3];
        thisStr = traversalGlyphMap[0][i][1];

        if (_mouseX<thisX+thisWidth && _mouseX>thisX &&
        _mouseY<thisY+thisHeight && _mouseY>thisY) 
        {
            globalP.fill(0,230,0,250);
            someSourceActive = true;
        } 
        else 
        {
            globalP.fill(0,230,0,50);
        }
        globalP.rect(thisX,thisY,thisWidth,thisHeight);
        globalP.fill(0);
        globalP.text(thisStr,thisX+2,thisY+20);
    }
    globalP.fill(0);
    globalP.text('@', _screenWidth-totalWidth-20, 180);
    var someSinkActive = false;
    for (var i=0;i<traversalGlyphMap[1].length;i++) 
    {
        thisX = traversalGlyphMap[1][i][0][0];
        thisY = traversalGlyphMap[1][i][0][1];
        thisWidth = traversalGlyphMap[1][i][0][2];
        thisHeight = traversalGlyphMap[1][i][0][3];
        thisStr = traversalGlyphMap[1][i][1];

        if (_mouseX<thisX+thisWidth && _mouseX>thisX &&
        _mouseY<thisY+thisHeight && _mouseY>thisY) 
        {
            globalP.fill(230,230,0,250);
            someSinkActive = true;
        } 
        else 
        {
            globalP.fill(230,230,0,50);
        }
        globalP.rect(thisX,thisY,thisWidth,thisHeight);
        globalP.fill(0);
        globalP.text(thisStr,thisX+2,thisY+20);
    }

/*
    if (someSourceActive) 
    {
        globalP.fill(0,200,0);
    }
    else
    {
        globalP.fill(0);
    }
    globalP.text('alter source path', _graphCenterLeftX-110, _graphCenterLeftY-130);
    if (someSinkActive) 
    {
        globalP.fill(200,200,0);
    }
    else
    {
        globalP.fill(0);
    }
    globalP.text('alter sink path', _graphCenterRightX-70, _graphCenterRightY-130);
    */
}

function updateNodeGlyphMap(_nodesOnly) 
{
    nodeGlyphMap = {sources:new Assoc(), sinks:new Assoc()};

    var sourceSet = getCurrentSourceLevelSet();
    var sinkSet = getCurrentSinkLevelSet();

    var sourceChildSet = getSubnodesForSourceLevel();
    var sinkChildSet = getSubnodesForSinkLevel();

    // sources
    var count = sourceSet.length;

    var separationAngle;
    if (count > 1) 
    {
        separationAngle = Math.PI/(count-1);
    } 
    else 
    {
        separationAngle = Math.PI/(count);
    }

    var layoutAngle;

    var layoutX;
    var layoutY;
    var symbolWidth;
    if (count <= 5) 
    {
        symbolWidth = (_graphWidth*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(6-1))) + (Math.PI/2) ));
    } 
    else 
    {
        symbolWidth = (_graphWidth*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(count-1))) + (Math.PI/2) ));
    }
    var layoutRadius = (_graphWidth/2)-(symbolWidth/2);

    for (var i=0;i<count;i++) 
    {
        layoutAngle = (3*Math.PI/2) - i*separationAngle;

        layoutX = _graphCenterLeftX + (layoutRadius*Math.cos(layoutAngle));
        layoutY = _graphCenterLeftY + (layoutRadius*Math.sin(layoutAngle));

        var count2 = sourceChildSet[i].length;

        var separationAngle2;
        if (count2 > 1) 
        {
            separationAngle2 = Math.PI/(count2-1);
        } 
        else 
        {
            separationAngle2 = Math.PI/(count2);
        }

        var layoutAngle2;

        var layoutX2;
        var layoutY2;
        var symbolWidth2;
        if (count2 <= 5) 
        {
            symbolWidth2 = (symbolWidth*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(6-1))) + (Math.PI/2) ));
        } 
        else 
        {
            symbolWidth2 = (symbolWidth*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(count2-1))) + (Math.PI/2) ));
        }
        var layoutRadius2 = (symbolWidth/2)-(symbolWidth2/2);

        var subNodes = new Assoc();
        for (var j=0;j<count2;j++) 
        {
            layoutAngle2 = (3*Math.PI/2) - j*separationAngle2;
            layoutX2 = layoutX + (layoutRadius2*Math.cos(layoutAngle2));
            layoutY2 = layoutY + (layoutRadius2*Math.sin(layoutAngle2));
            subNodes.add(sourceChildSet[i][j].name,{layoutX:layoutX2,layoutY:layoutY2,symbolWidth:symbolWidth2,isSignal:sourceChildSet[i][j].isSignal});
        }

        if (!_nodesOnly || subNodes.length() == 0) 
        {
            nodeGlyphMap.sources.add(sourceSet[i], {layoutAngle:layoutAngle,layoutX:layoutX,layoutY:layoutY,symbolWidth:symbolWidth,mouseOver:false,subNodes:subNodes,selected:false,visible:true});
        } 
        else 
        {
            nodeGlyphMap.sources.add(sourceSet[i], {layoutX:layoutX,layoutY:layoutY,symbolWidth:symbolWidth,mouseOver:false,subNodes:subNodes,selected:false,visible:false});
        }
    }



    // sinks
    count = sinkSet.length;

    if (count > 1) 
    {
        separationAngle = Math.PI/(count-1);
    } 
    else 
    {
        separationAngle = Math.PI/(count);
    }

    if (count <= 5) 
    {
        symbolWidth = (_graphWidth*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(6-1))) + (Math.PI/2) ));
    } 
    else 
    {
        symbolWidth = (_graphWidth*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(count-1))) + (Math.PI/2) ));
    }
    layoutRadius = (_graphWidth/2)-(symbolWidth/2);

    for (var i=0;i<count;i++) 
    {
        layoutAngle = i*separationAngle + (3*Math.PI/2);

        layoutX = _graphCenterRightX + (layoutRadius*Math.cos(layoutAngle));
        layoutY = _graphCenterRightY + (layoutRadius*Math.sin(layoutAngle));

        var count2 = sinkChildSet[i].length;

        var separationAngle2;
        if (count2 > 1) 
        {
            separationAngle2 = Math.PI/(count2-1);
        } 
        else 
        {
            separationAngle2 = Math.PI/(count2);
        }

        var layoutAngle2;

        var layoutX2;
        var layoutY2;
        var symbolWidth2;
        if (count2 <= 5) 
        {
            symbolWidth2 = (symbolWidth*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(6-1))) + (Math.PI/2) ));
        } 
        else 
        {
            symbolWidth2 = (symbolWidth*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(count2-1))) + (Math.PI/2) ));
        }
        var layoutRadius2 = (symbolWidth/2)-(symbolWidth2/2);

        var subNodes = new Assoc();
        for (var j=0;j<count2;j++) 
        {
            layoutAngle2 = j*separationAngle2 + (3*Math.PI/2);
            layoutX2 = layoutX + (layoutRadius2*Math.cos(layoutAngle2));
            layoutY2 = layoutY + (layoutRadius2*Math.sin(layoutAngle2));
            subNodes.add(sinkChildSet[i][j].name,{layoutX:layoutX2,layoutY:layoutY2,symbolWidth:symbolWidth2,isSignal:sinkChildSet[i][j].isSignal});
        }

        
        if (!_nodesOnly || subNodes.length() == 0) 
        {
            nodeGlyphMap.sinks.add(sinkSet[i], {layoutAngle:layoutAngle,layoutX:layoutX,layoutY:layoutY,symbolWidth:symbolWidth,mouseOver:false,subNodes:subNodes,selected:false,visible:true});
        } 
        else 
        {
            nodeGlyphMap.sinks.add(sinkSet[i], {layoutX:layoutX,layoutY:layoutY,symbolWidth:symbolWidth,mouseOver:false,subNodes:subNodes,selected:false,visible:false});
        }
    }

}

function drawChangingSourceNode()
{
    var symbolWidth = (_graphWidth*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(6-1))) + (Math.PI/2) ));

    globalP.strokeWeight(5);
    globalP.stroke(0,200,0);
    globalP.fill(204,238,204);

    globalP.ellipse(_graphCenterX,_graphCenterY,symbolWidth,symbolWidth);
}
function drawChangingSinkNode()
{
    var symbolWidth = (_graphWidth*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(6-1))) + (Math.PI/2) ));

    globalP.strokeWeight(5);
    globalP.stroke(200,200,0);
    globalP.fill(204,238,204);

    globalP.ellipse(_graphCenterX,_graphCenterY,symbolWidth,symbolWidth);
}
function drawNodes() 
{

    var thisX;
    var thisY;
    var thisWidth;
    var numSignals;
    var numGroups;
    var subNodes;



    var keys = nodeGlyphMap.sources.keys();
    for (var i=0;i<nodeGlyphMap.sources.length();i++) 
    {
        thisX = nodeGlyphMap.sources.get(keys[i]).layoutX; 
        thisY = nodeGlyphMap.sources.get(keys[i]).layoutY; 
        thisWidth = nodeGlyphMap.sources.get(keys[i]).symbolWidth; 

        if (isSourceLeafNode(i)) 
        {
            globalP.noStroke();
            globalP.fill(0,200,0);
        } 
        else 
        {
            globalP.strokeWeight(5);
            globalP.stroke(0,200,0);
            //globalP.noFill();
            globalP.fill(204,238,204);
        }

        if (nodeGlyphMap.sources.get(keys[i]).selected && nodeGlyphMap.sources.get(keys[i]).mouseOver) 
        {
            globalP.fill(255,100,130);
        } 
        else if (nodeGlyphMap.sources.get(keys[i]).selected) 
        {
            globalP.fill(255,0,0);
        } 
        else if (nodeGlyphMap.sources.get(keys[i]).mouseOver || nodeGlyphMap.sources.get(keys[i]).edit) 
        {
            globalP.fill(0,200,130);
        }
        globalP.ellipse(thisX,thisY,thisWidth,thisWidth);
        if (nodeGlyphMap.sources.get(keys[i]).mouseOver) 
        {
            globalP.fill(0);
            //globalP.textSize(16);
            globalP.textAlign(globalP.CENTER);
            globalP.text('open',thisX+10,thisY+5);
        }

        subNodes = nodeGlyphMap.sources.get(keys[i]).subNodes.keys();
        if (nodeGlyphMap.sources.get(keys[i]).visible) 
        {
            for (var j=0;j<subNodes.length;j++) 
            {
                if (nodeGlyphMap.sources.get(keys[i]).subNodes.get(subNodes[j]).isSignal) 
                {
                    globalP.noStroke();
                    globalP.fill(0,150,0);
                } 
                else 
                {
                    globalP.strokeWeight(3);
                    globalP.stroke(0,150,0);
                    globalP.noFill();
                }
                globalP.ellipse(nodeGlyphMap.sources.get(keys[i]).subNodes.get(subNodes[j]).layoutX,
                nodeGlyphMap.sources.get(keys[i]).subNodes.get(subNodes[j]).layoutY,
                nodeGlyphMap.sources.get(keys[i]).subNodes.get(subNodes[j]).symbolWidth,
                nodeGlyphMap.sources.get(keys[i]).subNodes.get(subNodes[j]).symbolWidth);
            }
        }
    }



    keys = nodeGlyphMap.sinks.keys();
    for (var i=0;i<nodeGlyphMap.sinks.length();i++) 
    {
        thisX = nodeGlyphMap.sinks.get(keys[i]).layoutX; 
        thisY = nodeGlyphMap.sinks.get(keys[i]).layoutY; 
        thisWidth = nodeGlyphMap.sinks.get(keys[i]).symbolWidth; 

        if (isSinkLeafNode(i)) 
        {
            globalP.noStroke();
            globalP.fill(200,200,0);
        } 
        else 
        {
            globalP.strokeWeight(5);
            globalP.stroke(200,200,0);
            globalP.fill(204,238,204);
        }

        if (nodeGlyphMap.sinks.get(keys[i]).selected && nodeGlyphMap.sinks.get(keys[i]).mouseOver) 
        {
            globalP.fill(255,100,130);
        } 
        else if (nodeGlyphMap.sinks.get(keys[i]).selected) 
        {
            globalP.fill(255,0,0,230);
        } 
        else if (nodeGlyphMap.sinks.get(keys[i]).mouseOver || nodeGlyphMap.sinks.get(keys[i]).edit) 
        {
            globalP.fill(180,180,100);
        }
        globalP.ellipse(thisX,thisY,thisWidth,thisWidth);
        if (nodeGlyphMap.sinks.get(keys[i]).mouseOver) 
        {
            globalP.fill(0);
            //globalP.textSize(16);
            globalP.textAlign(globalP.CENTER);
            globalP.text('open',thisX-10,thisY+5);
        }

        subNodes = nodeGlyphMap.sinks.get(keys[i]).subNodes.keys();
        if (nodeGlyphMap.sinks.get(keys[i]).visible) 
        {
            for (var j=0;j<subNodes.length;j++) 
            {
                if (nodeGlyphMap.sinks.get(keys[i]).subNodes.get(subNodes[j]).isSignal) 
                {
                    globalP.noStroke();
                    globalP.fill(150,150,0);
                } 
                else 
                {
                    globalP.strokeWeight(3);
                    globalP.stroke(150,150,0);
                    globalP.noFill();
                }
                globalP.ellipse(nodeGlyphMap.sinks.get(keys[i]).subNodes.get(subNodes[j]).layoutX,
                nodeGlyphMap.sinks.get(keys[i]).subNodes.get(subNodes[j]).layoutY,
                nodeGlyphMap.sinks.get(keys[i]).subNodes.get(subNodes[j]).symbolWidth,
                nodeGlyphMap.sinks.get(keys[i]).subNodes.get(subNodes[j]).symbolWidth);
            }
        }
    }

}

var connectionSourceMatches = [];
var connectionSinkMatches = [];
function updateConnectionGlyphMap(_nodesOnly) {

    connectionGlyphMap = new Assoc();

    var sourceSet = getCurrentSourcePathsFromNodes();
    var sinkSet = getCurrentSinkPathsFromNodes();

    var sourceChildren = getSubnodesForSourceLevel();
    var sinkChildren = getSubnodesForSinkLevel();
    var sourceLevel = getCurrentSourceLevelSet();
    var sinkLevel = getCurrentSinkLevelSet();

    connectionSourceMatches = [];
    connectionSinkMatches = [];
    var connectionKeys = _connections.keys();
    var onceFilteredConnectionKeys = [];
    var twiceFilteredConnectionKeys = [];

    // fix for bug involving top level view when the filter match happens at lower levels
    // very likely performs redundant computations that are done latter in this function
    for (var i=0;i<connectionKeys.length;i++) {
        for (var j=0;j<filterMatches[0].length;j++) {
            //var exp1 = new RegExp(filterMatches[0][j][0]+filterMatches[0][j][1]+">");
            var exp1 = new RegExp('/'+filterMatches[0][j].join('/')+">");
            //console.log('once',exp1);
            //console.log(connectionKeys[i]);
            if (connectionKeys[i].match(exp1)) {
                onceFilteredConnectionKeys.push(connectionKeys[i]);
            }
        }
    }

    //console.log('once filtered',onceFilteredConnectionKeys);
  
    for (var i=0;i<onceFilteredConnectionKeys.length;i++) {
        for (var j=0;j<filterMatches[1].length;j++) {
            //var exp2 = new RegExp(">"+filterMatches[1][j][0]+filterMatches[1][j][1]);
            var exp2 = new RegExp(">/"+filterMatches[1][j].join('/'));
            //console.log('twice',exp2);
            //console.log(onceFilteredConnectionKeys[i]);
            if (onceFilteredConnectionKeys[i].match(exp2)) {
                twiceFilteredConnectionKeys.push(onceFilteredConnectionKeys[i]);
            }
        }
    }

    //console.log('twice filtered',twiceFilteredConnectionKeys);

    for (var i=0;i<twiceFilteredConnectionKeys.length;i++) {
        for (var j=0;j<sourceSet.length;j++) {

            var exp1 = new RegExp(sourceSet[j]+">");
            var exp2 = new RegExp(sourceSet[j]+".*>");
            if (twiceFilteredConnectionKeys[i].match(exp1)) {
                connectionSourceMatches.push(twiceFilteredConnectionKeys[i]); 
                connectionGlyphMap.add(twiceFilteredConnectionKeys[i], {source:sourceLevel[j],sourceChild:sourceSet[j],isSourceSubnode:false});
            } else if (twiceFilteredConnectionKeys[i].match(exp2) && !_nodesOnly) {
                connectionSourceMatches.push(twiceFilteredConnectionKeys[i]); 
                for (var k=0;k<sourceChildren[j].length;k++) {
                    var exp3 = new RegExp(sourceChildren[j][k].name+".*>");
                    if (twiceFilteredConnectionKeys[i].match(exp3)) {
                        connectionGlyphMap.add(twiceFilteredConnectionKeys[i], {source:sourceLevel[j],sourceChild:sourceChildren[j][k].name,isSourceSubnode:true});
                    }
                }
            }
        }
    }

    for (var i=0;i<connectionSourceMatches.length;i++) {
        for (var j=0;j<sinkSet.length;j++) {
            var exp1 = new RegExp(">"+sinkSet[j]+".+");
            var exp2 = new RegExp(">"+sinkSet[j]+".*");
            if (connectionSourceMatches[i].match(exp1) && !_nodesOnly) {
                connectionSinkMatches.push(connectionKeys[i]); 
                for (var k=0;k<sinkChildren[j].length;k++) {
                    var exp3 = new RegExp(">"+sinkChildren[j][k].name+".*");
                    if (connectionSourceMatches[i].match(exp3)) {
                        connectionGlyphMap.get(connectionSourceMatches[i]).sink = sinkLevel[j];
                        connectionGlyphMap.get(connectionSourceMatches[i]).sinkChild = sinkChildren[j][k].name;
                        connectionGlyphMap.get(connectionSourceMatches[i]).isSinkSubnode = true;
                    }
                }
            } else if (connectionSourceMatches[i].match(exp2)) {
                connectionSinkMatches.push(connectionSourceMatches[i]); 
                connectionGlyphMap.get(connectionSourceMatches[i]).sink = sinkLevel[j];
                connectionGlyphMap.get(connectionSourceMatches[i]).sinkChild = sinkSet[j];
                connectionGlyphMap.get(connectionSourceMatches[i]).isSinkSubnode = false;
            }
        }
    }

    var keys = connectionGlyphMap.keys();
    var x1, y1, x2, y2;
    var cx1, cy1, cx2, cy2;
    var width;
    for (var i=0;i<keys.length;i++) {
        if (connectionGlyphMap.get(keys[i]).sink != undefined) {

            if (connectionGlyphMap.get(keys[i]).isSourceSubnode) {
                x1 = nodeGlyphMap.sources.get(connectionGlyphMap.get(keys[i]).source).subNodes.get(connectionGlyphMap.get(keys[i]).sourceChild).layoutX;
                y1 = nodeGlyphMap.sources.get(connectionGlyphMap.get(keys[i]).source).subNodes.get(connectionGlyphMap.get(keys[i]).sourceChild).layoutY;
            } else {
                x1 = nodeGlyphMap.sources.get(connectionGlyphMap.get(keys[i]).source).layoutX;
                y1 = nodeGlyphMap.sources.get(connectionGlyphMap.get(keys[i]).source).layoutY;
                width = nodeGlyphMap.sources.get(connectionGlyphMap.get(keys[i]).source).symbolWidth;
            }
            if (connectionGlyphMap.get(keys[i]).isSinkSubnode) {
                x2 = nodeGlyphMap.sinks.get(connectionGlyphMap.get(keys[i]).sink).subNodes.get(connectionGlyphMap.get(keys[i]).sinkChild).layoutX;
                y2 = nodeGlyphMap.sinks.get(connectionGlyphMap.get(keys[i]).sink).subNodes.get(connectionGlyphMap.get(keys[i]).sinkChild).layoutY;
            } else {
                x2 = nodeGlyphMap.sinks.get(connectionGlyphMap.get(keys[i]).sink).layoutX;
                y2 = nodeGlyphMap.sinks.get(connectionGlyphMap.get(keys[i]).sink).layoutY;
                width = nodeGlyphMap.sinks.get(connectionGlyphMap.get(keys[i]).sink).symbolWidth;
            }
            connectionGlyphMap.get(keys[i]).x1 = x1;
            connectionGlyphMap.get(keys[i]).y1 = y1;
            connectionGlyphMap.get(keys[i]).x2 = x2;
            connectionGlyphMap.get(keys[i]).y2 = y2;
            connectionGlyphMap.get(keys[i]).width = width;

            if (y1 < _graphCenterLeftY) {
                if (y2 < _graphCenterRightY) {
                    cx1 = x1+50;
                    cy1 = y1+80;
                    cx2 = x2-50;
                    cy2 = y2+80;
                } else {
                    cx1 = x1+50;
                    cy1 = y1-80;
                    cx2 = x2-50;
                    cy2 = y2+80;
                }
            } else {
                if (y2 < _graphCenterRightY) {
                    cx1 = x1+50;
                    cy1 = y1+80;
                    cx2 = x2-50;
                    cy2 = y2-80;
                } else {
                    cx1 = x1+50;
                    cy1 = y1-80;
                    cx2 = x2-50;
                    cy2 = y2-80;
                }
            }
            connectionGlyphMap.get(keys[i]).cx1 = cx1;
            connectionGlyphMap.get(keys[i]).cy1 = cy1;
            connectionGlyphMap.get(keys[i]).cx2 = cx2;
            connectionGlyphMap.get(keys[i]).cy2 = cy2;
            connectionGlyphMap.get(keys[i]).mouseOver = false;
            connectionGlyphMap.get(keys[i]).selected = false;
        }
    }

}
function drawChangingSourceConnections()
{

    var keys = connectionGlyphMap.keys();

    globalP.noStroke();
    globalP.fill(0,200,0);

    var x2, y2, width;
    var norm;
    var posX, posY, posAngle, posPerpAngle1, posPerpAngle2;
    var corrX1, corrY1, corrX2, corrY2;

    for (var i=0;i<keys.length;i++) 
    {
        if (connectionGlyphMap.get(keys[i]).sourceChild === changingSource) 
        {
            x2 = connectionGlyphMap.get(keys[i]).x2;
            y2 = connectionGlyphMap.get(keys[i]).y2;

            width = connectionGlyphMap.get(keys[i]).width;

            norm = (_graphWidth-(width/2))/2;
            posX = (x2-_graphCenterX)/norm;
            posY = (_graphCenterY-y2)/norm;
            posAngle = Math.acos(posX);

            posPerpAngle1 = posAngle-(Math.PI/2);
            corrX1 = Math.cos(posPerpAngle1);
            corrY1 = Math.sin(posPerpAngle1);

            posPerpAngle2 = posAngle+(Math.PI/2);
            corrX2 = Math.cos(posPerpAngle2);
            corrY2 = Math.sin(posPerpAngle2);

            globalP.quad(_graphCenterX+(corrX2*width/2),_graphCenterY-(corrY2*width/2),x2+(corrX2*width/2),y2-(corrY2*width/2),x2+(corrX1*width/2),y2-(corrY1*width/2),_graphCenterX+(corrX1*width/2),_graphCenterY-(corrY1*width/2));
        }
    }

}
function drawChangingSinkConnections()
{

    var keys = connectionGlyphMap.keys();

    globalP.noStroke();
    globalP.fill(200,200,0);

    var x1, y1, width;
    var norm;
    var posX, posY, posAngle, posPerpAngle1, posPerpAngle2;
    var corrX1, corrY1, corrX2, corrY2;

    for (var i=0;i<keys.length;i++) 
    {
        if (connectionGlyphMap.get(keys[i]).sinkChild === changingSink) 
        {
            x1 = connectionGlyphMap.get(keys[i]).x1;
            y1 = connectionGlyphMap.get(keys[i]).y1;

            width = connectionGlyphMap.get(keys[i]).width;

            norm = (_graphWidth-(width/2))/2;
            posX = (x1-_graphCenterX)/norm;
            posY = (_graphCenterY-y1)/norm;
            posAngle = Math.acos(posX);

            posPerpAngle1 = posAngle-(Math.PI/2);
            corrX1 = Math.cos(posPerpAngle1);
            corrY1 = Math.sin(posPerpAngle1);

            posPerpAngle2 = posAngle+(Math.PI/2);
            corrX2 = Math.cos(posPerpAngle2);
            corrY2 = Math.sin(posPerpAngle2);

            globalP.quad(x1+(corrX1*width/2),y1-(corrY1*width/2),_graphCenterX+(corrX1*width/2),_graphCenterY-(corrY1*width/2),_graphCenterX+(corrX2*width/2),_graphCenterY-(corrY2*width/2),x1+(corrX2*width/2),y1-(corrY2*width/2));
        }
    }

}
function drawConnections() 
{

    var keys = connectionGlyphMap.keys();

    globalP.noStroke();
    globalP.fill(100,200,0);

    var x1, y1, x2, y2;
    var cx1, cy1, cx2, cy2;
    var width;
    for (var i=0;i<keys.length;i++) 
    {
        if (connectionGlyphMap.get(keys[i]).sink != undefined) 
        {
            x1 = connectionGlyphMap.get(keys[i]).x1;
            y1 = connectionGlyphMap.get(keys[i]).y1;
            x2 = connectionGlyphMap.get(keys[i]).x2;
            y2 = connectionGlyphMap.get(keys[i]).y2;

            cx1 = connectionGlyphMap.get(keys[i]).cx1;
            cy1 = connectionGlyphMap.get(keys[i]).cy1;
            cx2 = connectionGlyphMap.get(keys[i]).cx2;
            cy2 = connectionGlyphMap.get(keys[i]).cy2;

            width = connectionGlyphMap.get(keys[i]).width;

            globalP.quad(x1,y1-width/2,x2,y2-width/2,x2,y2+width/2,x1,y1+width/2);
        }
    }

}



function activateCreateMode() 
{

	$('#global-canvas').toggle(true);
    $('#edit-connection-form').toggle(false);

	$('#create-tab').toggleClass('active',true);
	$('#create-tab').toggleClass('inactive',false);
	$('#watch-tab').toggleClass('active',false);
	$('#watch-tab').toggleClass('inactive',true);
}
function activateWatchMode() {
	$('#global-canvas').toggle(true);
    $('#edit-connection-form').toggle(false);

	$('#create-tab').toggleClass('active',false);
	$('#create-tab').toggleClass('inactive',true);
	$('#watch-tab').toggleClass('active',true);
	$('#watch-tab').toggleClass('inactive',false);

    initializeScene();
}



function activateAboutMode() {
	$('#about-switch').toggleClass('about-closed',false);
	$('#about-switch').toggleClass('aboutOpen',true);
	$('#about-closed-text').toggle(false);
	$('#aboutText').toggle(true);

	$('#help-switch').toggle(false);
}
function deactivateAboutMode() {
	$('#about-switch').toggleClass('about-closed',true);
	$('#about-switch').toggleClass('aboutOpen',false);
	$('#about-closed-text').toggle(true);
	$('#aboutText').toggle(false);

	//$('#help-switch').toggle(true);
}
function activateHelpMode() {
	$('#help-switch').toggleClass('help-closed',false);
	$('#help-switch').toggleClass('helpOpen',true);
	$('#helpAlterText').toggle(false);
	$('#helpText').toggle(true);

	$('#about-switch').toggle(false);
}
function deactivateHelpMode() {
	$('#help-switch').toggleClass('help-closed',true);
	$('#help-switch').toggleClass('helpOpen',false);
	$('#helpAlterText').toggle(true);
	$('#helpText').toggle(false);

	$('#about-switch').toggle(true);
}




var activeFilter = "";
var latestQuery = [];
var filterMatches = [[],[],[]]; // sources,sinks,mappings
var levels = [[[]],[[]]];

function updateActiveFilter() 
{
	signalPagePointer = 0;
	mappingPagePointer = 0;

	activeFilter = $('#filter-input').val();
	activeFilter = activeFilter+'';
	activeFilter = activeFilter.replace(/^\s*(.*?)\s*$/,"$1").toLowerCase();

	/*
	    namespace matching
	*/
    latestQuery = activeFilter.match(/\S+/ig);
	if (latestQuery != null) 
    {
	} 
    else 
    {
        latestQuery = [""];
	}
}

function updateSignalMatches() 
{
    console.log('updateSignalMatches()');

	filterMatches = [[],[],[]];

    var keys = _nodes.keys();
    console.log('keys',keys);
    for (var i=0;i<keys.length;i++) 
    {
		o: for (var j=0;j<latestQuery.length;j++) 
        {
            //namespace matching
            if (keys[i].match(new RegExp(latestQuery[j],"ig")) == null) 
            {
                continue o;
            }

            var splitArray = _nodes.get(keys[i]).name.split('/');
            console.log(splitArray);

            if (_nodes.get(keys[i]).direction  == 1) 
            {	
                filterMatches[0].push(splitArray.slice(1,splitArray.length));
                break;
            } 
            else if (_nodes.get(keys[i]).direction == 0) 
            {	
                filterMatches[1].push(splitArray.slice(1,splitArray.length));
                break;
            }
        }
    }

    //console.log('filterMatches', filterMatches);
}

function updateLevelStructure() 
{
    levels = [[[]],[[]]];

	//sources
	filterMatches[0].sort();
	for (var i=0;i<filterMatches[0].length;i++) 
    {
        levels[0].push([filterMatches[0][i][0]]);  

		for (var j=1;j<filterMatches[0][i].length;j++) 
        {
            levels[0][levels[0].length-1].push(filterMatches[0][i][j]);
		}
	}
    levels[0] = clusterSignals(levels[0], 0);


	//sinks
	filterMatches[1].sort();
	for (var i=0;i<filterMatches[1].length;i++) 
    {
        levels[1].push([filterMatches[1][i][0]]);

		for (var j=1;j<filterMatches[1][i].length;j++) 
        {
            levels[1][levels[1].length-1].push(filterMatches[1][i][j]);
		}
	}
    levels[1] = clusterSignals(levels[1], 0);
}

function clusterSignals(list,depth) 
{
	var labels = new Array();
    var clusters = new Array();

    o: for (var i=0,n=list.length;i<n;i++) 
    {
		for (var j=0,y=labels.length;j<y;j++) 
        {
			if (labels[j]==list[i][depth]) 
            {
                clusters[j].push(list[i]);
				continue o;
			}
        }

        if (list[i].length > depth) 
        {
            labels[labels.length] = list[i][depth];
            clusters[clusters.length] = [list[i]];
        }
    }

    for (var i=0;i<clusters.length;i++) 
    {
        clusters[i] = clusterSignals(clusters[i],depth+1); 
        if (clusters[i][0].length==0) 
        {
            clusters[i] = 0; 
        }
    }

    return [labels,clusters];
}
