var s1 = document.getElementById('square1');
var s2 = document.getElementById('square2');
var s3 = document.getElementById('square3');
var s4 = document.getElementById('square4');
var s5 = document.getElementById('square5');
var s6 = document.getElementById('square6');
var s7 = document.getElementById('square7');
var s8 = document.getElementById('square8');
var s9 = document.getElementById('square9');

var text = "";
function fun1(){
    if(text == "X"){
        text = "O";
    }else{
        text = "X";
    }
    if(s1.innerText == ""){
        s1.innerText = text;
    }
    check();
    s1.disabled = 'true';
}
function fun2(){
    if(text == "X"){
        text = "O"
    }
    else{
        text = "X";
    }
    if(s2.innerText == ""){
        s2.innerText = text;
    }
    check();
    s2.disabled = 'true';
}
function fun3(){
    if(text == "X"){
        text = "O"
    }
    else{
        text = "X";
    }
    if(s3.innerText == ""){
        s3.innerText = text;
    }
    check();
    s3.disabled = 'true';
}
function fun4(){
    if(text == "X"){
        text = "O"
    }
    else{
        text = "X";
    }
    if(s4.innerText == ""){
        s4.innerText = text;
    }
    check();
    s4.disabled = 'true';
}
function fun5(){
    if(text == "X"){
        text = "O"
    }
    else{
        text = "X";
    }
    if(s5.innerText == ""){
        s5.innerText = text;
    }
    check();
    s5.disabled = 'true';
}
function fun6(){
    if(text == "X"){
        text = "O"
    }
    else{
        text = "X";
    }
    if(s6.innerText == ""){
        s6.innerText = text;
    }
    check();
    s6.disabled = 'true';
}
function fun7(){
    if(text == "X"){
        text = "O"
    }
    else{
        text = "X";
    }
    if(s7.innerText == ""){
        s7.innerText = text;
    }
    check();
    s7.disabled = 'true';
}
function fun8(){
    if(text == "X"){
        text = "O"
    }
    else{
        text = "X";
    }
    if(s8.innerText == ""){
        s8.innerText = text;
    }
    check();
    s8.disabled = 'true';
}
function fun9(){
    if(text == "X"){
        text = "O"
    }
    else{
        text = "X";
    }
    if(s9.innerText == ""){
        s9.innerText = text;
    }
    check();
    s9.disabled = 'true';
}
function check(){
    if(text==s1.innerText && text==s2.innerText && text==s3.innerText){
        document.getElementById('win').innerText = text+" won";
        s1.style.backgroundColor = "green";
        s2.style.backgroundColor = "green";
        s3.style.backgroundColor = "green";
    }
    if(text==s4.innerText && text==s5.innerText && text==s6.innerText){
        document.getElementById('win').innerText = text+" won";
        s4.style.backgroundColor = "green";
        s5.style.backgroundColor = "green";
        s6.style.backgroundColor = "green";
    }
    if(text==s7.innerText && text==s8.innerText && text==s9.innerText){
        document.getElementById('win').innerText = text+" won";
        s7.style.backgroundColor = "green";
        s8.style.backgroundColor = "green";
        s9.style.backgroundColor = "green";
    }
    if(text==s1.innerText && text==s4.innerText && text==s7.innerText){
        document.getElementById('win').innerText = text+" won";
        s1.style.backgroundColor = "green";
        s4.style.backgroundColor = "green";
        s7.style.backgroundColor = "green";
    }
    if(text==s2.innerText && text==s5.innerText && text==s8.innerText){
        document.getElementById('win').innerText = text+" won";
        s2.style.backgroundColor = "green";
        s5.style.backgroundColor = "green";
        s8.style.backgroundColor = "green";
    }
    if(text==s3.innerText && text==s6.innerText && text==s9.innerText){
        document.getElementById('win').innerText = text+" won";
        s3.style.backgroundColor = "green";
        s6.style.backgroundColor = "green";
        s9.style.backgroundColor = "green";
    }
    if(text==s1.innerText && text==s5.innerText && text==s9.innerText){
        document.getElementById('win').innerText = text+" won";
        s1.style.backgroundColor = "green";
        s5.style.backgroundColor = "green";
        s9.style.backgroundColor = "green";
    }
    if(text==s3.innerText && text==s5.innerText && text==s7.innerText){
        document.getElementById('win').innerText = text+" won";
        s3.style.backgroundColor = "green";
        s5.style.backgroundColor = "green";
        s7.style.backgroundColor = "green";
    }
}
function replay(){
    window.location.href = "http://127.0.0.1:5500/Tic Tac Toe/game.html";
}