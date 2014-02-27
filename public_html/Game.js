//var Game = {};

var Game = {
    
    init : function(){
      this.initEvents();  
    },
    
    initEvents : function(){
     $('.board-cell').click( function() {
        var id = $(this).attr('id');
        var splits = id.split('_');
        splits.shift();
        if($(this).hasClass('clicked'))
            $(this).removeClass('clicked');
        else
            $(this).addClass('clicked');
        
     });
    }
};
Game.board = new BoardClass({
    size: 15,
    htmlElement: $("#ciasteczka")
});
Game.board.createMap();
Game.init();
