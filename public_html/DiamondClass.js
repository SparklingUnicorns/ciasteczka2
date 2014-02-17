
/*
 * klasa pojedyńczego diamentu
 */
function DiamondClass(params) {

    var requiredParams = [
        "type",
        "name",
        "awards",
        "cssClass"
    ];

    for (var i = 0; i < requiredParams.length; i++) {
        if (typeof params[requiredParams[i]] === "undefined") {
            throw new Error("diamond class params err");
        }
    }

    this.type = params.type;
    this.name = params.name;
    this.awards = params.awards;
    this.cssClass = params.cssClass;

};