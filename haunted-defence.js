

var hhtd = {
    width: 10,
    height: 8
}

hhtd.init = function() {

    var rowHtml;

    for (var y = 0; y < hhtd.height; y++) {

        rowHtml = "<div class='row'>";

        for (var x = 0; x < hhtd.width; x++) {

            console.log("another cell");
            rowHtml += "<div class='cell'></div>";
        }

        rowHtml += "</div>";

        $("#tracks").append(rowHtml);
    }
}

hhtd.timer = function() {
    console.log("timer");
}