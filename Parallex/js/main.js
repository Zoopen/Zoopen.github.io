var stage = document.querySelector(".stage")
var cards = document.querySelectorAll(".stage .cards .card")
document.body.onmousemove = function(e){
    // console.log(e.clientX,e.clientY);
    var x = e.clientX-stage.offsetLeft-stage.offsetWidth/2
    var y = e.clientY-stage.offsetTop-stage.offsetHeight/2
    console.log(x,y);
    
    stage.style.transform = 'rotateY('+(x/50)+'deg) rotateX('+(y/60)+'deg)'
    cards.forEach(function (e,i) {  
        console.log(e);
        // e.style.perspectiveOrigin = (x/5) + "% " +(y/5) + "%"
        e.style.perspectiveOrigin = (x/2) + "% " +-(y/5) + "%"

        e.style.backgroundPositionX = (x/20+50) + "%"
        e.style.backgroundPositionY = (y/20+50)+ "%"

    })
    
}