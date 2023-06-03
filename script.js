window.onload=function(){getTime();}
function getTime(){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
// add a zero in front of numbers<10
    m=checkTime(m);
    s=checkTime(s);
    document.getElementById('time').innerHTML=h+":"+m+":"+s;
    setTimeout(function(){getTime()},1000);
}
//setInterval("getTime()",1000);//another way
function checkTime(i){
    if (i<10){
        i="0" + i;
    }
    return i;
}
/*
..........................................*/
$("#name").css("position","relative");
let text=$("#name").text();

var position=0;
function animationText(){
    let output=text.substr(0,position);
    console.log(output);
    $('#name').text(output);
    position++;

    if (position==text.length){
        position=0;
    }
}
setInterval(animationText,200);

//date
var date=new Date();
var day=date.getDate();
var month=date.getMonth()+1;
var year=date.getFullYear();
document.getElementById('date').innerHTML =day+"/"+month+"/"+year;

//time
window.onload=function(){getTime();}
function getTime(){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();

    m=checkTime(m);
    s=checkTime(s);
    document.getElementById('time').innerHTML=h+":"+m+":"+s;
    setTimeout(function(){getTime()},1000);
}

function checkTime(i){
    if (i<10){
        i="0" + i;
    }
    return i;
}

//mail submit btn
function validateemail()
{
    var x=document.myform.email.value;
    var atposition=x.indexOf("@");
    var dotposition=x.lastIndexOf(".");
    if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){
        alert("Please enter a valid e-mail address \n atpostion:"+atposition+"\n dotposition:"+dotposition);
        return false;
    }
}