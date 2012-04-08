$(function() {
    window.scrollTo(0,0.9);

    Backbone.couch_connector.config.db_name = "toimawb";
    Backbone.couch_connector.config.ddoc_name = "one";

    window.BlawkModel= Backbone.Model.extend({
        url: '/one_e'
    }); 

    window.BlawkCollection = Backbone.Collection.extend({ 
        model: BlawkModel,
        localStorage: new Store('one_e'),
        url: "/one_e"
    });

    window.Blawks = new BlawkCollection;

    window.AppView = Backbone.View.extend({
        filmstripPointer: 0,
        filmstripTimer: 0,
        framePages: [],
        cellStrip: [],
        currentPage: 0,
        selectedPage: 0,
        selectedFrame: 0,
        selectedCell: 0,
        dispNumFrames: 0,
        dispNumCells: 0,
        blawkWidth: 150,
        blawkHeight: 150,
        blawkWidthNum: 0,
        blawkHeightNum: 0,
        timer: '',
        color: 'red',
        colorDiff: 40,
        tintLight: true,
        tintActive: false,
        lastEl: '',
        trailQueue: [],
        colorQueue: [],
        el: $('#blawk-app'),
        events: {
        /*
            'click .cell': 'changeCell',
            'click .frame': 'changeFrame',
            'click #prev': 'prevPage',
            'click #next': 'nextPage',
            'mousedown .choice': 'colorDown',
            'mouseup .choice': 'colorUp',
            'click #cell-add': 'setCell',
            'click #cell-play': 'playFilmstrip',
            'click #cell-stop': 'stopFilmstrip',
            */
            'click #red': 'red',
            'click #green': 'green',
            'click #blue': 'blue',
            'click #black': 'black',
            'click #white': 'white',
            'click #red-select': 'red',
            'click #green-select': 'green',
            'click #blue-select': 'blue',
            'click #black-select': 'black',
            'click #white-select': 'white',
            'mouseup #red': 'red',
            'mouseup #green': 'green',
            'mouseup #blue': 'blue',
            'mouseup #black': 'black',
            'mouseup #white': 'white',
            'mouseup #red-select': 'red',
            'mouseup #green-select': 'green',
            'mouseup #blue-select': 'blue',
            'mouseup #black-select': 'black',
            'mouseup #white-select': 'white',
            /*
            'click #new-button': 'createNewFrame',
            'click #dup-button': 'dupFrame',
            'click #save-button': 'saveToServer',
            */
            'click .one': 'mouseEnter',
            'mouseenter .one': 'mouseEnter',
            'mousedown .one': 'tintOn',
            'mouseup .one': 'tintOff',
        },  
        onReset: function(coll,resp) {
            console.log('onReset');
            console.log('coll', coll);
            console.log('resp', resp);

            if (coll !== undefined) {
                if (coll.length === 0 && coll.localStorage.records.length === 0) {
                    console.log('local and remote mawbs empty');
                    var frames = [];
                    frames.push([]);
                    var frame = frames[0];
                    for (var j=0;j<this.blawkHeightNum;j++) {
                        for (var i=0;i<this.blawkWidthNum;i++) {
                            frame.push($('#index'+i+'x'+j).data('color'));
                        }
                    }
                    Blawks.create({frames:frames});
                } else if (coll.length === 0) {
                    console.log('remote mawbs empty, loading local mawbs');
                    var localModel = coll.localStorage.findAll()[0];
                    Blawks.create({frames:localModel.frames});
                } else if (coll.localStorage.records.length === 0) {
                    console.log('local mawbs empty, loading remote mawbs');
                    Blawks.at(0).sync = Backbone.localSync;
                    try {
                        Blawks.at(0).save();
                    } catch(e) {
                        console.log('Private browsing mode!');
                    }
                    delete Blawks.at(0).sync;
                }
            }

            this.resetCanvas();
            //this.resetFrames();
        },
        resetCanvas: function() {
            var frames = Blawks.at(0).get('frames');
            var frame = frames[this.selectedPage*this.dispNumFrames+this.selectedFrame];
            var index = 0;

            for (var j=0;j<this.blawkHeightNum;j++) {
                for (var i=0;i<this.blawkWidthNum;i++) {
                    $('#index'+i+'x'+j).css('background',frame[index]);
                    $('#index'+i+'x'+j).data('color',frame[index]);
                    index++;
                }
            }
        },
        /*
        resetFrames: function() {
            var frames = Blawks.at(0).get('frames');
            var totalNumFrames = frames.length;
            this.dispNumFrames = $('.frame').length;
            var numPages = Math.ceil(totalNumFrames/this.dispNumFrames);

            if (this.currentPage == 0) {
                $('#prev > h1').html('');
            } else {
                $('#prev > h1').html(this.currentPage);
            }

            for (var k=0;k<$('.frame').length;k++) {
                $($('.frame')[k]).css('border-color','#ffffff');
            }
            if (this.currentPage == this.selectedPage) {
                $($('.frame')[this.selectedFrame]).css('border-color','#ffff00');
            }

            for (var i=0;i<numPages;i++) {
                this.framePages[i] = [];    
                for (var j=0;j<this.dispNumFrames;j++) {
                    if (i*this.dispNumFrames+j >= totalNumFrames) {
                        break;
                    }
                    this.framePages[i][j] = frames[i*this.dispNumFrames+j];      
                }
            }

            var context = $('#canvas-1')[0].getContext('2d');    
            var width = $('.frame').width()/this.blawkWidthNum;
            var height = $('.frame').height()/this.blawkHeightNum;
            var index = 0;
            for (var k=0;k<this.dispNumFrames;k++) {
                index = 0;
                if (this.currentPage*this.dispNumFrames+k < frames.length) {
                    $($('.frame')[k]).data('index',[this.currentPage,k]);
                    context = $('.frame')[k].getContext('2d');    
                    context.fillStyle = '#000000';
                    context.fillRect(0,0,$('.frame').width(),$('.frame').height());
                    for (var j=0;j<this.blawkHeightNum;j++) {
                        for (var i=0;i<this.blawkWidthNum;i++) {
                            context.fillStyle = this.framePages[this.currentPage][k][index];
                            context.fillRect(i*width,j*height,width,height);
                            index++;
                        }
                    }
                } else {
                    context = $('.frame')[k].getContext('2d');    
                    $($('.frame')[k]).data('index',null);

                    context.fillStyle = '#ffffff';
                    context.fillRect(0,0,$('.frame').width(),$('.frame').height());
                }
            }

            if (this.currentPage+1 < numPages) {
                $('#next > h1').html(this.currentPage+2);
            } else {
                $('#next > h1').html('');
            }
        },
        prevPage: function() {
            if (this.currentPage != 0) {
                this.currentPage--;
                this.resetFrames();
            }
        },
        nextPage: function() {
            if (this.currentPage+1 < this.framePages.length) {
                this.currentPage++;
                this.resetFrames();
            }
        },
        nextFrame: function() {
            var pointer = window.App.filmstripPointer;
            var strip = window.App.filmstrip;

            console.log(pointer);
            console.log(strip);

            var index = 0;
            for (var j=0;j<window.App.blawkHeightNum;j++) {
                for (var i=0;i<window.App.blawkWidthNum;i++) {
                    $('#index'+i+'x'+j).css('background',strip[pointer][index]);
                    $('#index'+i+'x'+j).data('color',strip[pointer][index]);
                    index++;
                }
            }
            window.App.filmstripPointer++; 
            if (window.App.filmstripPointer >= $('.cell').length) {
                window.App.filmstripPointer = 0; 
            }

        },
        playFilmstrip: function() {
            this.filmstripTimer = setInterval(this.nextFrame, 300);

            var el = $('#cell-play');
            var context = el[0].getContext('2d');    
            context.fillStyle = '#ff0000';
            context.beginPath();
            context.moveTo(20,20);
            context.lineTo(20,el.height()-20);
            context.lineTo(el.width()-20,el.height()/2);
            context.lineTo(20,20);
            context.fill();
            context.closePath();

            el = $('#cell-stop');
            context = el[0].getContext('2d');    
            context.fillStyle = '#ffffff';
            context.fillRect(20,20,el.width()-40,el.height()-40);
        },
        stopFilmstrip: function() {
            clearInterval(this.filmstripTimer);

            var el = $('#cell-play');
            var context = el[0].getContext('2d');    
            context.fillStyle = '#ffffff';
            context.beginPath();
            context.moveTo(20,20);
            context.lineTo(20,el.height()-20);
            context.lineTo(el.width()-20,el.height()/2);
            context.lineTo(20,20);
            context.fill();
            context.closePath();

            el = $('#cell-stop');
            context = el[0].getContext('2d');    
            context.fillStyle = '#ff0000';
            context.fillRect(20,20,el.width()-40,el.height()-40);
        },
        setCell: function() {
            var context = $('.cell')[this.selectedCell].getContext('2d');    
            var width = $('.cell').width()/this.blawkWidthNum;
            var height = $('.cell').height()/this.blawkHeightNum;
            var index = 0;
            for (var j=0;j<this.blawkHeightNum;j++) {
                for (var i=0;i<this.blawkWidthNum;i++) {
                    this.filmstrip[this.selectedCell][index] = $('#index'+i+'x'+j).data('color');
                    context.fillStyle = $('#index'+i+'x'+j).data('color');
                    context.fillRect(i*width,j*height,width,height);
                    index++;
                }
            }
        },
        changeCell: function(e) {
            this.selectedCell = $('#'+e.target.id).data('index');

            for (var k=0;k<$('.cell').length;k++) {
                $($('.cell')[k]).css('border-color','#ffffff');
            }
            $('#'+e.target.id).css('border-color','#ffff00');
        },
        changeFrame: function(e) {
            var data = $('#'+e.target.id).data('index');
            if (data == null) {
                return;
            }
            var frames = Blawks.at(0).get('frames');
            var frame = frames[data[0]*$('.frame').length+data[1]];

            for (var k=0;k<$('.frame').length;k++) {
                $($('.frame')[k]).css('border-color','#ffffff');
            }
            $('#'+e.target.id).css('border-color','#ffff00');

            var index = 0;
            if (data[1] < frames.length) {
                for (var j=0;j<this.blawkHeightNum;j++) {
                    for (var i=0;i<this.blawkWidthNum;i++) {
                        $('#index'+i+'x'+j).css('background',frame[index]);
                        $('#index'+i+'x'+j).data('color',frame[index]);
                        index++;
                    }
                }
            } else {
                for (var j=0;j<this.blawkHeightNum;j++) {
                    for (var i=0;i<this.blawkWidthNum;i++) {
                        $('#index'+i+'x'+j).css('background','rgb(0,0,0)');
                        $('#index'+i+'x'+j).data('color','rgb(0,0,0)');
                        index++;
                    }
                }
            }

            this.selectedPage = data[0];
            this.selectedFrame = data[1];
        },
        createNewFrame: function(e) {
            var frames = Blawks.at(0).get('frames');
            frames.push([]);
            var frame = frames[frames.length-1];
            for (var j=0;j<this.blawkHeightNum;j++) {
                for (var i=0;i<this.blawkWidthNum;i++) {
                    frame.push('rgb(0,0,0)');
                }
            }

            Blawks.at(0).set('frames',frames);

            Blawks.at(0).save({},{success: function(){
                console.log('save success!');
                Blawks.trigger('reset')}
            });
        },
        dupFrame: function(e) {
            var frames = Blawks.at(0).get('frames');
            frames.push([]);
            var frame = frames[frames.length-1];
            for (var j=0;j<this.blawkHeightNum;j++) {
                for (var i=0;i<this.blawkWidthNum;i++) {
                    frame.push($('#index'+i+'x'+j).data('color'));
                }
            }

            Blawks.at(0).set('frames',frames);

            Blawks.at(0).save({},{success: function(){
                console.log('save success!');
                Blawks.trigger('reset')}
            });
        },
        saveToServer: function(e) {
            var frames = Blawks.at(0).get('frames');
            console.log('save',this.currentPage,this.selectedFrame);
            frames[this.currentPage*this.dispNumFrames+this.selectedFrame] = [];
            var frame = frames[this.currentPage*this.dispNumFrames+this.selectedFrame];
            for (var j=0;j<this.blawkHeightNum;j++) {
                for (var i=0;i<this.blawkWidthNum;i++) {
                    frame.push($('#index'+i+'x'+j).data('color'));
                }
            }

            Blawks.at(0).set('frames',frames);

            Blawks.at(0).save({},{success: function(){
                console.log('save success!');
                Blawks.trigger('reset')}
            });
        },
        resetFilmstrip: function() {
            this.dispNumCells = $('.cell').length;
            this.filmstrip = [];

            for (var k=0;k<$('.cell').length;k++) {
                $($('.cell')[k]).css('border-color','#ffffff');
            }
            if (this.currentPage == this.selectedPage) {
                $($('.cell')[this.selectedCell]).css('border-color','#ffff00');
            }

            var context = 0;    
            var width = $('.cell').width()/this.blawkWidthNum;
            var height = $('.cell').height()/this.blawkHeightNum;
            for (var k=0;k<this.dispNumCells;k++) {
                $($('.cell')[k]).data('index',k);
                this.filmstrip[k] = [];

                context = $('.cell')[k].getContext('2d');    
                context.fillStyle = 'rgb(0,0,0)';
                context.fillRect(0,0,$('.cell').width(),$('.cell').height());

                for (var j=0;j<this.blawkHeightNum;j++) {
                    for (var i=0;i<this.blawkWidthNum;i++) {
                        this.filmstrip[k].push('rgb(0,0,0)');
                    }
                }
            }
        },
        */
        initialize: function() {
            this.red();
            $('#canvas-1').css('border-color','#ffff00');

            this.initializeCanvas();
            //this.initializeButtons();
            //this.resetFilmstrip();

            Blawks.on('reset', this.onReset, this);
            Blawks.fetch({success: function() { console.log('fetch success'); }});
        },
        initializeCanvas: function() {
            this.blawkWidthNum = $('.canvas').width() / $('.one').width();
            this.blawkHeightNum = $('.canvas').height() / $('.one').height();

            $('.canvas').html('');

            for (var j=0;j<this.blawkHeightNum;j++) {
                for (var i=0;i<this.blawkWidthNum;i++) {
                    $('.canvas').append('<canvas class="one" width="'+this.blawkWidth+'" height="'+this.blawkHeight+'"></canvas>');
                    $('.canvas > canvas:last-child').css('position','absolute').css('left',i*$('.one').width());
                    $('.canvas > canvas:last-child').css('top',j*$('.one').width()).attr('id','index'+i+'x'+j);
                    $('.canvas > canvas:last-child').css('background','rgb(0,0,0)');
                    $('.canvas > canvas:last-child').data('color','rgb(0,0,0)');
                    $('.canvas > canvas:last-child').data('growthPos',-1);
                }
            }
        },
        /*
        initializeButtons: function() {
            var el = $('#cell-add');
            var context = el[0].getContext('2d');    
            context.fillStyle = '#ffffff';
            context.fillRect(el.width()/2-10,10,20,el.height()-20);
            context.fillRect(10,el.height()/2-10,el.height()-20,20);

            el = $('#cell-play');
            context = el[0].getContext('2d');    
            context.fillStyle = '#ffffff';
            context.beginPath();
            context.moveTo(20,20);
            context.lineTo(20,el.height()-20);
            context.lineTo(el.width()-20,el.height()/2);
            context.lineTo(20,20);
            context.fill();
            context.closePath();

            el = $('#cell-stop');
            context = el[0].getContext('2d');    
            context.fillStyle = '#ffffff';
            context.fillRect(20,20,el.width()-40,el.height()-40);
        },
        */
        tintOn: function(e) {
            this.tintActive = true;
        },
        tintOff: function(e) {
            this.tintActive = false;
        },
        mouseEnter: function(e) {
            console.log('mouseEnter');
            console.log(e);
            //var newColor = this.tint($('#'+e.target.id).data('color'));
            //console.log('newColor',newColor);
            if (this.tintActive || e.type === 'click') {
                if ($('#'+e.target.id).data('growthPos') === -1) {
                    $('#'+e.target.id).data('growthPos',0);
                }
                //this.trailQueue.push($('#'+e.target.id));
                //var newColor = 'rgb('+newColor[0]+','+newColor[1]+','+newColor[2]+')';
                //console.log('newColor',newColor);
                //this.colorQueue.push(newColor);
                this.trail();
            }
        },
        trail: function() {
            if (this.timer !== '') {
                //clearTimeout(this.timer); 
                clearInterval(this.timer); 
                //window.App.growthPos = 0;
            }

            //var value = 200;
            //var _els = this.trailQueue;
            //var _colors = this.colorQueue;

/*
            if (_els[_els.length-1] !== '') {
                _els[_els.length-1].css('background', _colors[_colors.length-1]);
                _els[_els.length-1].data('color',_colors[_colors.length-1]);
            }
            */

            /*
            var trailColor;
            for (var i=_els.length-1;i>0;i--) {
            if (_els[i] === '') {
            continue;
            }
            if (this.color === 'red') {
            trailColor = 'rgb('+value+',0,0)';
            } else if (this.color === 'green') {
            trailColor = 'rgb(0,'+value+',0)';
            } else if (this.color === 'blue') {
            trailColor = 'rgb(0,0,'+value+')';
            } else if (this.color === 'white') {
            trailColor = 'rgb('+value+','+value+','+value+')';
            } else {
            trailColor = 'rgb('+(255-value-40)+','+(255-value-40)+','+(255-value-40)+')';
            }
            _els[i].css('background', trailColor);
            value = value-30;
            }
            */

/*
            if (_els[0] !== '') {
                _els[0].css('background', _colors[0]);
                _els[0].data('color',_colors[0]);
            }
            */

            /*if (this.trailQueue.length > 4) {
                this.trailQueue.shift();
                this.colorQueue.shift();
            }*/

            this.timer = setInterval(this.growIn, 50);
            //_els[_els.length-1].data('timer',setInterval(this.growIn, 50));
        },
        growIn: function() {
            //var _els = window.App.trailQueue;
            var _els = $('.one');
            //var _colors = window.App.colorQueue;

            var check = 0;
            for (var i=0;i<_els.length;i++) {
                if ($(_els[i]).data('growthPos') !== -1) {
                    check = 1;
                }
            }
            if (!check) {
                clearInterval(window.App.timer); 
                return;
            }

            var width = $(_els[0]).width();
            var height = $(_els[0]).height();

            var growthPos = 0;
            var context = 0;
            var color = 0;
            for (var i=0;i<_els.length;i++) {
                growthPos = $(_els[i]).data('growthPos');
                context = $(_els[i])[0].getContext('2d');    
                if (growthPos === 0) {
                    $(_els[i]).data('color',window.App.tint($(_els[i]).data('color')));
                }
                //color = _colors[i];
                
                //console.log(color);

                //_els[0].data('color',_color);
                context.fillStyle = $(_els[i]).data('color');

                if (growthPos === 0) {
                    context.fillRect(width/2-5,height/2-5,10,10);
                } else if (growthPos === 1) {
                    context.fillRect(width/2-10,height/2-10,20,20);
                } else if (growthPos === 2) {
                    context.fillRect(width/2-20,height/2-20,40,40);
                } else if (growthPos === 3) {
                    context.fillRect(width/2-30,height/2-30,60,60);
                } else if (growthPos === 4) {
                    context.fillRect(width/2-40,height/2-40,80,80);
                } else if (growthPos === 5) {
                    context.fillRect(width/2-50,height/2-50,100,100);
                } else if (growthPos === 6) {
                    context.fillRect(width/2-60,height/2-60,140,120);
                } else if (growthPos === 7) {
                    context.fillRect(width/2-70,height/2-70,140,140);
                } else if (growthPos === 8) {
                    context.fillRect(0,0,width,height);
                }

                //console.log(_el.data('growthPos'));
                if (growthPos !== -1 && growthPos < 8) {
                    $(_els[i]).data('growthPos',++growthPos);
                } else {
                    $(_els[i]).data('growthPos',-1);
                    //clearInterval(_els[i].data('timer')); 
                    //_els.splice(i,1);
                    //_colors.splice(i,1);
                }
            }

/*
            var _el = window.App.trailQueue[window.App.trailQueue.length-1]; 
            var _color = window.App.colorQueue[window.App.colorQueue.length-1]; 
            var growthPos = _el.data('growthPos');
            
            var context = _el[0].getContext('2d');    
            var width = _el.width()/window.App.blawkWidthNum;
            var height = _el.height()/window.App.blawkHeightNum;

            _el.data('color',_color);
            context.fillStyle = _color;
            if (growthPos === 0) {
                context.fillRect(_el.width()/2-5,_el.height()/2-5,10,10);
            } else if (growthPos === 1) {
                context.fillRect(_el.width()/2-10,_el.height()/2-10,20,20);
            } else if (growthPos === 2) {
                context.fillRect(_el.width()/2-20,_el.height()/2-20,40,40);
            } else if (growthPos === 3) {
                context.fillRect(_el.width()/2-30,_el.height()/2-30,60,60);
            } else if (growthPos === 4) {
                context.fillRect(_el.width()/2-40,_el.height()/2-40,80,80);
            } else if (growthPos === 5) {
                context.fillRect(_el.width()/2-50,_el.height()/2-50,100,100);
            } else if (growthPos === 6) {
                context.fillRect(_el.width()/2-60,_el.height()/2-60,140,120);
            } else if (growthPos === 7) {
                context.fillRect(_el.width()/2-70,_el.height()/2-70,140,140);
            } else if (growthPos === 8) {
                context.fillRect(0,0,_el.width(),_el.height());
            }

            console.log(_el.data('growthPos'));
            if (growthPos < 8) {
                _el.data('growthPos',++growthPos);
            } else {
                _el.data('growthPos',0);
                clearInterval(_el.data('timer')); 
            }
            */
        },
        /*
        fadeTrail: function() {
        var _els = App.trailQueue;
        var _colors = App.colorQueue;

        var length = _els.length;
        for (var i=0;i<length;i++) {
        _els[0].css('background', _colors[0]);
        _els[0].data('color',_colors[0]);
        App.trailQueue.shift();
        App.colorQueue.shift();
        }
        },
        */
        tint: function(oldColor) {
            oldColor = oldColor.substring(4,oldColor.length-1).split(',');
            for (var i=0;i<oldColor.length;i++) {
                oldColor[i] = parseInt(oldColor[i]);
            }

            var newColor = [oldColor[0], oldColor[1], oldColor[2]];
            var diff = this.colorDiff;

            if (this.color === 'red' && oldColor[0] < 255) {
                newColor[0] = oldColor[0] + diff;
            } else if (this.color === 'green' && oldColor[1] < 255) { 
                newColor[1] = oldColor[1] + diff;
            } else if (this.color === 'blue' && oldColor[2] < 255) {
                newColor[2] = oldColor[2] + diff;
            } else if (this.color === 'white') {
                if (oldColor[0] < 255) {
                    newColor[0] = oldColor[0] + diff; 
                } 
                if (oldColor[1] < 255) {
                    newColor[1] = oldColor[1] + diff; 
                } 
                if (oldColor[2] < 255) {
                    newColor[2] = oldColor[2] + diff; 
                }
            } else if (this.color === 'black') {
                if (oldColor[0] > 0) {
                    newColor[0] = oldColor[0] - diff; 
                } 
                if (oldColor[1] > 0) {
                    newColor[1] = oldColor[1] - diff; 
                } 
                if (oldColor[2] > 0) {
                    newColor[2] = oldColor[2] - diff; 
                }
            }

            if (oldColor[0] < 0) {
                newColor[0] = 0;
            } 
            if (oldColor[1] < 0) {
                newColor[1] = 0;
            } 
            if (oldColor[2] < 0) {
                newColor[2] = 0;
            }
            if (oldColor[0] > 255) {
                newColor[0] = 255;
            } 
            if (oldColor[1] > 255) {
                newColor[1] = 255;
            } 
            if (oldColor[2] > 255) {
                newColor[2] = 255;
            }

            newColor = 'rgb('+newColor[0]+','+newColor[1]+','+newColor[2]+')';

            return newColor;
        },
        /*
        blackwhite: function() {
            this.tintLight = !this.tintLight;
            if (this.tintLight) {
                $('#blackwhite').css('background','rgb(255,255,255)');
            } else {
                $('#blackwhite').css('background','rgb(0,0,0)');
            }
        },
        colorDown: function(e) {
            $('#'+e.target.id+'-select').toggle(true);
            $('#'+e.target.id+'-select').css('background','rgb(127,127,0)');
        },
        colorUp: function(e) {
        },
        */
        red: function() {
            this.color = 'red';
            $('#red-select').css('background','rgb(127,127,127)');
            $('#red-select').toggle(true);
            $('#green-select').toggle(false);
            $('#blue-select').toggle(false);
            $('#black-select').toggle(false);
            $('#white-select').toggle(false);
        },
        green: function() {
            this.color = 'green';
            $('#red-select').toggle(false);
            $('#green-select').css('background','rgb(127,127,127)');
            $('#green-select').toggle(true);
            $('#blue-select').toggle(false);
            $('#black-select').toggle(false);
            $('#white-select').toggle(false);
        },
        blue: function() {
            this.color = 'blue';
            $('#red-select').toggle(false);
            $('#green-select').toggle(false);
            $('#blue-select').css('background','rgb(127,127,127)');
            $('#blue-select').toggle(true);
            $('#black-select').toggle(false);
            $('#white-select').toggle(false);
        },
        black: function() {
            this.color = 'black';
            $('#red-select').toggle(false);
            $('#green-select').toggle(false);
            $('#blue-select').toggle(false);
            $('#black-select').css('background','rgb(127,127,127)');
            $('#black-select').toggle(true);
            $('#white-select').toggle(false);
        },
        white: function() {
            this.color = 'white';
            $('#red-select').toggle(false);
            $('#green-select').toggle(false);
            $('#blue-select').toggle(false);
            $('#black-select').toggle(false);
            $('#white-select').css('background','rgb(127,127,127)');
            $('#white-select').toggle(true);
        }
    });

    window.App = new AppView;

    document.body.addEventListener('touchstart', function(e){ 
    },false);
    document.body.addEventListener('touchend', function(e){ 
    },false);
    $('.canvas').delegate('.one', 'touchmove', function(event) {
        console.log('touchmove');
        var e = event.originalEvent;
        e.preventDefault(); 

        var $el = $(document.elementFromPoint(e.targetTouches[0].clientX,e.targetTouches[0].clientY));
        if ($el.hasClass('one') && $el.attr('id') !== window.App.lastEl) {
        /*
            var newColor = App.tint($el.data('color'));

            App.trailQueue.push($el);
            var newColor = 'rgb('+newColor[0]+','+newColor[1]+','+newColor[2]+')';
            App.colorQueue.push(newColor);
            App.trail();
            */
            if ($el.data('growthPos') === -1) {
                $el.data('growthPos',0);
            }
            window.App.trail();

            window.App.lastEl = $el.attr('id');
        }
    },false);
});
