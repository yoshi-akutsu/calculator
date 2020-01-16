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
function putDot(string){
    let array = string.split(" ");
    for (let i = 0; i < array.length; i += 2){
        if (array[i].includes(".")){
            continue;
        }
        else{
            array[i] = array[i] + ".";
        }
    }
    for (let j = 1; j < array.length; j += 2){
        array[j] = " " + array[j] + " ";
    }

    return array.join("");
}
function makeNegative(string){
    let array = string.split(" ");
    for (let i = 0; i < array.length; i += 2){
        if (array[i].includes("-")){
            if (i == array.length - 1){
                array[i] = array[i].substr(1);
            }
            continue;
        }
        else{
            array[i] = "-" + array[i];
        }
    }
    for (let j = 1; j < array.length; j += 2){
        array[j] = " " + array[j] + " ";
    }

    return array.join("");
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
        //need to figure out this logic to make the negative sign work likelu need to loop through the array
        if (buttonPress == "-"){
            displayedString = makeNegative(displayedString);
            update(displayedString);
        }
        else if (buttonPress == "."){
            displayedString = putDot(displayedString);
            update(displayedString);
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