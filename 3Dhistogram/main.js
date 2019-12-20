var stage = document.querySelector(".stage")

document.body.onmousemove = function(e){
    stage.style.transition = "none"

    if(show){
        // console.log(e.clientX,e.clientY);
    var x = e.clientX-stage.offsetLeft-stage.offsetWidth/2
    // var y = e.clientY-stage.offsetTop-stage.offsetHeight/2
    // console.log(x,y);

    // stage.style.transform = 'rotateY('+-(x/15)+'deg) rotateX('+-(y/5)+'deg)'
    stage.style.transform = 'rotateY('+-(x/15)+'deg) rotateX(60deg)'

    }else{
         // console.log(e.clientX,e.clientY);
    var x = e.clientX-stage.offsetLeft-stage.offsetWidth/2
    var y = e.clientY-stage.offsetTop-stage.offsetHeight/2
    // console.log(x,y);

    stage.style.transform = 'rotateY('+(x/15)+'deg) rotateX('+-(y/10)+'deg)'
    }
    
}
var chart = document.querySelector(".chart")
var bar1 = document.querySelector(".stage .chart .bar.bar1")
var show = false
stage.onclick = function () {
    stage.style.transition = "all .6s"
    console.log(1);
    // transform: rotateY(-0deg) rotateX(60deg);
    if (show) {
        stage.classList.remove("active")
        this.style.transform = "rotateY(0deg) rotateX(0deg)";
        chart.classList.remove("active")
        show = false

    } else {
        stage.classList.add("active")
        //显示
        this.style.transform = "rotateY(0deg) rotateX(60deg)";
        // this.style.transform = "rotateY(-20deg) rotateX(60deg)";
        // this.style.transform = "rotateY(35deg) rotateX(60deg)";
        chart.classList.add("active")
        show = true

    }
}

