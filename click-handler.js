
var clickHandler = {
    onClick: function (elem) {
        if(!hhtd.decrementMoney(100))
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
        hhtd.setActiveShopItem(this.getAttribute("shopItem"));
    }
}
