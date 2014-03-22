
function BoardClass(params) {

    this.elements = [];
    this.size = params.size;
    this.htmlElement = params.htmlElement;

    var Diamond1 = new DiamondClass({
        type: "1",
        name: "D1",
        awards: {3: 100, 4: 250, 5: 500},
        cssClass: "D1"
    });

    var Diamond2 = new DiamondClass({
        type: "2",
        name: "D2",
        awards: {3: 100, 4: 250, 5: 500},
        cssClass: "D2"
    });

    var Diamond3 = new DiamondClass({
        type: "3",
        name: "D3",
        awards: {3: 100, 4: 250, 5: 500},
        cssClass: "D3"
    });

    var Diamond4 = new DiamondClass({
        type: "4",
        name: "D4",
        awards: {3: 100, 4: 250, 5: 500},
        cssClass: "D4"
    });

    var Diamond5 = new DiamondClass({
        type: "5",
        name: "D5",
        awards: {3: 100, 4: 250, 5: 500},
        cssClass: "D5"
    });

    var DiamondsTypes = [];

    DiamondsTypes.push(Diamond1);
    DiamondsTypes.push(Diamond2);
    DiamondsTypes.push(Diamond3);
    DiamondsTypes.push(Diamond4);
    DiamondsTypes.push(Diamond5);

    /*
     * generowanie losowej mapy z diamentami
     * @returns {undefined}
     */
    this.createMap = function() {

        var tableElement = $("<table/>", {
            class: "board"
        });

        this.htmlElement.empty().append(tableElement);

        for (var i = 0; i < this.size; i++) {
            var trHtmlElement = $("<tr/>", {
                class: "board-row"
            });
            var row = [];

            for (var j = 0; j < this.size; j++) {
                var diamondTypeIndex = Math.floor(Math.random() * DiamondsTypes.length);
                var randomDiamond = DiamondsTypes[diamondTypeIndex];

                var tdHtmlElement = $("<td/>", {
                    class: "board-cell " + randomDiamond.cssClass,
                    id: "cell_" + i + "_" + j,
                    text: randomDiamond.type
                });

                row.push({
                    diamondType: randomDiamond,
                    htmlElement: tdHtmlElement
                });
                trHtmlElement.append(tdHtmlElement);
            }
            tableElement.append(trHtmlElement);
            this.elements.push(row);
        }
    };
    /*
     * wyszukiwanie tylko POZIOMYCH grup diamentów (grupa = >2)
     * @returns {Array|BoardClass.checkForCombos.combos}
     */
    this.checkForCombos = function() {
        var combos = [];
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 15; j++) {
                var diamond = this.elements[i][j].diamondType;
                var check = true;
                var counter = 1;
                var coordinates = [];
                var diamontPoint = {
                    x: i,
                    y: j
                };
                coordinates.push(diamontPoint);
                while (check && j + counter < 15) {
                    var compare = this.elements[i][j + counter].diamondType;
                    if (diamond === compare) {
                        diamontPoint = {
                            x: i,
                            y: j + counter
                        };
                        coordinates.push(diamontPoint);
                        counter++;
                    }
                    else {
                        check = false;
                    }
                }
                if (counter > 2) {
                    var diamondCombo = {
                        diamondType: diamond.type,
                        diamondCount: counter,
                        comboCoordinates: coordinates
                    };
                    combos.push(diamondCombo);
                    return combos;
                }

                if (counter > 1) {
                    j += counter - 1;
                }
            }
        }
        for (var j = 0; j < 15; j++) {
            for (var i = 0; i < 15; i++) {

                var diamond = this.elements[i][j].diamondType;
                var check = true;
                var counter = 1;
                var coordinates = [];
                var diamontPoint = {
                    x: i,
                    y: j
                };
                coordinates.push(diamontPoint);
                while (check && i + counter < 15) {
                    var compare = this.elements[i + counter][j].diamondType;
                    if (diamond === compare) {
                        diamontPoint = {
                            x: i + counter,
                            y: j
                        };
                        coordinates.push(diamontPoint);
                        counter++;
                    }
                    else {
                        check = false;
                    }
                }
                if (counter > 2) {
                    var diamondCombo = {
                        diamondType: diamond.type,
                        diamondCount: counter,
                        comboCoordinates: coordinates
                    };
                    combos.push(diamondCombo);
                    return combos;
                }

                if (counter > 1) {
                    i += counter - 1;
                }
            }
        }

        return combos;
    };


    this.cleaning = function() {
        var combos = Game.board.checkForCombos();
        var combo = combos[0];
        if (combo) {

            Game.board.blowUpDiamonds(combo.comboCoordinates);
            Game.board.diamondRain();

        }

    };

    /*
     * zamiana 2ch diamentów miejscami z zainputowanymi coorinatesami tych diamentów
     * @param {type} firstX
     * @param {type} firstY
     * @param {type} secondX
     * @param {type} secondY
     * @returns {undefined}
     */
    this.changeDiamondPlaces = function(firstX, firstY, secondX, secondY) {

        var temp = this.elements[firstX][firstY].diamondType;
        this.elements[firstX][firstY].diamondType = this.elements[secondX][secondY].diamondType;
        this.assignDiamondToBoardElement(firstX, firstY, this.elements[firstX][firstY].diamondType);
        this.elements[secondX][secondY].diamondType = temp;
        this.assignDiamondToBoardElement(secondX, secondY, this.elements[secondX][secondY].diamondType);

    };


    /**
     * 
     * @returns {undefined}
     */
    this.diamondRain = function() {
        if (Game.board.diamondDrop()) {
            setTimeout(Game.board.diamondRain, 50);
            //Game.board.diamondRain();
        }
        else
        {
            Game.board.cleaning();
        }
    };


    /**
     * 
     * @returns {Boolean}
     */
    this.diamondDrop = function() {
        var emptyDiamonds = [];
        for (var j = 0; j < 15; j++) {
            for (var i = 14; i >= 0; i--) {

                if (this.elements[i][j].diamondType === null) {

                    var emptyCoordinates = {
                        x: i,
                        y: j
                    };
                    emptyDiamonds.push(emptyCoordinates);
                    break;
                }
            }
        }

        // console.log(emptyDiamonds);
        for (var i = 0; i < emptyDiamonds.length; i++) {
            var x = emptyDiamonds[i].x;
            var y = emptyDiamonds[i].y;

            for (var j = 0; j <= x; j++) {

                if (j < x) {
                    this.elements[x - j][y].diamondType = this.elements[x - j - 1][y].diamondType;
                    this.assignDiamondToBoardElement(x - j, y, this.elements[x - j][y].diamondType);
                }
                else {
                    var diamondTypeIndex = Math.floor(Math.random() * DiamondsTypes.length);
                    var diamondType = DiamondsTypes[diamondTypeIndex];

                    this.assignDiamondToBoardElement(0, y, diamondType);
                }
            }
        }

        //console.log(emptyDiamonds.length !== 0);
        return emptyDiamonds.length !== 0;
    };

    /*
     * funkcja pomocnicza przy zamianie 2ch diamentów lub uzupełnianiu 
     * usunietych diamentów do nadawania niezbednych obiektowi diament klas
     */
    this.assignDiamondToBoardElement = function(rowIndex, colIndex, diamondType) {
        var boardElement = this.elements[rowIndex][colIndex];
        boardElement.diamondType = diamondType;
        if (diamondType !== null) {
            boardElement.htmlElement.removeClass().addClass("board-cell " + diamondType.cssClass)
                    .text(boardElement.diamondType.type);
        }
        else {
            boardElement.htmlElement.removeClass().addClass("board-cell empty")
                    .text("");
        }
    };

    this.blowUpDiamonds = function(coordinates) {
        for (var i = 0; i < coordinates.length; i++) {

            var x = coordinates[i].x;
            var y = coordinates[i].y;
            this.elements[x][y].diamondType = null;
            this.elements[x][y].htmlElement.text(" ").removeClass().addClass("board-cell empty");
        }

    };


    this.checkForMiniCombo = function(firstX, firstY, secondX, secondY) {
        var tempBoard = this;
        tempBoard.changeDiamondPlaces(firstX, firstY, secondX, secondY);
        
        if(tempBoard.checkForCombos().length){
            return true;
        }
        
        return false;
        //console.log(tempBoard);
    };
}
;
