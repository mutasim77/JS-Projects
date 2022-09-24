document.addEventListener('mousemove', (event) => {
    let nlo = document.getElementById('image');

    nlo.style.left = `${event.clientX}px`
    nlo.style.top = `${event.clientY}px`
});