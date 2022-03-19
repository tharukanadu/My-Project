/*save*/

/*
$("#txtItemCode").val("I-001");
*/

$("#saveItemButton").click(function () {

    let code = $("#txtItemCode").val();
    let name = $("#txtItemName").val();
    let price = $("#txtItemPrice").val();
    let qty = $("#txtItemQty").val();

    let i = new Item(code,name,price,qty);

    itemDB.push(i);

    loadAllItem();

    $("#itemTable>tr").click(function () {

        let itemCode = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let itemPrice = $(this).children(":eq(2)").text();
        let itemQty = $(this).children(":eq(3)").text();

        $("#txtItemCode").val(itemCode);
        $("#txtItemName").val(itemName);
        $("#txtItemPrice").val(itemPrice);
        $("#txtItemQty").val(itemQty);

    });

    itemLoadComboBox();
    itemCode();
    addItemCount();
    allItemCount();
    clearItem();

    $("#Save").attr('disabled',true);

});
/*update*/

$("#Update").click(function () {

    var selectCode = $("#txtItemCode").val();
    var response = searchItem(selectCode);

    if (response) {
        let code1 = $("#txtItemCode").val();
        let name = $("#txtItemName").val();
        let price = $("#txtItemPrice").val();
        let qty = $("#txtItemQty").val();

        let i = new Item(code1,name,price,qty);

        let code = selectItemIndex(selectCode);
        itemDB.splice(code,1);

        itemDB.push(i);

        loadAllItem();
        itemLoadComboBox();
        clearItem();

        $("#Save").attr('disabled',true);
        $("#Update").attr('disabled',true);
        $("#Delete").attr('disabled',true);
    }else {
        clearItem();
    }
});

/*delete*/

$("#Delete").click(function () {

    var selectCode = $("#txtItemCode").val();
    let i = selectItemIndex(selectCode);

    itemDB.splice(i,1);

    loadAllItem();
    itemLoadComboBox();
    removeItemCount();
    allItemCount();
    clearItem();

    $("#Save").attr('disabled',true);
    $("#Update").attr('disabled',true);
    $("#Delete").attr('disabled',true);

});

/*search*/

$("#SearchBtn").click(function () {

    var searchCode = $("#txtSearch").val();
    var response = searchItem(searchCode);

    clearSearchItem();

    if (response) {
        $("#txtItemCode").val(response.getItemCode());
        $("#txtItemName").val(response.getItemName());
        $("#txtItemPrice").val(response.getItemPrice());
        $("#txtItemQty").val(response.getItemQty());

        $("#Save").attr('disabled',true);
        $("#Update").attr('disabled',false);
        $("#Delete").attr('disabled',false);
    }else {
        clearItem();
    }

});

/*validation*/

$("#Save").attr('disabled',true);
$("#Update").attr('disabled',true);
$("#Delete").attr('disabled',true);

const iCode = /^(I-)[0-9]{3,5}$/;
const iName = /^[A-z]{3,20}$/;
const iPrice = /^[0-9]{2,}(.00)$/;
const iQty = /^[0-9]{2,}$/;

$("#txtItemCode").on('keyup', function (event) {
    saveItemButton();
    if (event.key == "Enter") {
        itemValidationFocus();
    }
});

$("#txtItemName").on('keyup', function (event) {
    saveItemButton();
    if (event.key == "Enter") {
        itemValidationFocus();
    }
});

$("#txtItemPrice").on('keyup', function (event) {
    saveItemButton();
    if (event.key == "Enter") {
        itemValidationFocus();
    }
});

$("#txtItemQty").on('keyup', function (event) {
    saveItemButton();
    if (event.key == "Enter") {
        itemValidationFocus();
    }
});

$("#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQty").on('blur', function () {
    itemValidation();
});


/*function*/

let code = 2;
function itemCode() {
    if (code < 10) {
        $("#txtItemCode").val("I-00"+code);
        code++;
    }else if (code < 100) {
        $("#txtItemCode").val("I-0"+code);
        code++;
    }else {
        $("#txtItemCode").val("I-"+code);
        code++;
    }
}

function loadAllItem() {
    $("#itemTable").empty();
    for (var i in itemDB) {
        let tableRow = `<tr><td>${itemDB[i].getItemCode()}</td><td>${itemDB[i].getItemName()}</td><td>${itemDB[i].getItemPrice()}</td><td>${itemDB[i].getItemQty()}</td></tr>`;
        $("#itemTable").append(tableRow);
    }
}

function searchItem(code) {
    for (let i=0 ; i<itemDB.length ; i++) {
        if (itemDB[i].getItemCode() == code) {
            return itemDB[i];
        }
    }
}

function selectItemIndex(code) {
    for (let i=0 ; i<itemDB.length ; i++) {
        if (itemDB[i].getItemCode() == code) {
            return i;
        }
    }
}

let addItem = 0;
function addItemCount() {
    addItem++;
    $("#addItemCount").text(addItem);
}

let removeItem = 0;
function removeItemCount() {
    removeItem++;
    $("#removeItemCount").text(removeItem);
}

function allItemCount() {
    $("#itemCount").empty();
    let itemCount = 0;
    for (var i in itemDB) {
        itemCount++;
        $("#itemCount").text(itemCount);
        $("#allItemCount").text(itemCount);
    }
}

function clearSearchItem() {
    $("#txtSearch").val("");
}

function clearItem() {
    $("#txtItemName").val("");
    $("#txtItemPrice").val("");
    $("#txtItemQty").val("");

    $("#txtItemCode").css('border', '1px solid #aeaeda');
    $("#txtItemName").css('border', '1px solid #aeaeda');
    $("#txtItemPrice").css('border', '1px solid #aeaeda');
    $("#txtItemQty").css('border', '1px solid #aeaeda');
}

function itemValidation() {
    var itmCode = $("#txtItemCode").val();
    if (iCode.test(itmCode)) {
        $("#txtItemCode").css('border', '2px solid blue');
        var itmName = $("#txtItemName").val();
        if (iName.test(itmName)) {
            $("#txtItemName").css('border', '2px solid blue');
                var itmPrice = $("#txtItemPrice").val();
                if (iPrice.test(itmPrice)) {
                    $("#txtItemPrice").css('border', '2px solid blue');
                    var itmQty = $("#txtItemQty").val();
                    if (iQty.test(itmQty)) {

                        $("#txtItemQty").css('border', '2px solid blue')
                        return true;
                    }else {
                        $("#txtItemPrice").css('border', '2px solid red');
                        return false;
                    }
                }else {
                    $("#txtItemPrice").css('border', '2px solid red');
                    return false;
                }
        }else {
            $("#txtItemName").css('border', '2px solid red');
            return false;
        }
    }else {
        $("#txtItemCode").css('border', '2px solid red');
        return false;
    }
}

function itemValidationFocus() {
    var itmCode = $("#txtItemCode").val();
    if (iCode.test(itmCode)) {
        var itmName = $("#txtItemName").val();
        $("#txtItemName").focus();
        if (iName.test(itmName)) {

                var itmPrice = $("#txtItemPrice").val();
                $("#txtItemPrice").focus();
                if (iPrice.test(itmPrice)) {
                    var itmQty = $("#txtItemQty").val();
                    $("#txtItemQty").focus();
                    if (iQty.test(itmQty)) {
                    }else {
                        $("#txtItemQty").focus();
                    }
                }else {
                    $("#txtItemPrice").focus();
                }
        }else {
            $("#txtItemName").focus();
        }
    }else {
        $("#txtItemCode").focus();
    }
}

function saveItemButton() {
    let button = itemValidation();
    if (button) {
        $("#Save").attr('disabled',false);
    }else {
        $("#Save").attr('disabled',true);
    }
}