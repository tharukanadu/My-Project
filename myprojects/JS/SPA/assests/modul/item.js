function Item(code,name,price,qty) {
    var itemCode = code;
    var itemName = name;
    var itemPrice = price;
    var itemQty = qty;

    this.setItemCode = function (code) {
        itemCode = code;
    }
    this.getItemCode = function () {
        return itemCode;
    }
    this.setItemName = function (name) {
        itemName = name;
    }
    this.getItemName = function () {
        return itemName;
    }

    this.setItemPrice = function (price) {
        itemPrice = price;
    }
    this.getItemPrice = function () {
        return itemPrice;
    }
    this.setItemQty = function (qty) {
        itemQty = qty;
    }
    this.getItemQty = function () {
        return itemQty;
    }
}