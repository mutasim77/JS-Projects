let table = document.querySelector('.table');
let dropDown = document.querySelector('select');
let inputs = document.querySelectorAll('input');
let code = document.querySelector('#code');
let message = document.querySelector('.message');

//! When we choose color
inputs.forEach(item => {
    item.addEventListener('input', setColors);
})

//! When we choose oreontation
dropDown.addEventListener('change', setColors);

//! Function that sets colors and oreontation
function setColors() {
    let color1 = inputs[0].value;
    let color2 = inputs[1].value;
    let oreontation = dropDown.value;
    code.innerText = table.style.background = `linear-gradient(${oreontation}, ${color1}, ${color2})`;
    message.classList.add('hide');
}

//! Copy the code
document.querySelector('.code').addEventListener('click', () => {
    navigator.clipboard.writeText(document.querySelector('.code').textContent)
        .then(() => {
            message.classList.remove('hide');
        })
})
