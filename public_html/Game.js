var Game = {};

/*var Game = {
 
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
 };*/
Game.board = new BoardClass({
    size: 15,
    htmlElement: $("#ciasteczka")
});
Game.board.createMap();
Game.board.checkForCombos();
//Game.init();

$('#change').click(function() {
    var firstX = $("input[name='firstX']").val();
    var firstY = $("input[name='firstY']").val();

    var secondX = $("input[name='secondX']").val();
    var secondY = $("input[name='secondY']").val();
    Game.board.changeDiamondPlaces(firstX, firstY, secondX, secondY);

});

$('#blowUp').click(function() {

    var list = [];
    for (var i = 0; i < 15; i++) {
        list.push({x: i, y: 0});
    }
    Game.blowUpDiamonds(list);
});
$('#rain').click(function(){
    Game.board.diamondRain();
});

Game.blowUpDiamonds = function(coordinates) {
    for (var i = 0; i < coordinates.length; i++) {
        
        var x = coordinates[i].x;
        var y = coordinates[i].y;
        Game.board.elements[x][y].diamondType = null;
        Game.board.elements[x][y].htmlElement.text(" ").removeClass().addClass("board-cell empty");
    }

};



