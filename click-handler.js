
var clickHandler = {
    onClick: function (elem) {
        var monster = monsters[hhtd.activeShopItem];
        if(!hhtd.decrementMoney(monster.cost))
            return;

        if(hhtd.isCellOccupied(this))
            return;

        x = this.getAttribute("x");
        y = this.getAttribute("y");

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

    }
}
