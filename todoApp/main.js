const $list = document.querySelector('#list');
const $button = document.querySelector('#button');
const $input = document.querySelector('input');
var counter = 0;

$button.addEventListener('click', addTodo);

function addTodo() {
    let inputValue = $input.value;
    counter++;

    if (inputValue) {
        const todo = document.createElement('div');
        todo.textContent = counter + '. ' + inputValue;
        todo.style.cursor = 'pointer'
        todo.style.border = '1px solid #dee0da';
        todo.style.boxShadow = '1px 1px 3px'
        todo.style.width = '340px';
        todo.style.padding = '0px 10px';
        todo.style.borderRadius = '10px'
        todo.style.fontSize = '15px'
        todo.classList.add('mark' + counter);

        $list.insertAdjacentElement('beforeend', todo);
    }

    const $item = document.querySelector('.mark' + counter);
    $item.addEventListener('click', function () {
        $item.style.textDecoration = 'line-through';
        $item.textContent = '\u2713' + inputValue;

    });
}