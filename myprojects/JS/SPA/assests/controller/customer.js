$("#SaveBtn").click(function (){
    $('#customerTable>tr').off();

    let customerID = $('#txtID').val();
    let customerName = $('#txtName').val();
    let customerAddress = $('#txtAddress').val();
    let customerSalary = $('#txtSalary').val();

    let cus = new Customer(customerID,customerName,customerAddress,customerSalary);
    customerDB.push(cus);
    loadAllCustomer();



    $("#customerTable>tr").click(function() {
        let cusID = $(this).children(":eq(0)").text();
        let cusName = $(this).children(":eq(1)").text();
        let cusAddress = $(this).children(":eq(2)").text();
        let cusSalary = $(this).children(":eq(3)").text();

        console.log(cusID,cusName,cusAddress,cusSalary);

        $('#txtID').val(cusID);
        $('#txtName').val(cusName);
        $('#txtAddress').val(cusAddress);
        $('#txtSalary').val(cusSalary);

    });
    cusID();
    cusName();
    cusAddress();
    cusSalary();
    $("#SaveBtn").attr('disabled',true);

    //delete
    $('#customerTable>tr').dblclick(function (){
        $(this).remove();
        $(this).remove();
    });
});
function loadAllCustomer() {
    $('#customerTable').empty();
    console.log("nice");
    for (var i in customerDB){
        console.log("gdse");
/*
        let row = `<tr><td>${customerDB[i].getCusId()}</td><td>${customerDB[i].getCusName()}</td><td>${customerDB[i].getCusAddress()}</td><td>${customerDB[i].getCusSalary()}</td></tr>`;
*/
        let row=`<tr><td>${customerDB[i].getCustId()}</td><td>${customerDB[i].getCusName()}</td><td>${customerDB[i].getCusAddress()}</td><td>${customerDB[i].getCusSalary()}</td></tr>`
        $('#customerTable').append(row);
    }
}


/*update*/

$("#updateBtn").click(function () {

    var selectId = $("#txtID").val();
    var response = searchCustomer(selectId);

    if (response) {
        let cusId = $("#txtID").val();
        let cusName = $("#txtName").val();
        let CusAddress = $("#txtAddress").val();
        let cusSalary = $("#txtSalary").val();

        let cus = new Customer(cusId,cusName,CusAddress,cusSalary);

        let i = selectCustomerIndex(selectId);
        customerDB.splice(i,1);

        customerDB.push(cus);

        loadAllCustomer();
        customerLoadComboBox();
        clearCustomer();

        $("#updateBtn").attr('disabled',true);
        $("#deleteBtn").attr('disabled',true);
    }else {
        clearCustomer();
    }
});

/*delete*/

$("#deleteBtn").click(function () {

    var selectId = $("#txtID").val();
    let i = selectCustomerIndex(selectId);

    customerDB.splice(i,1);

    loadAllCustomer();
    customerLoadComboBox();
    removeCustomerCount();
    allCustomerCount();
    clearCustomer();

    $("#SaveBtn").attr('disabled',true);
    $("#updateBtn").attr('disabled',true);
    $("#deleteBtn").attr('disabled',true);

});


/*search*/

$("#btnSearch").click(function () {

    var searchId = $("#ctxtSearch").val();
    var response = searchCustomer(searchId);

    clearSearchCustomer();

    if (response) {
        $("#txtID").val(response.getCustId());
        $("#txtName").val(response.getCusName());
        $("#txtAddress").val(response.getCusAddress());
        $("#txtSalary").val(response.getCusSalary());

        $("#SaveBtn").attr('disabled',true);
        $("#updateBtn").attr('disabled',false);
        $("#deleteBtn").attr('disabled',false);
        console.log("bye");
    }else {
        clearCustomer();
    }

});

/*validation*/

$("#SaveBtn").attr('disabled',true);
$("#updateBtn").attr('disabled',true);
$("#deleteBtn").attr('disabled',true);

$("#txtID").focus();

/*var regExCusID = /^(C00-)[0-9]{3,4}$/;
var regExCusName = /^[a-zA-Z]{5,18}$/;
var regExCusAddress = /^[a-zA-Z]{5,18}$/;
var regExCusSalary = /^[0-9]{5,8}$/;*/
const cId = /^(C-)[0-9]{3,5}$/;
const cName = /^[A-z]{4,20}$/;
const cAddress = /^[A-z,0-9]{5,30}$/;
const cSalary = /^[0-9]{5,8}$/;


$("#txtID").on('keyup', function (event) {
    saveCustomerButton();
    if (event.key == "Enter") {
        customerValidationFocus();
    }
});

$("#txtName").on('keyup', function (event) {
    saveCustomerButton();
    if (event.key == "Enter") {
        customerValidationFocus();
    }
});

$("#txtAddress").on('keyup', function (event) {
    saveCustomerButton();
    if (event.key == "Enter") {
        customerValidationFocus();
    }
});

$("#txtSalary").on('keyup', function (event) {
    saveCustomerButton();
    if (event.key == "Enter") {
        customerValidationFocus();
    }
});


$("#txtID,#txtName,#txtAddress,#txtSalary").on('blur', function () {
    customerValidation();
});


/*function*/

let id = 2;
function customerId() {
    if (id < 10) {
        $("#txtID").val("C-00"+id);
        id++;
    }else if (id < 100) {
        $("#txtID").val("C-0"+id);
        id++;
    }else {
        $("#txtID").val("C-"+id);
        id++;
    }
}

function searchCustomer(id) {
    for (let i=0 ; i<customerDB.length ; i++) {
        if (customerDB[i].getCustId() == id) {
            return customerDB[i];
        }
    }
}

function selectCustomerIndex(id) {
    for (let i=0 ; i<customerDB.length ; i++) {
        if (customerDB[i].getCustId() == id) {
            return i;
        }
    }
}

let addCustomer = 0;
function addCustomerCount() {
    addCustomer++;
    $("#addCustomerCount").text(addCustomer);
}

let removeCustomer = 0;
function removeCustomerCount() {
    removeCustomer++;
    $("#removeCustomerCount").text(removeCustomer);
}
/********/
function allCustomerCount() {
    $("#customerCount").empty();
    let customerCount = 0;
    for (var i in customerDB) {
        customerCount++;
        $("#customerCount").text(customerCount);
        $("#allCustomerCount").text(customerCount);
    }
}

function clearSearchCustomer() {
    $("#ctxtSearch").val("");
}

function clearCustomer() {
    $("#txtName").val("");
    $("#txtAddress").val("");
    $("#txtSalary").val("");

    $("#txtID").css('border', '1px solid #aeaeda');
    $("#txtName").css('border', '1px solid #aeaeda');
    $("#txtAddress").css('border', '1px solid #aeaeda');
    $("#txtSalary").css('border', '1px solid #aeaeda');
}

function customerValidation() {
    var cusId = $("#txtID").val();
    if (cId.test(cusId)) {
        $("#txtID").css('border', '2px solid blue');
        var cusName = $("#txtName").val();
        if (cName.test(cusName)) {
            $("#txtName").css('border', '2px solid blue');
            var cusAddress = $("#txtAddress").val();
            if (cAddress.test(cusAddress)) {
                $("#txtAddress").css('border', '2px solid blue');
                var cusSalary = $("#txtSalary").val();
                if (cSalary.test(cusSalary)) {
                    $("#txtSalary").css('border', '2px solid blue');
                    return true;
                    }else {

                    $("#txtSalary").css('border', '2px solid red');
                    return false;
                }
            }else {
                $("#txtAddress").css('border', '2px solid red');
                return false;
            }
        }else {
            $("#txtName").css('border', '2px solid red');
            return false;
        }
    }else {
        $("#txtID").css('border', '2px solid red');
        return false;
    }
}

function customerValidationFocus() {
    var cusId = $("#txtID").val();
    if (cId.test(cusId)) {
        var cusName = $("#txtName").val();
        $("#txtName").focus();
        if (cName.test(cusName)) {
            var cusAddress = $("#txtAddress").val();
            $("#txtAddress").focus();
            if (cAddress.test(cusAddress)) {
                var cusSalary = $("#txtSalary").val();
                $("#txtSalary").focus();
                if (cSalary.test(cusSalary)) {

                    }else {

                    $("#txtSalary").focus();
                }
            }else {
                $("#txtAddress").focus();
            }
        }else {
            $("#txtName").focus();
        }
    }else {
        $("#txtID").focus();
    }
}

function saveCustomerButton() {
    let button = customerValidation();
    if (button) {
        $("#SaveBtn").attr('disabled', false);
    } else {
        $("#SaveBtn").attr('disabled', true);

    }
}