/*
function Customer(id,name,address,salary){
    var cusID=id;
    var cusName=name;
    var cusAddress=address;
    var cusSalary=salary;


    /!*this.setCusId = function (id) {
        cusID = id;
    }
    this.getCusId = function () {
        return cusId;
    }
    this.setCusName = function (name) {
        cusName = name;
    }
    this.getCusName = function () {
        return cusName;
    }
    this.setCusAddress = function (address) {
        cusAddress = address;
    }
    this.getCusAddress = function () {
        return cusAddress;
    }
    this.setCusSalary = function (salary) {
        cusSalary = salary;
    }
    this.getCusSalary = function () {
        return cusSalary;
    }*!/
}*/

function Customer(id,name,address,salary){
    var cusId=id;
    var cusName=name;
    var cusAddress=address;
    var cusSalary=salary;

    this.setCusId =function (id){
        cusId=id;
    }
    this.getCustId =function (){
        return cusId;
    }
    this.setCusName =function (name){
        cusName=name;
    }
    this.getCusName =function (){
        return cusName;
    }
    this.setCusAddress = function (address){
        cusAddress=address;
    }
    this.getCusAddress = function (){
        return cusAddress;
    }
    this.setCusSalary=function (){
        cusSalary =salary;
    }
    this.getCusSalary = function (){
        return cusSalary;
    }

}