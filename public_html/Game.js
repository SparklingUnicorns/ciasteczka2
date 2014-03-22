var Game = {};

var Game = {
    init: function() {
        this.initEvents();
        this.clicked = [];
    },
    initEvents: function() {
        $('.board-cell').click(function() {
            var id = $(this).attr('id');
            var splits = id.split('_');
            splits.shift();



            if ($(this).hasClass('clicked')) {
                $(this).removeClass('clicked');
                Game.clicked = [];
            }
            else {
                if (Game.clicked.length) {
                    var firstX = parseInt(splits[0]);
                    var firstY = parseInt(splits[1]);

                    var secondX = parseInt(Game.clicked[0][0]);
                    var secondY = parseInt(Game.clicked[0][1]);

                    if ((secondX === firstX && firstY + 1 === secondY)
                            || (secondX === firstX && firstY - 1 === secondY)
                            || (secondX === firstX - 1 && firstY === secondY)
                            || (secondX === firstX + 1 && firstY === secondY)) {

                        if (Game.board.checkForMiniCombo(firstX, firstY, secondX, secondY)) {
                            Game.board.cleaning();
                            
                        }
                        else {
                            Game.board.changeDiamondPlaces(firstX, firstY, secondX, secondY);
                        }
                        $(".clicked").removeClass('clicked');
                        Game.clicked = [];
                    }
                    else {
                        $(".clicked").removeClass('clicked');
                        Game.clicked = [];
                        $(this).addClass('clicked');
                        Game.clicked.push(splits);
                    }
                }
                else {
                    $(this).addClass('clicked');
                    Game.clicked.push(splits);
                }
            }


        });
    }
};


Game.board = new BoardClass({
    size: 15,
    htmlElement: $("#ciasteczka")
});
Game.board.createMap();
Game.board.cleaning();
Game.init();
