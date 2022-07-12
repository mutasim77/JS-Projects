function myFunction(name) {
    let result = document.querySelector('.result');
    console.log((result.textContent.length))
    if(result.textContent.length > 10){
        
    }
    if (result.textContent === '0') {
        result.textContent = ' ';
    }
    let val = document.querySelector(name);
    result.textContent = result.textContent + val.textContent;
};

let equal = document.querySelector('.equal');
equal.onclick = function () {
    let result = document.querySelector('.result');
    console.log(result.textContent);
    if (result.textContent === '0' || result.textContent === '0.00' || result.textContent === '0.0') {
        result.textContent = '0';
    } else if (result.textContent.includes('+')) {
        let resPlus = result.textContent.split('+');
        result.textContent = (parseFloat(resPlus[0]) + parseFloat(resPlus[1]));
        if(result.textContent === '0.00' || result.textContent === '0.0'){
            result.textContent = '0'
        }
    } else if (result.textContent.includes('-')) {
        let resPlus = result.textContent.split('-');
        result.textContent = (parseInt(resPlus[0]) - parseInt(resPlus[1]));
        if(result.textContent === '0.00' || result.textContent === '0.0'){
            result.textContent = '0'
        }
    } else if (result.textContent.includes('x')) {
        let resPlus = result.textContent.split('x');
        result.textContent = (parseFloat(resPlus[0]) * parseFloat(resPlus[1])).toFixed(2);
        if(result.textContent === '0.00' || result.textContent === '0.0'){
            result.textContent = '0'
        }
    } else if (result.textContent.includes('/')) {
        let resPlus = result.textContent.split('/');
        result.textContent = (parseFloat(resPlus[0]) / parseFloat(resPlus[1])).toFixed(2);
        if(result.textContent === '0.00' || result.textContent === '0.0'){
            result.textContent = '0'
        }
    } else if (result.textContent.includes('%')) {
        let resPlus = result.textContent.split('%');
        result.textContent = (parseInt(resPlus[0]) % parseInt(resPlus[1])).toFixed(2);
        if(result.textContent === '0.00' || result.textContent === '0.0'){
            result.textContent = '0'
        }
    }
}

let clearAC = document.querySelector('.AC');
clearAC.onclick = function () {
    let result = document.querySelector('.result');
    result.textContent = '0';
}

let clear = document.querySelector('.clear');
clear.onclick = function () {
    let result = document.querySelector('.result');
    let x = result.textContent.length - 1;
    if (x === 1 || x === 0) {
        result.textContent = '0'
    } else {
        result.textContent = result.textContent.substring(0, x);
    }
}