

var hhtd = {
    width: 10,
    height: 10,
    time: 0,
    unit: 40,
    money: 300,
    layout: [
        ["", "", "", "", "Vampire", "", "", "", "", ""],
        ["", ".", "-", "-", "-", "-", "-", "-", ".", ""],
        ["", "|", "", "", "", "", "", "", "|", ""],
        ["", "|", "", "", "", "", "", "", "|", ""],
        ["", "|", "Ghost", "", "", "", "", "", "|", ""],
        ["", "|", "", "", "", "", "", "Zombie", "|", ""],
        ["", "|", "", "", "", "", "", "", "|", ""],
        ["", ".", "-", ".", "", "", ".", "-", ".", ""],
        ["", "", "", "|", "", "", "|", "", "", ""],
        ["", "", "", "END", "", "", "START", "", "", ""]
    ],
    route: [[6, 9], [6, 8], [6, 7], [7, 7], [8, 7], [8, 6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [7, 1], [6, 1], [5, 1], [4, 1], [3, 1], [2, 1], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [2, 7], [3, 7], [3, 8], [3, 9]],
    trains: [],
    schedule: [{
        time: 20,
        passengers: 2,
        name: "Alfred",
        color: "#40da32"
    }, {
        time: 80,
        passengers: 2,
        name: "Bill",
        color: "#b06a42"
    }, {
        time: 140,
        passengers: 2,
        name: "Chris",
        color: "#a4ba52"
    }]
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
            else if (hhtd.layout[y][x] == "Zombie") {

                rowHtml += "<div class='cell'><div class='zombie-1'></div></div>";
            }
            else if (hhtd.layout[y][x] == "Vampire") {

                rowHtml += "<div class='cell'><div class='vampire-1'></div></div>";
            }
            else if (hhtd.layout[y][x] == "Ghost") {

                rowHtml += "<div class='cell'><div class='ghost-1'></div></div>";
            }
            else if (hhtd.layout[y][x]) {

//                console.log("layout text exists " + hhtd.layout[y][x]);
                rowHtml += "<div class='cell'><div class='word'>" + hhtd.layout[y][x] + "</div></div>";

                if (hhtd.layout[y][x] == "START") {

                    hhtd.start = {
                        x: x,
                        y: y
                    }

                    // console.log("set up start position");
                    // console.log(hhtd.start);
                }

                if (hhtd.layout[y][x] == "END") {
                    
                    hhtd.end = {
                        x: x,
                        y: y
                    }

                    // console.log("set up end position");
                    // console.log(hhtd.end);
                }
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

hhtd.AddTrain = function(t) {
    hhtd.trains.push(t);
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

//    console.log(hhtd.time);

    $(".train").remove();

    $.each(hhtd.trains, function(i, t) {

        console.log(t);


        if (t.cellprogress < hhtd.route.length) {

        var trainHtml = "<div class='train'></div>";

        $("#tracks").append(trainHtml);

            var c = hhtd.route[t.cellprogress];

//            console.log(c);

            $(".train:last").css("left", ((hhtd.unit/2) - 8 + (c[0] * hhtd.unit)) + "px");
            $(".train:last").css("top", ((hhtd.unit/2) - 8 + (c[1] * hhtd.unit)) + "px");
            $(".train:last").css("background-color", t.color);
        }

        t.time++;

        if (t.time % 20 == 0) {

            t.y--;
            t.celltime++;
            t.cellprogress++;
        }
    });

    if (hhtd.schedule.length > 0) {

        if (hhtd.time >= hhtd.schedule[0].time) {

            console.log("all aboard! t = " + hhtd.time);

            var newTrain = hhtd.schedule.shift();

            hhtd.AddTrain({
                passengers: newTrain.passengers,
                name: newTrain.name,
                color: newTrain.color,
                time: 0,
                celltime: 0,
                cellprogress: 0,
                x: hhtd.start.x,
                y: hhtd.start.y
            });
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
