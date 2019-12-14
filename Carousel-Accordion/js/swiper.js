// var swiperContainer = document.querySelector(".swiper-container")
// var swiperWrapper = swiperContainer.querySelector(".swiper-wrapper")
// var swiperSlides = swiperWrapper.querySelectorAll(".swiper-slide")
// var swiperPagination = swiperContainer.querySelector(".swiper-pagination")
// var swiperPaginationDots = []

// var currentNum = 1;

// function showView(currentNum){
//     swiperSlides.forEach(function(swiperSlide,index,swiperSlides){
//         if(currentNum-1 == index){
//             swiperSlide.style.opacity = "1"
//         }else{
//             swiperSlide.style.opacity = "0"
//         }
//     })
//     swiperPaginationDots.forEach(function(e,i,a){
//         if(currentNum-1 == i){
//             e.classList.add("active")
//         }else{
//             e.classList.remove("active")
//         }
//     })
// }

// function createPagination(){
//     swiperSlides.forEach(function(swiperSlide,index,swiperSlides){
//         var node = document.createElement("span")
//         node.i = index
//         swiperPagination.appendChild(node)
//         swiperPaginationDots.push(node)

//     })
// }
// createPagination()

// swiperPaginationDots.forEach(function(e,i,a){
//     e.addEventListener("click",function(){
//         // console.log(i);
//         showView(i+1)

//     })
// })

function MySwiper(elementSelect,params) {
    if(!(this instanceof MySwiper)){
        return new MySwiper(elementSelect)
    }
    this.swiperContainer = document.querySelector(elementSelect)
    this.swiperWrapper = this.swiperContainer.querySelector(".swiper-wrapper")
    this.swiperSlides = this.swiperWrapper.querySelectorAll(".swiper-slide")
    
    this.swiperPagination = this.swiperContainer.querySelector(".swiper-pagination")
    this.swiperButtonPrev = this.swiperContainer.querySelector(".swiper-button-prev")
    this.swiperButtonNext = this.swiperContainer.querySelector(".swiper-button-next")

    this.params = params || {}
    this.currentNum = this.params.currentPage || 1
    
    this.init()
}
//初始化
MySwiper.prototype.init = function(){
    var _this = this
    if(_this.params instanceof Object){
        if(_this.params.pagination){
            _this.createPagination()
        }
        
        if(_this.params.autoplay){
            if(_this.params.delay){
                setInterval(function(){
                    _this.next()
                },_this.params.delay)
            }else{
                setInterval(function(){
                    _this.next()
                },3000)
            }
        }
        // console.log(_this.currentNum);
        
        if(_this.currentNum === undefined){
            _this.showView(_this.currentNum)
        }else{
            _this.showView(_this.currentNum)
        }

        if(_this.params.nextBack){
            _this.swiperButtonPrev.style.display = "block"
            _this.swiperButtonNext.style.display = "block"
            _this.swiperButtonPrev.addEventListener("click",function(){
                _this.prev()
            })
            _this.swiperButtonNext.addEventListener("click",function(){
                _this.next()
            })
        }
    }
}

MySwiper.prototype.showView = function () {
    //根据当前位置显示图片
    this.swiperSlides.forEach(function (swiperSlide, index, swiperSlides) {
        if (this.currentNum - 1 == index) {
            swiperSlide.style.opacity = "1"
        } else {
            swiperSlide.style.opacity = "0"
        }
        // 根据当前位置高亮点
        // console.log(Array.prototype.slice.call(this.swiperPagination.children));
        x = Array.prototype.slice.call(this.swiperPagination.children)
        x.forEach(function (e, i, a) {
            if (this.currentNum - 1 == i) {
                e.classList.add("active")
            } else {
                e.classList.remove("active")
            }
        }, this)
    }, this)

}
//创建点的方法
MySwiper.prototype.createPagination = function () {
    var swiperPaginationDots = []
    this.swiperSlides.forEach(function (swiperSlide, index, swiperSlides) {
        var node = document.createElement("span")
        node.i = index
        this.swiperPagination.appendChild(node)
        swiperPaginationDots.push(node)
    }, this)
    var _this = this
    swiperPaginationDots.forEach(function (e, i, a) {
        e.addEventListener("click", function () {
            // console.log(i);
            _this.currentNum = i + 1
            _this.showView()

        })
    })
}
MySwiper.prototype.next = function () {
    this.currentNum>= this.swiperSlides.length ? this.currentNum = 1:this.currentNum++
    this.showView()
}
MySwiper.prototype.prev = function () {
    this.currentNum == 1 ? this.currentNum = this.swiperSlides.length:this.currentNum--
    this.showView()
}
