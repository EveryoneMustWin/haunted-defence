

var hhtd = {
    width: 10,
    height: 10,
    time: 0,
    unit: 40,
    money: 400,
    round: 1,
    activeShopItem: "zombie",
    layout: [
        ["", "", "", "", "", "", "", "", "", ""],
        ["", ".1", "-", "-", "-", "-", "-", "-", ".2", ""],
        ["", "|", "", "", "", "", "", "", "|", ""],
        ["", "|", "", "", "", "", "", "", "|", ""],
        ["", "|", "", "", "", "", "", "", "|", ""],
        ["", "|", "", "", "", "", "", "", "|", ""],
        ["", ".4", "-", ".2", "", "", ".1", "-", ".3", ""],
        ["", "", "", "|", "spookyride", "", "|", "", "", ""],
        ["", "", "", ".6", "end", "start", ".5", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""]
    ],
    trains: [],
    schedule: []
}

var masterSchedule = [{
    time: 20,
    passengers: 2,
    name: "Alfred",
    rgb: "#40da32",
    color: "green"
}, {
    time: 100,
    passengers: 2,
    name: "Bill",
    rgb: "#b06a42",
    color: "red"
}, {
    time: 220,
    passengers: 2,
    name: "Chris",
    rgb: "#a4ba52",
    color: "yellow"
}, {
    time: 320,
    passengers: 2,
    name: "Derek",
    rgb: "#549ac2",
    color: "blue"
}]

hhtd.init = function() {

    $("#currency-display").text(this.money);

    hhtd.startShop();
}

hhtd.startShop = function() {

    hhtd.state = "shop";
    hhtd.time = 0;

    $("#train-sequencer").addClass("hide");

    hhtd.rebuildGrid();

    $(".shop-item").removeClass("hide");

    $(".shop-item").off("click");
    $(".shop-item").click(clickHandler.shopItemClick);

    // Initialise display for current shop item
    $(".shop-item-" + hhtd.activeShopItem).click();

    $("#round-number").html("Round " + hhtd.round + "</div>");

    $("#start-round").off("click");
    $("#start-round").click(function() {
        hhtd.startRound();
        $("#currency-container").addClass("hide");

        $("#train-sequencer").removeClass("hide");
    });
}

hhtd.startRound = function() {

    hhtd.state = "round";
    hhtd.time = 0;

    console.log("masterSchedule");
    console.log(masterSchedule);
    hhtd.schedule = $.extend(true, [], masterSchedule);

    console.log("hhtd.schedule");
    console.log(hhtd.schedule);

    hhtd.rebuildGrid();

    $(".shop-item").addClass("hide");
    hhtd.trainTimer = setInterval(hhtd.timer, 50);
}

hhtd.rebuildGrid = function() {

    console.log("> rebuilding the grid");
    console.log(hhtd.layout);

    $("#tracks").html("");

    hhtd.monsters = [];

    var rowHtml;

    for (var y = 0; y < hhtd.height; y++) {

        rowHtml = "<div class='row'>";

        for (var x = 0; x < hhtd.width; x++) {

            rowHtml += "<div class='cell' x='" + x + "' y='" + y + "' >"
            if (hhtd.layout[y][x] == "spookyride") {

                rowHtml += "<div class='spookyride'></div>";
            }
            else if (hhtd.layout[y][x] == "|") {

                rowHtml += "<div class='v-track'></div>";

            }
            else if (hhtd.layout[y][x] == "-") {

                rowHtml += "<div class='h-track'></div>";
            }
            else if (hhtd.layout[y][x] == ".1") {

                rowHtml += "<div class='junction-1'></div>";
            }
            else if (hhtd.layout[y][x] == ".2") {

                rowHtml += "<div class='junction-2'></div>";
            }
            else if (hhtd.layout[y][x] == ".3") {

                rowHtml += "<div class='junction-3'></div>";
            }
            else if (hhtd.layout[y][x] == ".4") {

                rowHtml += "<div class='junction-4'></div>";
            }
            else if (hhtd.layout[y][x] == ".5") {

                rowHtml += "<div class='junction-5'></div>";
            }
            else if (hhtd.layout[y][x] == ".6") {

                rowHtml += "<div class='junction-6'></div>";
            }
            else if (hhtd.layout[y][x] == "zombie") {

                rowHtml += "<div class='zombie frame-0'></div>";

                if (hhtd.state == "round") {

                    hhtd.AddMonster({
                        x: x,
                        y: y,
                        type: "zombie"
                    });
                }
            }
            else if (hhtd.layout[y][x] == "vampire") {

                rowHtml += "<div class='vampire frame-0'></div>";

                if (hhtd.state == "round") {

                    hhtd.AddMonster({
                        x: x,
                        y: y,
                        type: "vampire"
                    });
                }
            }
            else if (hhtd.layout[y][x] == "ghost") {

                rowHtml += "<div class='ghost frame-0'></div>";

                if (hhtd.state == "round") {

                    hhtd.AddMonster({
                        x: x,
                        y: y,
                        type: "ghost"
                    });
                }
            }
            else if (hhtd.layout[y][x] == "start") {

                rowHtml += "<div class='start'></div>";
            }
            else if (hhtd.layout[y][x] == "end") {

                rowHtml += "<div class='end'></div>";
            }
//             else if (hhtd.layout[y][x]) {

// //                console.log("layout text exists " + hhtd.layout[y][x]);
//                 rowHtml += "<div class='word'>" + hhtd.layout[y][x] + "</div>";
//             }

            rowHtml += "</div>";
        }

        rowHtml += "</div>";

        $("#tracks").append(rowHtml);
    }

    $(".cell").click(clickHandler.onClick);
}

hhtd.AddTrain = function(t) {

    t.maxBarValue = 40;
    t.thresholdValue = 36;

    t.shock = 0;
    t.disgust = 0;
    t.time = 0;
    t.celltime = 0;
    t.cellprogress = 0;
    t.scoringTime = 0;

    hhtd.trains.push(t);
}

hhtd.AddMonster = function(m) {

    m.awakening = 0;
    m.awakeningFrame = 0;

    if (monsters[m.type]) {

        m.shock = monsters[m.type].shock;
        m.disgust = monsters[m.type].disgust;
    }
    else {
        console.log("serious error, monster type not recognised");
        return;
    }

    m.scare = function(t) {

        m.awakeThisCycle = true;

        if (m.awakening < 12) {
            m.awakening++;

            m.awakeningFrame = 1 + Math.floor(m.awakening / 6);
        } else {

            if (m.shock) {

                if (t.shock < t.maxBarValue) {
                    t.shock += m.shock;
//                    console.log("t.shock up to " + t.shock);
                }
            }

            if (m.disgust) {

                if (t.disgust < t.maxBarValue) {
                    t.disgust += m.disgust;
//                    console.log("t.disgust up to " + t.disgust);
                }
            }

            m.awakeningFrame = 3;
        }

//        console.log("scared to: " + m.awakening);
    }

    m.descare = function() {
        if (m.awakening >= 12) {

            m.awakeningFrame = 3;
            m.awakening--;

        } else if (m.awakening > 0) {
            m.awakeningFrame = 1 + Math.floor(m.awakening / 6);
            m.awakening--;

        } else {

            m.awakeningFrame = 0;
        }

        // console.log("descared to: " + m.awakening);
        // console.log("descared frame: " + m.awakeningFrame);
    }

    hhtd.monsters.push(m);
}

hhtd.timer = function() {
    hhtd.time++;

//    console.log("timer (" + hhtd.time + ") moving trains");

    hhtd.moveTrains();
    hhtd.checkMonsters();
    hhtd.updateUI();

    if (hhtd.time > 1000) {

        console.log("level finished");
        clearInterval(hhtd.trainTimer);

        hhtd.round++;
        hhtd.startShop();
    }
}

hhtd.moveTrains = function() {

    $(".train").remove();

    var survivors = [];

    $.each(hhtd.trains, function(i, t) {

//        console.log(t);

        if (t.cellprogress < hhtd.route.length) {

            var trainHtml = "<div class='train'><div class='train-ob'></div></div>";

            $("#tracks").append(trainHtml);

            var c = hhtd.route[t.cellprogress];

            // console.log("what is the next bit of routing?");
            // console.log(c);

            var o = c.helper(t.celltime);

//            console.log(c);
//           console.log(o);

            // $(".train:last").css("left", ((hhtd.unit/2) - 8 + (c.x * hhtd.unit) + o.x) + "px");
            // $(".train:last").css("top", ((hhtd.unit/2) - 8 + (c.y * hhtd.unit) + o.y) + "px");
            $(".train:last").css("left", ( (hhtd.unit/2) - 22 + (c.x * hhtd.unit) + o.x) + "px");
            $(".train:last").css("top", ( (hhtd.unit/2) - 22 + (c.y * hhtd.unit) + o.y) + "px");

            // $(".train-ob:last").css("background-color", t.color);
            console.log("adding class to train: " + t.color);
            $(".train-ob:last").addClass(t.color);

            $(".train-ob:last").addClass(c.orientation);

            // Cache the cel position in the train so it knows which monsters it is near to
            t.x = c.x;
            t.y = c.y;

            survivors.push(t);
        } else {

            if (t.scoringTime == 0) {

                t.score = 0;

                if (t.shock > 20) {

                    t.score += 10;
                }

                if (t.shock > 25) {

                    t.score += 15;
                }

                if (t.disgust > 20) {

                    t.score += 10;
                }

                if (t.disgust > 25) {

                    t.score += 15;
                }

                if (t.shock > t.thresholdValue) {
                    t.score = 0;
                }

                if (t.disgust > t.thresholdValue) {
                    t.score = 0;
                }
            }

            if (t.scoringTime < 100) {

                survivors.push(t);

                t.scoringTime++;
            } else {

                hhtd.money += t.score;
                $("#currency-display").text(hhtd.money);
            }
        }

        t.time++;
        t.celltime++;

        if (t.time % 20 == 0) {

            t.celltime = 0;
            t.cellprogress++;
        }
    });

    hhtd.trains = survivors;

    if (hhtd.schedule.length > 0) {

        if (hhtd.time >= hhtd.schedule[0].time) {

            //console.log("all aboard! t = " + hhtd.time);

            var newTrain = hhtd.schedule.shift();

            hhtd.AddTrain({
                passengers: newTrain.passengers,
                name: newTrain.name,
                color: newTrain.color,
                rgb: newTrain.rgb
            });
        }
    }
}

hhtd.checkMonsters = function() {

    $.each(hhtd.monsters, function(i, m) {

        m.awakeThisCycle = false;

        $.each(hhtd.trains, function(j, t) {

            var xdiff = Math.abs(m.x - t.x);
            var ydiff = Math.abs(m.y - t.y);

            if (xdiff + ydiff < 2) {

                m.scare(t);
            }
        });

        if (m.awakeThisCycle == false) {
            m.descare();
        }

        var cell = $(".cell[x=" + m.x + "][y=" + m.y + "] div");

        $(cell).removeClass("frame-0");
        $(cell).removeClass("frame-1");
        $(cell).removeClass("frame-2");
        $(cell).removeClass("frame-3");

        // console.log("f: " + m.awakeningFrame);
        $(cell).addClass("frame-" + m.awakeningFrame);
    });
}

hhtd.updateUI = function() {

    $("#train-sequencer").html("");

    $.each(hhtd.trains, function(i, t) {

        if (t.scoringTime == 0) {

            $("#train-sequencer").append("<div class='train-ui'><div class='passenger p-1'></div><div class='passenger p-2'></div><div class='train-health-caption'>Shock</div><div class='train-health-bg'><div class='train-shock'></div></div><div class='train-health-caption'>Disgust</div><div class='train-health-bg'><div class='train-disgust'></div></div></div>");

            $(".train-ui:last").css("background-color", t.rgb);
            $(".train-ui:last .train-shock").css("width", (176 / t.maxBarValue) * t.shock);
            $(".train-ui:last .train-disgust").css("width", (176 / t.maxBarValue) * t.disgust);

        } else if ((t.scoringTime / 10) % 5 >= 2) {

            $("#train-sequencer").append("<div class='train-ui'><div class='passenger p-1'></div><div class='passenger p-2'></div><div class='train-score'>$" + t.score + "</div></div>");

            $(".train-ui:last").css("background-color", t.rgb);

        } else {

            $("#train-sequencer").append("<div class='train-ui'><div class='passenger p-1'></div><div class='passenger p-2'></div></div>");

            $(".train-ui:last").css("background-color", t.rgb);
        }

        if (t.shock >= t.thresholdValue) {

            $(".train-ui:last .passenger").addClass("excess-shock");
        }

        if (t.disgust >= t.thresholdValue) {

            $(".train-ui:last .passenger").addClass("excess-disgust");
        }
    });
}

hhtd.decrementMoney = function(cost) {
    if(cost > this.money) {
        return false;
    }

    this.money -= cost;
    $("#currency-display").text(this.money);
    return true;
}

hhtd.setActiveShopItem = function(item) {
    $(".shop-item-selected").removeClass("shop-item-selected");
    $(".shop-item-" + item).addClass("shop-item-selected");
    this.activeShopItem = item;
    console.log("Active shop item:", this.activeShopItem);
}

hhtd.isCellOccupied = function(x, y) {
    return hhtd.layout[y][x] != "";
}


hhtd.bottomToTop = function(t) {

    var c = {
        x: 20,
        y: 40 - (2 * t)
    }

    //console.log("bottomToTop(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.bottomToRight = function(t) {

    var c = {
        x: 20 + t,
        y: 40 - t
    }

    //console.log("bottomToRight(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.leftToRight = function(t) {

    var c = {
        x: (t * 2),
        y: 20
    }

    //console.log("bottomToRight(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.leftToTop = function(t) {

    var c = {
        x: t,
        y: 20 - t
    }

    //console.log("leftToTop(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.bottomToLeft = function(t) {

    var c = {
        x: 20 - t,
        y: 40 - t
    }

    //console.log("bottomToLeft(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.rightToLeft = function(t) {

    var c = {
        x: 40 - (2 * t),
        y: 20
    }

    //console.log("rightToLeft(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.rightToBottom = function(t) {

    var c = {
        x: 40 - t,
        y: 20 + t
    }

    //console.log("rightToLeft(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.topToBottom = function(t) {

    var c = {
        x: 20,
        y: t * 2
    }

    //console.log("rightToLeft(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.topToRight = function(t) {

    var c = {
        x: 20 + t,
        y: t
    }

    //console.log("rightToLeft(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.leftToBottom = function(t) {

    var c = {
        x: t,
        y: 20 + t
    }

    //console.log("rightToLeft(" + t + ") = " + c.x + ", " + c.y);

    return c;
}

hhtd.route = [
    { x: 5, y: 8, orientation: "right", helper: hhtd.leftToRight },
    { x: 6, y: 8, orientation: "right", helper: hhtd.leftToTop },
    { x: 6, y: 7, orientation: "up", helper: hhtd.bottomToTop },
    { x: 6, y: 6, orientation: "up", helper: hhtd.bottomToRight },
    { x: 7, y: 6, orientation: "right", helper: hhtd.leftToRight },
    { x: 8, y: 6, orientation: "right", helper: hhtd.leftToTop },
    { x: 8, y: 5, orientation: "up", helper: hhtd.bottomToTop }, 
    { x: 8, y: 4, orientation: "up", helper: hhtd.bottomToTop }, 
    { x: 8, y: 3, orientation: "up", helper: hhtd.bottomToTop }, 
    { x: 8, y: 2, orientation: "up", helper: hhtd.bottomToTop }, 
    { x: 8, y: 1, orientation: "up", helper: hhtd.bottomToLeft }, 
    { x: 7, y: 1, orientation: "left", helper: hhtd.rightToLeft }, 
    { x: 6, y: 1, orientation: "left", helper: hhtd.rightToLeft }, 
    { x: 5, y: 1, orientation: "left", helper: hhtd.rightToLeft }, 
    { x: 4, y: 1, orientation: "left", helper: hhtd.rightToLeft }, 
    { x: 3, y: 1, orientation: "left", helper: hhtd.rightToLeft }, 
    { x: 2, y: 1, orientation: "left", helper: hhtd.rightToLeft }, 
    { x: 1, y: 1, orientation: "left", helper: hhtd.rightToBottom }, 
    { x: 1, y: 2, orientation: "down", helper: hhtd.topToBottom }, 
    { x: 1, y: 3, orientation: "down", helper: hhtd.topToBottom }, 
    { x: 1, y: 4, orientation: "down", helper: hhtd.topToBottom }, 
    { x: 1, y: 5, orientation: "down", helper: hhtd.topToBottom }, 
    { x: 1, y: 6, orientation: "down", helper: hhtd.topToRight }, 
    { x: 2, y: 6, orientation: "right", helper: hhtd.leftToRight }, 
    { x: 3, y: 6, orientation: "right", helper: hhtd.leftToBottom }, 
    { x: 3, y: 7, orientation: "down", helper: hhtd.topToBottom }, 
    { x: 3, y: 8, orientation: "down", helper: hhtd.topToRight }, 
    { x: 4, y: 8, orientation: "right", helper: hhtd.leftToRight }
];