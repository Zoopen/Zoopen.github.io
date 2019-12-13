var currentImg;
$(".gallery .gallery-grids .row div[class^=col]").click(function () {
    // console.log($(this).find("img"));
    $("#myModal .modal-body img").attr("src", $(this).find("img").attr("src"))

    $("#myModal").modal('show')
    currentImg = $(this).find("img")

})

// $("#myModal .modal-footer span").eq(1).click(function () {
//     if (currentImg.parent().next().find("img")[0]) {
//         currentImg = currentImg.parent().next().find("img")
//         $("#myModal .modal-body img").attr("src", currentImg.attr("src"))
//     }



// })
// $("#myModal .modal-footer span").eq(0).click(function () {
//     if (currentImg.parent().prev().find("img")[0]) {
//         currentImg = currentImg.parent().prev().find("img")
//         $("#myModal .modal-body img").attr("src", currentImg.attr("src"))
//     }
// })
$("#myModal .modal-body img").click(function(e){
    // console.log(e.offsetX,e.offsetY);
    // console.log($(this).width()/2);
    if(e.offsetX>$(this).width()/2){
        // console.log("點擊了右邊 下一張");
        if (currentImg.parent().next().find("img")[0]) {
            currentImg = currentImg.parent().next().find("img")
            $("#myModal .modal-body img").attr("src", currentImg.attr("src"))
        }
    }else{
        // console.log("點擊了左邊 上一張");
        if (currentImg.parent().prev().find("img")[0]) {
            currentImg = currentImg.parent().prev().find("img")
            $("#myModal .modal-body img").attr("src", currentImg.attr("src"))
        }
    }
    
})