// 音频
var audio = document.querySelector(".music-player-audio")
//播放按钮
var playBtn = document.querySelector(".player-control-btn-play")
var cdImg = document.querySelector(".music-player-image")
// 唱片指针
var pointer = document.querySelector(".music-player-pointer")
//音量按钮
var volumeBtn = document.querySelector(".player-control-volume-icon")

// 音量拖动按钮
var volumePointer = document.querySelector(".player-control-volume-progress .pointer")
//音量条(当前音量)
var volumeBack = document.querySelector(".player-control-volume-progress .back")

// 歌曲播放进度
// 进度拖动按钮
var progressPointer = document.querySelector(".player-song-progress .pointer")
// 进度条(已经走的)
var progressBack = document.querySelector(".player-song-progress .back")

var nowTimeDom = document.querySelector(".nowTime")
var totalTimeDom = document.querySelector(".totalTime")

var musicInfoTitle = document.querySelector(".music-info-title")
var musicInfoSinger = document.querySelector(".music-info-singer")
var musicPlayerBlur = document.querySelector(".music-player-blur")
var musicPlayerImage = document.querySelector(".music-player-image img")
var songsList = document.querySelector(".music-player-list .music-list-content")
var prevBtn = document.querySelector(".player-control-btn-prev")
var nextBtn = document.querySelector(".player-control-btn-next")

var modeBtn = document.querySelector(".player-control-btn-mode")

//音量条
var volumeProgress = document.querySelector(".player-control-volume-progress")
//进度条
var progress = document.querySelector(".player-song-progress")
var cdDeg = 0
var cdIntervalId
// 播放
function playAudio() {
    //播放音频
    audio.play()
}
//暂停
function pauseAudio() {
    //暂停音频
    audio.pause()
}
// 给播放按钮添加点击事件
playBtn.addEventListener("click", function () {
    if (audio.paused) {
        playAudio()
    } else {
        pauseAudio()
    }
})


// 音频方法 
// 播放时触发
audio.addEventListener("play", function () {
    playBtn.style.backgroundImage = "url('./img/ios-pause.svg')"
    // playBtn.removeEventListener("click", playAudio)
    // playBtn.addEventListener("click", pauseAudio)
    //cd指针移动到唱片上
    pointer.classList.add("play")
    // 唱片旋转
    cdIntervalId = setInterval(function () {
        cdDeg++
        if (cdDeg == 360) {
            cdDeg = 0
        }
        cdImg.style.transform = "rotate(" + cdDeg + "deg)"
    }, 60)

    progressIntervalId = setInterval(function () {
        changeProgressUi()

        currentProgress = parseInt(getComputedStyle(progressPointer).left)
        if (audio.ended) {
            nextSong()
        }
    }, 1000)
    lighterCurrent()
})
// 暂停时触发
audio.addEventListener("pause", function () {
    playBtn.style.backgroundImage = "url('./img/ios-play.svg')"
    // playBtn.removeEventListener("click", pauseAudio)
    // playBtn.addEventListener("click", playAudio)
    pointer.classList.remove("play")
    clearInterval(cdIntervalId)
})


// 给音量按钮添加点击事件 禁音切换
volumeBtn.addEventListener("click", function () {
    if (audio.muted) {
        audio.muted = false
    } else {
        audio.muted = true
    }
    checkVolume()

})
//检查音量状态,根据音量状态呈现界面
function checkVolume() {
    if (audio.muted) {
        volumeBtn.style.backgroundImage = "url('./img/ios-volume-off.svg')"
    } else if (audio.volume < 0.33) {
        volumeBtn.style.backgroundImage = "url('./img/ios-volume-low.svg')"
    } else {
        volumeBtn.style.backgroundImage = "url('./img/ios-volume-high.svg')"
    }
}


// ---------------------音量控制--------------------------------
// // 音量拖动偏移量
// var mx
// var volumeOffset = 0
// // 获取当前音量
// var currentVolume = parseInt(getComputedStyle(volumePointer).left)
// //音量拖动按钮添加拖动事件
// volumePointer.onmousedown = function (d) {
//     d.preventDefault()
//     d.stopPropagation();
//     console.log("mousedown");
//     var dx = d.pageX
//     var dy = d.pageY
//     // console.log(dx, dy);
//     mx = dx
//     document.body.onmousemove = function (m) {
//         m.preventDefault()
//         m.stopPropagation();
//         console.log("mousemove");
//         // 这一次移动的x坐标减去上一次的就是偏移的坐标
//         volumeOffset = m.pageX - mx
//         mx = m.pageX
//         //当前音量
//         currentVolume += volumeOffset
//         if (currentVolume >= 100) {
//             currentVolume = 100
//         }
//         if (currentVolume <= 0) {
//             currentVolume = 0
//         }
//         //改变音量
//         changeVolume()
//     }
// }

// function changeVolume() {
//     volumePointer.style.left = currentVolume + "px";
//     volumeBack.style.width = currentVolume + "px"
//     audio.volume = currentVolume / 100
// }


// -------------------------重写音量控制
volumeProgress.onmousedown = function (d) {
    d.preventDefault()
    d.stopPropagation();
    console.log(this.offsetWidth, d.offsetX);
    audio.volume = d.offsetX / this.offsetWidth
    console.log(audio.volume);
    changeVolumeUi()
    //cv:current volume
    var cv = audio.volume
    document.body.onmousemove = function (m) {
        removeTransition()
        console.log("d:", d.pageX, "m:", m.pageX);
        volumePointer.style.left = cv * 100 + (m.pageX - d.pageX) + "px"
        volumeBack.style.width = cv * 100 + (m.pageX - d.pageX) + "px"
        if (parseInt(volumePointer.style.left) > 100) {
            volumePointer.style.left = "100px"
            volumeBack.style.width = "100px"
        }
        if (parseInt(volumePointer.style.left) < 0) {
            volumePointer.style.left = "0px"
            volumeBack.style.width = "0px"
        }
        changeVolume()
    }
}

function changeVolumeUi() {
    volumePointer.style.left = audio.volume * 100 + "px"
    volumeBack.style.width = audio.volume * 100 + "px"
    checkVolume()
}

function changeVolume() {
    audio.volume = parseInt(volumePointer.style.left) / 100
    checkVolume()
}

// ---------------------音量控制--------------------------------

document.body.onmouseup = function () {
    // console.log("mouseup");
    document.body.onmousemove = ""
    addTransition()
}

// ---------------------进度控制--------------------------------

// // 进度拖动偏移量
// var progressmx
// var progressOffset = 0
// // 获取当前进度
// var currentProgress = parseInt(getComputedStyle(progressPointer).left)
// //进度拖动按钮添加拖动事件
// progressPointer.onmousedown = function (d) {
//     d.preventDefault()
//     d.stopPropagation();
//     // console.log("mousedown");
//     var dx = d.pageX
//     progressmx = dx
//     document.body.onmousemove = function (m) {
//         m.preventDefault()
//         m.stopPropagation()
//         // console.log("mousemove");
//         // 这一次移动的x坐标减去上一次的就是偏移的坐标
//         progressOffset = m.pageX - progressmx
//         progressmx = m.pageX
//         //当前进度
//         currentProgress += progressOffset
//         if (currentProgress >= 330) {
//             currentProgress = 330
//         }
//         if (currentProgress <= 0) {
//             currentProgress = 0
//         }
//         //改变进度
//         changeProgress()
//     }
// }
// //progressBack=(330*audio.currentTime)/audio.duration
// //audio.currentTime = (audio.duration*progressBack)/330
// function changeProgress() {
//     // console.log(1);
//     progressPointer.style.left = currentProgress + "px";
//     progressBack.style.width = currentProgress + "px"
//     // console.log(currentProgress);

//     audio.currentTime = (audio.duration * parseInt(progressBack.style.width)) / 330
//     //  audio.duration = currentProgress/100
// }
// ---------------------进度控制--------------------------------

//重写进度控制-----------------------------------------

progress.onmousedown = function (d) {
    d.preventDefault()
    d.stopPropagation();
    console.log(this.offsetWidth, d.offsetX);
    audio.currentTime = d.offsetX / this.offsetWidth * audio.duration
    console.log(audio.currentTime);
    changeProgressUi()
    console.log(progress.offsetWidth);

    //ct:currentTime
    var ct = audio.currentTime
    document.body.onmousemove = function (m) {
        removeTransition()
        console.log("d:", d.pageX, "m:", m.pageX);
        progressBack.style.width = (330 * ct) / audio.duration + (m.pageX - d.pageX) + "px";
        progressPointer.style.left = (330 * ct) / audio.duration + (m.pageX - d.pageX) + "px";

        if (parseInt(progressPointer.style.left) > progress.offsetWidth) {
            progressPointer.style.left = progress.offsetWidth + "px"
            progressBack.style.width = progress.offsetWidth + "px"
        }
        if (parseInt(progressPointer.style.left) < 0) {
            progressPointer.style.left = "0px"
            progressBack.style.width = "0px"
        }
        changeProgress()
    }
}

function changeProgressUi() {
    progressBack.style.width = (330 * audio.currentTime) / audio.duration + "px";
    progressPointer.style.left = (330 * audio.currentTime) / audio.duration + "px";
    nowTimeDom.innerHTML = getProgress("currentTime")
}

function changeProgress() {
    audio.currentTime = parseInt(progressPointer.style.left) / parseInt(progress.offsetWidth) * audio.duration
    nowTimeDom.innerHTML = getProgress("currentTime")
}


//重写进度控制-----------------------------------------

//移除进度条过渡效果
function removeTransition() {
    progressBack.style.transition = "none"
    progressPointer.style.transition = "none"
}
//添加进度条过渡效果
function addTransition() {
    progressBack.style.transition = "all .3s"
    progressPointer.style.transition = "all .3s"
}


var xxx = 1
var songsData = new Songs()
var currentSong
var songsListItems

function init() {
    audio.volume = 0.5
    songsData.songs.forEach(function (e, i) {
        // console.log(e);
        // console.log(e.imageUrl);
        // console.log(e.singer);
        // console.log(e.songUrl);
        // console.log(e.title);
        var node = document.createElement("li")
        node.className = "music-list-item"
        node.innerHTML = e.title
        songsList.appendChild(node)
    })

    if (xxx !== 1) return
    // 初始化才执行，第一首显示
    currentSong = 0
    songsListItems = songsList.querySelectorAll(".music-list-item")
    playCurrentSong(currentSong)

    xxx = 1


    songsListItems.forEach(function (e, i) {
        e.onclick = function () {
            currentSong = i
            playCurrentSong(currentSong)
        }
    })
}
init()

// 高亮歌曲列表中播放歌曲
function lighterCurrent() {
    songsListItems.forEach(function (e, i) {
        e.classList.remove("play")
    })
    songsListItems[currentSong].classList.add("play")
}



//播放并显示当前歌曲信息
function playCurrentSong(n) {
    audio.src = songsData.songs[n].songUrl
    musicInfoTitle.innerHTML = songsData.songs[n].title
    musicInfoSinger.innerHTML = songsData.songs[n].singer
    musicPlayerBlur.style.backgroundImage = "url(" + songsData.songs[n].imageUrl + ")"
    musicPlayerImage.src = songsData.songs[n].imageUrl
    clearInterval(cdIntervalId)
    audio.pause()
    setTimeout(function () {
        audio.play()
    }, 50)

}



// 上一首
prevBtn.onclick = function () {
    prevSong()
}

function prevSong() {
    currentSong--
    if (currentSong <= 0) {
        currentSong = songsData.songs.length - 1
    }
    playCurrentSong(currentSong)

}
// 下一首
nextBtn.onclick = function () {
    nextSong()
}
// 随机播放曲目,除了当前歌曲：
function randomSong() {
    var x = randomNum(0, songsData.songs.length - 1)
    if (x == currentSong) {
        return randomSong()
    } else {
        return x
    }
}


function nextSong() {
    console.log(currentMode);
    if (currentMode == 1) {
        console.log("xzx");
        currentSong = randomSong()
        console.log(currentSong);
    } else {
        console.log(1111111);
        currentSong++
        if (currentSong > songsData.songs.length - 1) {
            currentSong = 0
        }
    }

    setTimeout(function () {
        playCurrentSong(currentSong)
    }, 100);

}


var nowTime
var totalTime
// 当指定的音频/视频的元数据已加载时，会发生 loadedmetadata 事件。
audio.addEventListener("loadedmetadata", function () {
    // console.log(audio.duration);
    totalTimeDom.innerHTML = getProgress("totalTime")
})

function getProgress(x) {
    if (x == "totalTime") {
        var tm = parseInt(audio.duration / 60) < 10 ? "0" + parseInt(audio.duration / 60) : parseInt(audio.duration / 60)
        var ts = parseInt(audio.duration % 60) < 10 ? "0" + parseInt(audio.duration % 60) : parseInt(audio.duration % 60)
        totalTime = tm + ":" + ts
        return totalTime
    }
    if (x == "currentTime") {
        var nm = parseInt(audio.currentTime / 60) < 10 ? "0" + parseInt(audio.currentTime / 60) : parseInt(audio.currentTime / 60)
        var ns = parseInt(audio.currentTime % 60) < 10 ? "0" + parseInt(audio.currentTime % 60) : parseInt(audio.currentTime % 60)
        nowTime = nm + ":" + ns
        return nowTime
    }
}


function Songs() {
    this.songs = [{
            id: 1,
            title: 'Rise',
            singer: 'John Dreamer',
            songUrl: './songs/John Dreamer - Rise - Epic Music.flac',
            imageUrl: './img/Rise.jpg'
        },
        {
            id: 2,
            title: '願桜',
            singer: 'GIN',
            songUrl: './songs/GIN - 願桜.mp3',
            imageUrl: './img/願桜.jpg'
        },
        {
            id: 3,
            title: 'いのちの名前',
            singer: '広橋真紀子',
            songUrl: './songs/広橋真紀子 - いのちの名前.flac',
            imageUrl: './img/いのちの名前.jpg'
        },
        {
            id: 4,
            title: 'Time Back',
            singer: 'Bad Style',
            songUrl: './songs/Bad Style - Time Back.mp3',
            imageUrl: './img/TimeBack.jpg'
        }
    ]
}



// progress.onclick = function (e) {
//     e.preventDefault()
//     e.stopPropagation();

//     console.log(this.offsetWidth, e.offsetX);
//     // 改变当前进度currentProgress
//     progressPointer.style.left = (330 * e.offsetX / this.offsetWidth * audio.duration) / audio.duration + "px";
//     console.log(progressPointer.style.left);
//     currentProgress = parseInt(getComputedStyle(progressPointer).left)


//     // progressPointer.style.left = (330 * audio.currentTime) / audio.duration + "px";
//     //改变进度
//     changeProgress()
// }

var mode = [{
        modeName: "listloop",
        modeUrl: "./img/ios-repeat.svg"
    },
    {
        modeName: "shuffle",
        modeUrl: "./img/ios-shuffle.svg"
    },
    {
        modeName: "loop",
        modeUrl: "./img/loop.svg"
    }
]
var currentMode = 0
modeBtn.onclick = function () {
    currentMode++
    if (currentMode > mode.length - 1) {
        currentMode = 0
    }
    this.style.backgroundImage = 'url(' + mode[currentMode].modeUrl + ')'
    //单曲循环
    if (currentMode == mode.length - 1) {
        console.log(1);
        audio.loop = "loop"
    } else if (currentMode == 0) {
        audio.attributes.removeNamedItem("loop")
    }
    //随机播放
    if (currentMode == 1) {
        // 随机播放曲目：
        // randomSong = randomNum(0,songsData.songs.length)
    }
}
// songsData.songs.length 
//返回m-n的随机数
function randomNum(m, n) {
    return Math.round(Math.random() * (n - m) + m)
}