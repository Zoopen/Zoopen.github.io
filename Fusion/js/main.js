// 自制按钮点击后下拉
$(".list-icon").click(function () {
    //添加active让自制按钮触发动画
    $(this).toggleClass("active");
    //点击自制按钮显示下拉
    $(".navbar-collapse .navbar-nav").fadeToggle();

})
// $(".list-icon-mid").click(function () {
//     $(this).toggleClass("active");
//     $(".navbar-collapse .navbar-nav").fadeToggle()
// })


// 表单
// input
$(".contact-us-content .form-content .form-group").children("input").on("focus", function () {
    $(".contact-us-content .form-content .form-group").children('label[for=' + $(this).attr("id") + ']').css({
        color: "#f7ac54",
        transform: "scale(.8) translate(-20%,-150%)"
    })
})
$(".contact-us-content .form-content .form-group").children("input").on("blur", function () {
    $(".contact-us-content .form-content .form-group").children('label[for=' + $(this).attr("id") + ']').css({
        color: "#cdcdcd",
        transform: "none"
    })
})
// textarea
$(".contact-us-content .form-content .form-group.message").children("textarea").on("focus", function () {
    $(".contact-us-content .form-content .form-group.message").children('label[for=' + $(this).attr("id") + ']').css({
        color: "#f7ac54",
        transform: "scale(.8) translate(-10%,-150%)"
    })
})
$(".contact-us-content .form-content .form-group.message").children("textarea").on("blur", function () {
    $(".contact-us-content .form-content .form-group.message").children('label[for=' + $(this).attr("id") + ']').css({
        color: "#cdcdcd",
        transform: "none"
    })
})



$('a').click(function () {
    //根据a标签的href转换为id选择器，获取id元素所处的位置，并高度减50px（这里根据需要自由设置）
    $('html,body').animate({
        scrollTop: ($($(this).attr('href')).offset().top)
    }, 1000);
});


// 移动到home中的nav 让它吸顶
$(document).scroll(function(e){
    // console.log(e);
    // console.log($(this).scrollTop());
    let scrollH = $(this).scrollTop()
    // console.log($(".home-nav").offset().top);
    let navH = $(".home-nav").offset().top
    if(scrollH>=navH){
        $("nav.main-navbar-top").css({
            position:"fixed",
            top:"0"
        })
        $(".navbar-collapse").css("opacity",1)
    }else{
        $("nav.main-navbar-top").css({
            position:"absolute",
            top:"-50px",
            background:"black"
        })
        $(".navbar-collapse").css("opacity",0)
    }
})