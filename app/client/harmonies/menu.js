$(window).resize(function(){    
    CheckIfMobile();
});

require("app/client/harmonies/clicklistener");
function CheckIfMobile(){
    var cw = window.innerWidth;
    if (cw <960){
        //create menu toggle if it doesn't exist already
        if($('#menu-toggle').length < 1){
            var $firstDiv = $('body').children('div').eq(0);
            $('<div id="menu-toggle" class="btn-up"></div>').appendTo($firstDiv);
            $('#main-menu').prependTo($firstDiv).hide();
            var toggled = false;

            console.log("ADDING CLICK LISTENER MENU");
            $('#menu-toggle').on("click", function() {
              console.log("MENU TOGGLE CLICKED");
              if (toggled){
                  $('#menu-toggle').removeClass('btn-pushed').addClass('btn-up');
                  $('#main-menu').hide();
              } else {
                $('#menu-toggle').removeClass('btn-up').addClass('btn-pushed');
                $('#main-menu').show();
              }
              toggled = !toggled;
            });
            
            return;
        }
        $('#menu-toggle').removeClass('btn-pushed').addClass('btn-up').show();
        $('#main-menu').hide();

    } else {
        //change to regular menu
        $('#menu-toggle').removeClass('btn-pushed').addClass('btn-up').hide();
        $('#main-menu').show();
    }
}

function Menu() {
    this.init();
}

Menu.prototype = {
    container: null,
    foregroundColor: null,
    backgroundColor: null,
    selector: null,
    clear: null,
    about: null,
    erase: null,
    join: null,
    panLabel: null,
    zoomin: null,
    zoomout: null,
    layerbg: null,

    init: function() {
        var $firstDiv = $('body').children('div').eq(0);

        var color_width=15,
            color_height=15,
            menuObj = {
                roomControls: {
                    type: 'span',
                    id: 'roomControls',
                    class: '',
                    parent: '#main-menu',
                    text: '',
                    inmenu: false
                },
                zoomControls: {
                    type:'span',
                    id: 'zoomControls',
                    class: '',
                    parent: '#main-menu',
                    text: '',
                    inmenu: false
                },
                brushControls: {
                    type:'span',
                    id: 'brushControls',
                    class: '',
                    parent: '#main-menu',
                    text: '',
                    inmenu: false
                },
                about: {
                    type: 'span',
                    id: 'about',
                    class: 'button',
                    parent: '#roomControls',
                    text: 'About',
                    inmenu: true
                },
                clear: {
                    type:'span',
                    id: 'clear',
                    class: 'button',
                    parent: '#roomControls',
                    text: 'Clear',
                    inmenu: true
                },
                join: {
                    type:'span',
                    id: 'join',
                    class: 'button',
                    parent: '#roomControls',
                    text: 'Join',
                    inmenu: true
                },
                
                layerbg: {
                    type:'div',
                    id: 'bg-layer',
                    class: 'button',
                    parent: '#brushControls',
                    text: 'BG',
                    inmenu: true
                },
                foregroundColor: {
                    type:'canvas',
                    id: 'fgcolor',
                    class: 'color-button',
                    parent: '#brushControls',
                    text: '',
                    inmenu: true
                },
                backgroundColor: {
                    type:'canvas',
                    id:'bgcolor',
                    class:'color-button',
                    parent: '#brushControls',
                    text: '',
                    inmenu: true
                },
                selector: {
                    type: 'select',
                    id:'selector',
                    class: '',
                    parent:'#brushControls',
                    text:'',
                    inmenu: true
                },
                erase: {
                    type: 'div',
                    id: 'erase',
                    class: 'button',
                    parent: '#brushControls',
                    text: 'Erase',
                    inmenu: true
                },
                menuRight:{
                    type:'span',
                    id: 'menu-right',
                    class: '',
                    parent: '#main-menu',
                    text: '',
                    inmenu: false
                },
                zoomout: {
                    type: 'div',
                    id: 'zoomout',
                    class: 'button',
                    parent: '#zoomControls',
                    text: '-',
                    inmenu: true
                },
                drawLabel: {
                  type: 'div',
                  id: 'drawLabel',
                  parent: "#zoomControls",
                  text: 'Draw',
                  class: 'button',
                  inmenu: true
                },
                panLabel: {
                  type: 'div',
                  id: 'panLabel',
                  parent: "#zoomControls",
                  text: 'Pan',
                  class: 'button',
                  inmenu: true
                },
                zoomin: {
                    type: 'div',
                    id: 'zoomin',
                    class: 'button',
                    parent: '#zoomControls',
                    text: '+',
                    inmenu: true
                },
                
            };
        
        
        //create desktop menu gui
        $('<div/>').addClass('gui')
            .attr('id','main-menu')
            .appendTo($firstDiv);
        this.container = document.getElementById('main-menu');
        
        //add buttons in menu
        for (var key in menuObj){
            var menuEntry = menuObj[key],
                keyId = menuEntry['id'];
            $('<'+menuEntry['type']+'/>').addClass(menuEntry['class'])
                .attr('id',menuEntry['id'])
                .text(menuEntry['text'])
                .appendTo(menuEntry['parent']);
            if (menuEntry['inmenu']){
                this[key] = document.getElementById(keyId);
            }
            
        }
        
        //foreground color selector
        //$('#fgcolor').width(color_width).height(color_height);
        this.setForegroundColor(COLOR);
        
        
        //background color selector
        //$('#bgcolor').width(color_width).height(color_height);
        this.setBackgroundColor(BACKGROUND_COLOR);
        
        //add brushes to brush selector
        for (i=0; i<BRUSHES.length; i++){
            $('<option/>').attr('id',i)
                .text(BRUSHES[i].toUpperCase())
                .appendTo('#selector');
        }

        
        
        //if mobile adjust gui
        CheckIfMobile();
        
        
        /*if (checkIfMobile()){
            //create mobile menu gui
            $('<div id="menu-toggle" class="btn-up"></div>').appendTo($firstDiv);
            $('#main-menu').prependTo($firstDiv).hide();
            $('#menu-toggle').on('click', function(){
                if ($('#menu-toggle').hasClass('btn-pushed')){
                    $('#menu-toggle').removeClass('btn-pushed').addClass('btn-up');
                    $('#main-menu').animate({
                        opacity: 0
                    },200).delay(10).hide();
                    
                    return;
                }
                
                $('#menu-toggle').removeClass('btn-up').addClass('btn-pushed');
                $('#main-menu').show().animate({
                    opacity: .9
                },200);
            });
            return;
        }*/

    },
        
    setForegroundColor: function(color) {
        var context = this.foregroundColor.getContext("2d");
        context.fillStyle = 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
        context.fillRect(0, 0, this.foregroundColor.width, this.foregroundColor.height);
        context.fillStyle = 'rgba(0, 0, 0, 0.1)';
        context.fillRect(0, 0, this.foregroundColor.width, 1);
    },

    setBackgroundColor: function(color) {
        var context = this.backgroundColor.getContext("2d");
        context.fillStyle = 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
        context.fillRect(0, 0, this.backgroundColor.width, this.backgroundColor.height);
        context.fillStyle = 'rgba(0, 0, 0, 0.1)';
        context.fillRect(0, 0, this.backgroundColor.width, 1);

    }
        

    
};

module.exports = Menu;
