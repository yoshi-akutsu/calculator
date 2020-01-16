function add(a, b){
    return a + b;
}
function subtract(a, b){
    return a - b;
}
function divide(a, b){
    return a / b;
}
function multiply(a, b){
    return a * b;
}

function operate(num1, num2, operator){
    if (operator == "+"){
        return add(Number(num1), Number(num2));
    }
    if (operator == "-"){
        return subtract(num1, num2);
    }
    if (operator == "/"){
        return divide(num1, num2);
    }
    if (operator == "x"){
        return multiply(num1, num2);
    }  
}

function update(newValue){
    if (runningTotal.firstChild) {
        runningTotal.removeChild(runningTotal.firstChild);
        let screenContent = document.createElement("p");
        screenContent.textContent = newValue;
        runningTotal.appendChild(screenContent);
    }
    else {
        let screenContent = document.createElement("p");
        screenContent.textContent = 0;
        runningTotal.appendChild(screenContent);
    }
}

function log(buttonPress){
    if (buttonPress.length > 1 && operated != true && displayedString != "") {
        operated = true;
        switch (buttonPress){
            case "multiply" : 
                buttonPress = " x ";
                break;
            case "minus" : 
                buttonPress = " - ";
                break;
            case "divide" : 
                buttonPress = " / ";
                break;
            case "plus" : 
                buttonPress = " + ";
                break;
        }
        displayedString = displayedString.concat(buttonPress);
        update(displayedString);
    }
    else if (buttonPress.length > 1){
    }
    else{
        if (buttonPress == "-"){
            let moddedArray = displayedString.split("");
            if (moddedArray.includes("-") && moddedArray.includes(" - ") == false){
                moddedArray.splice(moddedArray.indexOf("-") -1, 1)
                displayedString = moddedArray.join("");
                update(displayedString);
            }
            else{
                moddedArray = displayedString.split(" ")
                moddedArray.splice(moddedArray.length, 0, buttonPress);
                displayedString = moddedArray.join("");
                update(displayedString);
            }
        }
        else if (buttonPress == "%"){
            let moddedArray = displayedString.split("");
            if (moddedArray[moddedArray.length - 1] == "%"){
                moddedArray.pop();
                displayedString = moddedArray.join("");
                update(displayedString);
            }
            else{
                displayedString = displayedString.concat(buttonPress);
                update(displayedString);
            }
            
        }
        else if (buttonPress == "."){
            let moddedArray = displayedString.split("");
            if (moddedArray.includes(".") == true && moddedArray[0] == "."){
                moddedArray.shift();
                displayedString = moddedArray.join("");
                update(displayedString);
            }
            else if (moddedArray.includes(".")){}
            else{
                displayedString = displayedString.concat(buttonPress);
                update(displayedString);
            }
        }
        else {
            displayedString = displayedString.concat(buttonPress);
            update(displayedString);
            operated = false;
        }
    }
}

function evaluate(statement){
    let solution = 0;
    let array = statement.split(" ");
    for (i = 0; i < array.length; i++){
        if (i < 2){
            if (array[i] == "+" || array[i] == "-"){
                solution += operate(array[i - 1], array[i + 1], array[i]);
            }
            if (array[i] == "x"){
                solution += operate(array[i - 1], array[i + 1], array[i]);
            }
            if (array[i] == "/"){
                solution += operate(array[i - 1], array[i + 1], array[i]);
            }
        }
        else {
            if (array[i] == "+" || array[i] == "-"){
                solution += operate(array[i - 1], array[i + 1], array[i]);
            }
            if (array[i] == "x"){
                solution = operate(solution, array[i + 1], array[i]);
            }
            if (array[i] == "/"){
                solution = operate(solution, array[i + 1], array[i]);
            }
        }
    }
    return solution;
}

// Main
let displayedString = "";
let total = 0;
let equated = false;
let operated = false;
let negatived = false;
let proportioned = false;
let dotted = false;

const runningTotal = document.getElementById("screen");

const btns = document.querySelectorAll("button");
btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if (btn.getAttribute("id") == "equals") {
            update(evaluate(displayedString));
            displayedString = evaluate(displayedString);
            displayedString = displayedString.toString();
            if (displayedString == 0) {
                displayedString = "";
                operated = false;
            }
            equated = true;
        }
        else if (btn.getAttribute("id") == "clear") {
            update(0);
            displayedString = "";
            operated = false;
        }
        else {   
            if (equated == true && btn.getAttribute("id") <= 9 && displayedString.split(" ").length <= 1){
                displayedString = "";
                operated = false;
                equated = false;
            }
            switch(btn.getAttribute("id")){
                case "dot" :
                    log(".");
                    break;
                case "percentage" :
                    log("%");
                    break;
                case "negative" :
                    log("-");
                    break;
                default: 
                    log(btn.getAttribute("id"));  
            } 
        } 
    });
});

update(total);