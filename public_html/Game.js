var Game = {};
Game.board = new BoardClass({
    size: 15,
    htmlElement: $("#ciasteczka")
});
Game.board.createMap();

