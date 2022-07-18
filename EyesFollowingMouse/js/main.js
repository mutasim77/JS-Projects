document.onmousemove = function(event) {
    const eyes = document.querySelectorAll('.ball'); // 2 eyes
    
    let x = event.clientX * 100 / window.innerWidth; //100
    let y = event.clientY * 100 / window.innerHeight; //50

    eyes[0].style.transform = 'translate(' + x + '% ,' + y + '%)';  //transform: translate(90% , 50%);
    eyes[1].style.transform = 'translate(' + x + '% ,' + y + '%)';  
}

//event.clientX and event.clientY ->  coordinate by X and Y where mouse were
//window.innerWidth and windowHeight -> they're size our screan; ex: 1400x900

