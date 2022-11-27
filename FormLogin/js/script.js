const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

$('#password, #confirm-password').on('keyup', function () {
    if ($('#password').val() == $('#confirm-password').val()) {
        $('#message').html('Passwords Matching').css('color', 'green');
    } else
        $('#message').html('Passwords Not Matching').css('color', 'red');
});