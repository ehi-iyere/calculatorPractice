//const { application, json } = require("express");

var exp = " ", number, equalEval, operator, specialOperator, decimal, isClear;
var checker = false;
//var jsdom = require("jsdom");
//const { JSDOM } = jsdom;
//GLOBAL.document = new JSDOM(html).window.document;
var view =  document.getElementById("answer");
var prev= "";
var decimalN = "";
var c = document.getElementById("clear");
//import { History } from './models/history';


view.value = "0";
function insertNum(num){
    c.value = "C"
    if(view.value=="0")
        view.value = "";
    ///colourChange(num);
    if(equalEval){
        
        exp = num;
        view.value = exp;
        if(operator){
            prev += view.value;
        }
        else{
            prev = view.value;
        }
        
        
        number = true;
        
        equalEval = false;
        
    }
    else{
        if(operator){
            console.log("start!");
            checker = true;
            view.value = num;
            prev += view.value;
            operator = false;
           }
        else if(decimal){
            console.log("start6");
            if(number){
            exp = view.value + num;
            decimalN+=num;
            view.value = decimalN;
            console.log("decimalN");
            console.log(decimalN);
            
            console.log("prev");
            console.log(prev);
            }
            else{
             console.log("prev during op");
                decimal = false;
            }
            
            
        }
        
        else{
        console.log("start");
        exp = view.value + num;
        console.log('exp');
        console.log(exp);
        view.value = exp;
        console.log(view.value);
        prev += num;
        console.log(prev);
        number = true;
        }
    }
    operator = false;
    isClear = false;
    console.log(checker);
}
function insertDec(){
  
    if(operator){
        console.log(exp);
        console.log("true see preve");
        console.log(prev);
    }

    if(number && !decimal){
        console.log('exp');
        console.log(exp);
        console.log(view.value);
        exp = view.value;
        view.value = exp +'.';
        console.log(view.value)
        decimalN = view.value;
        prev = prev.substring(0, prev.length - 1);
        console.log(decimalN);

        decimal = true;
        operator = false;
    }
    if(!decimal){
        view.value = 0 + '.';
        decimalN = view.value;
        prev = prev.substring(0, prev.length - 1);
        decimal = true;
        operator = false;
    }
    isClear = false;
   
}

function operators(op){
   
    
    
    equalEval = false;
    operator = true;
    isClear = false;
    
    
    if(decimal){
        prev+=decimalN;
        decimalN = "";
        decimal = false;

    }
    
    prev += op;
    if(op == "/100"){
       view.value = eval(prev);
    }
    if(op=='* -1'){
        view.value = eval(prev);
     }
     console.log("checker from operation");
     console.log(checker);
     if(checker){
         view.value = eval(prev.substring(0, prev.length - 1));
     }
}

function evalTo(){
   var data;
    
    if(decimal){
    prev+=decimalN;
    decimalN = "";
    decimal = false;

    }

    if(exp){
        console.log("before eval");
        console.log(prev);
        data = prev;
        exp = eval(prev);
        view.value = exp;
        prev = view.value;
        console.log("s eval");
        console.log(prev);
        equalEval = true ;
        decimal = false;
        number=false;
        checker = false;
        operator = false;
        
    }
    console.log(data);
    /*const options = {
        method: 'POST',
        Headers:{
            'Content-Type': 'text/plain'
        },
        body: data
    };
    console.log(options);

    fetch('/history/test',options)
    const history = new History({
        body: JSON.stringify(data)
     });
     history.save();*/
     localStorage.setItem("body",data);
     fetch("http://localhost:3000/history", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
        
        body: data,
        
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
 
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(data => window.location.href = data.redirect);
    
    
}


function clearIt(){
    console.log("clear");
    
   
    c.value = "AC";
    exp = "0";
    view.value = exp;
    prev = view.value;
    decimal = false;
    number = false;
    equal = false;
    operator = false;
    isClear = true;

}

function D(){
    const trashcan = document.querySelector('a.delete');
    
    const endpoint = `/histories/${trashcan.dataset.doc}`;
    console.log(endpoint);
        fetch(endpoint,{
            method: 'DELETE'
        })
        .then((response)=>response.json())
        .then((data)=> window.location.href = data.redirect)
        .catch(err => {console.log(err)});
        /*const trashcan = document.querySelector('a.delete');
        trashcan.addEventListener('click', (e) => {
         const endpoint = `/history/${trashcan.dataset.doc}`;
            fetch(endpoint,{
                method: 'DELETE'
            })
            .then((response)=>{response.json()})
            .then((data)=>console.log(data))
            .catch((err => console.log(err)));
        })*/
   
        
        
}


