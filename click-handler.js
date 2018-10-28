
var clickHandler = {
    onClick: function (elem) {
        if(hhtd.state != "shop")
            return;

        var monster = monsters[hhtd.activeShopItem];

        x = this.getAttribute("x");
        y = this.getAttribute("y");

        if(hhtd.isCellOccupied(x,y))
            return;

        if(!hhtd.decrementMoney(monster.cost))
            return;

        hhtd.layout[y][x] = hhtd.activeShopItem;
        var newElem = document.createElement("div");
        var itemClass = hhtd.activeShopItem.toLowerCase() + " frame-0";
        newElem.className = itemClass;
        this.appendChild(newElem);
    },

    shopItemClick: function (elem) {
        var monster = monsters[this.getAttribute("shopItem")];
        hhtd.setActiveShopItem(this.getAttribute("shopItem"));
        $("#shop-cost").text(monster.cost);
        $("#shop-description").text(monster.description);
        $("#shop-shock-factor-value").text(monster.shock);
        $("#shop-disgust-factor-value").text(monster.disgust);

    }
}
