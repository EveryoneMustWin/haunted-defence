

var hhtd = {
    width: 10,
    height: 10,
    time: 0,
    layout: [
        ["", "", "", "", "", "", "", "", "", ""],
        ["", ".", "-", "-", "-", "-", "-", "-", ".", ""],
        ["", "|", "", "", "", "", "", "", "|", ""],
        ["", "|", "", "", "", "", "", "", "|", ""],
        ["", "|", "", "", "", "", "", "", "|", ""],
        ["", "|", "", "", "", "", "", "", "|", ""],
        ["", "|", "", "", "", "", "", "", "|", ""],
        ["", ".", "-", ".", "", "", ".", "-", ".", ""],
        ["", "", "", "|", "", "", "|", "", "", ""],
        ["", "", "", "END", "", "", "START", "", "", ""]
    ],
    trains: [],
    schedule: [{
        time: 20,
        passengers: 2
    }],
    money: 300
}

hhtd.init = function() {

    var rowHtml;

    for (var y = 0; y < hhtd.height; y++) {

        rowHtml = "<div class='row'>";

        for (var x = 0; x < hhtd.width; x++) {

            if (hhtd.layout[y][x] == "|") {

                rowHtml += "<div class='cell'><div class='v-track'></div></div>";

            }
            else if (hhtd.layout[y][x] == "-") {

                rowHtml += "<div class='cell'><div class='h-track'></div></div>";
            }
            else if (hhtd.layout[y][x] == ".") {

                rowHtml += "<div class='cell'><div class='junction'></div></div>";
            }
            else if (hhtd.layout[y][x]) {

                console.log("layout text exists " + hhtd.layout[y][x]);
                rowHtml += "<div class='cell'><div class='word'>" + hhtd.layout[y][x] + "</div></div>";

            }
            else {

                rowHtml += "<div class='cell'></div>";
            }
        }

        rowHtml += "</div>";

        $("#tracks").append(rowHtml);
    }

    $(".cell").click(clickHandler.onClick);
}

hhtd.timer = function() {
    // console.log("timer");

    hhtd.time++;

    if (hhtd.time % 2 == 0) {

        var c = Math.random() * 140;
        var rgba = "rgba(" + (60 + (c/8)) + ", " + (100 + (c/4)) + ", " + (60 + (c/7)) + ", 0.8)";

        // console.log(rgba);

        $("#title").css("color", rgba);
    }

    console.log(hhtd.time);

    if (hhtd.schedule.length > 0) {

        if (hhtd.time >= hhtd.schedule[0].time) {

            console.log("all aboard!");
            var newTrain = hhtd.schedule.pop();

            console.log("new schedule:");
            console.log(hhtd.schedule);
       }
    }
}

hhtd.decrementMoney = function(cost) {
    if(cost > this.money) {
        return false;
    }

    this.money -= cost;
    $("#currency-display").text(this.money);
    return true;
}
