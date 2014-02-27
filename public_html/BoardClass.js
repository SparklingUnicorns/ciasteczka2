
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
//console.log(this.elements);
    };
    
    this.checkForCombos = function() {
      var combos = [];
      for(var i = 0; i<15; i++) {
          for(var j=0; j<15; j++){
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
            }

            if (counter > 1) {
                j += counter - 1;
            }
          }
      }
      return combos;
    };

    $('#change').click(function() {
        var firstX = $("input[name='firstX']").val();
        var firstY = $("input[name='firstY']").val();

        var secondX = $("input[name='secondX']").val();
        var secondY = $("input[name='secondY']").val();

        var temp = this.elements[firstX][firstY].diamondType;
        this.elements[firstX][firstY].diamondType = this.elements[secondX][secondY].diamondType;
        this.assignDiamondToBoardElement(firstX, firstY, this.elements[firstX][firstY].diamondType);
        this.elements[secondX][secondY].diamondType = temp;
        this.assignDiamondToBoardElement(secondX, secondY, this.elements[secondX][secondY].diamondType);

    });

    this.assignDiamondToBoardElement = function(rowIndex, colIndex, diamondType) {
        var boardElement = this.elements[rowIndex][colIndex];
        boardElement.diamondType = diamondType;
        if (diamondType !== null) {
            boardElement.htmlElement.removeClass().addClass("board-diamond " + diamondType.cssClass)
                    .text(boardElement.diamondType.type);
        }
        else {
            boardElement.htmlElement.removeClass().addClass("board-diamond empty")
                    .text("");
        }
    };
};
