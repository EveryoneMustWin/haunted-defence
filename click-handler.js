
var clickHandler = {
    onClick: function (elem) {
        hhtd.decrementMoney(100);
    },

    shopItemClick: function (elem) {
        hhtd.setActiveShopItem(this.getAttribute("shopItem"));
    }
}
