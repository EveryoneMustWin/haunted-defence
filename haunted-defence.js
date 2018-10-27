

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

hhtd.bottomToTop = function(t) {

    var c = {
        x: 20,
        y: 40 - (2 * t)
    }

    console.log("bottomToTop(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.bottomToRight = function(t) {

    var c = {
        x: 20 + t,
        y: 40 - t
    }

    console.log("bottomToRight(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.leftToRight = function(t) {

    var c = {
        x: (t * 2),
        y: 20
    }

    console.log("bottomToRight(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.leftToTop = function(t) {

    var c = {
        x: t,
        y: 20 - t
    }

    console.log("leftToTop(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.bottomToLeft = function(t) {

    var c = {
        x: 20 - t,
        y: 40 - t
    }

    console.log("bottomToLeft(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.rightToLeft = function(t) {

    var c = {
        x: 40 - (2 * t),
        y: 20
    }

    console.log("rightToLeft(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.rightToBottom = function(t) {

    var c = {
        x: 40 - t,
        y: 20 + t
    }

    console.log("rightToLeft(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.topToBottom = function(t) {

    var c = {
        x: 20,
        y: t * 2
    }

    console.log("rightToLeft(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.topToRight = function(t) {

    var c = {
        x: 20 + t,
        y: t
    }

    console.log("rightToLeft(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.leftToBottom = function(t) {

    var c = {
        x: t,
        y: 20 + t
    }

    console.log("rightToLeft(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.route = [
    { x: 6, y: 9, helper: hhtd.bottomToTop }, 
    { x: 6, y: 8, helper: hhtd.bottomToTop }, 
    { x: 6, y: 7, helper: hhtd.bottomToRight }, 
    { x: 7, y: 7, helper: hhtd.leftToRight }, 
    { x: 8, y: 7, helper: hhtd.leftToTop }, 
    { x: 8, y: 6, helper: hhtd.bottomToTop }, 
    { x: 8, y: 5, helper: hhtd.bottomToTop }, 
    { x: 8, y: 4, helper: hhtd.bottomToTop }, 
    { x: 8, y: 3, helper: hhtd.bottomToTop }, 
    { x: 8, y: 2, helper: hhtd.bottomToTop }, 
    { x: 8, y: 1, helper: hhtd.bottomToLeft }, 
    { x: 7, y: 1, helper: hhtd.rightToLeft }, 
    { x: 6, y: 1, helper: hhtd.rightToLeft }, 
    { x: 5, y: 1, helper: hhtd.rightToLeft }, 
    { x: 4, y: 1, helper: hhtd.rightToLeft }, 
    { x: 3, y: 1, helper: hhtd.rightToLeft }, 
    { x: 2, y: 1, helper: hhtd.rightToLeft }, 
    { x: 1, y: 1, helper: hhtd.rightToBottom }, 
    { x: 1, y: 2, helper: hhtd.topToBottom }, 
    { x: 1, y: 3, helper: hhtd.topToBottom }, 
    { x: 1, y: 4, helper: hhtd.topToBottom }, 
    { x: 1, y: 5, helper: hhtd.topToBottom }, 
    { x: 1, y: 6, helper: hhtd.topToBottom }, 
    { x: 1, y: 7, helper: hhtd.topToRight }, 
    { x: 2, y: 7, helper: hhtd.leftToRight }, 
    { x: 3, y: 7, helper: hhtd.leftToBottom }, 
    { x: 3, y: 8, helper: hhtd.topToBottom }, 
    { x: 3, y: 9, helper: hhtd.topToBottom }
];

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
    hhtd.time++;

    if (hhtd.time % 2 == 0) {

        var c = Math.random() * 140;
        var rgba = "rgba(" + (60 + (c/8)) + ", " + (100 + (c/4)) + ", " + (60 + (c/7)) + ", 0.8)";

        // console.log(rgba);

        $("#title").css("color", rgba);
    }

    $(".train").remove();

    $.each(hhtd.trains, function(i, t) {

//        console.log(t);

        if (t.cellprogress < hhtd.route.length) {

            var trainHtml = "<div class='train'></div>";

            $("#tracks").append(trainHtml);

            var c = hhtd.route[t.cellprogress];

            var o = c.helper(t.celltime);

//            console.log(c);
//           console.log(o);

            // $(".train:last").css("left", ((hhtd.unit/2) - 8 + (c.x * hhtd.unit) + o.x) + "px");
            // $(".train:last").css("top", ((hhtd.unit/2) - 8 + (c.y * hhtd.unit) + o.y) + "px");
            $(".train:last").css("left", ( (hhtd.unit/2) - 23 + (c.x * hhtd.unit) + o.x) + "px");
            $(".train:last").css("top", ( (hhtd.unit/2) - 21 + (c.y * hhtd.unit) + o.y) + "px");
            $(".train:last").css("background-color", t.color);
        }

        t.time++;
        t.celltime++;

        if (t.time % 20 == 0) {

            t.celltime = 0;
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
                cellprogress: 0
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
