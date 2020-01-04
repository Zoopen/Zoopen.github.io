<template>
  <div
    class="player"
    :class="{ paused: isPaused, active: isShowFullScreenPlayer }"
    v-if="currentSongDetail"
  >
    <audio v-if="currentSongId" :src="currentSongUrl" controls autoplay></audio>
    <div class="player-bar" @click="showFullScreen">
      <img class="pic" :src="currentSongDetail.al.picUrl" alt />
      <h3>{{ currentSongDetail.name }}</h3>
      <span class="progress" @click.stop="pausedAudio">
        <canvas width="36" height="36"></canvas>
        <i class="control-btn" v-if="!isPaused"><img src="@/assets/pause.png" alt=""/></i>
        <i class="control-btn2" v-else><img src="@/assets/play2.png" alt=""/></i>
      </span>
    </div>
    <template>
      <!-- <template v-if="isShowFullScreenPlayer"> -->
      <div class="player-fullscreen">
        <div
          class="player-fullscreen-mask"
          :style="{ 'background-image': `url(${currentSongDetail.al.picUrl})` }"
        ></div>
        <div class="player-fullscreen-content">
          <!-- 头部 -->
          <div class="player-fullscreen-content-top">
            <i class="pull-btn" @click="showFullScreen"><img src="@/assets/pull.png" alt=""/></i>
            <div class="song-name">
              <div>{{ currentSongDetail.name }}</div>
              <div v-if="currentSongDetail.song">
                {{ currentSongDetail.song.artists[0].name }}
              </div>
              <div v-else-if="currentSongDetail.ar">{{ currentSongDetail.ar[0].name }}</div>
              <div v-else>{{ currentSongDetail.artists[0].name }}</div>
            </div>
            <div class="nothing"></div>
          </div>
          <!-- 中间 -->
          <div class="player-fullscreen-content-middle">
            <!-- 唱片 -->
            <div class="music-player-disc">
              <!-- 唱片图片 -->
              <div class="music-player-image">
                <img class="disc_default" src="@/assets/disc_default.png" alt="" />
                <img class="disc" src="@/assets/disc.png" alt="" />
                <img class="disc_light" src="@/assets/disc_light.png" alt="" />
                <img class="disc_pic" :src="currentSongDetail.al.picUrl" alt="" />
              </div>
              <!-- 指针 -->
              <div class="music-player-pointer">
                <img src="@/assets/needle.png" alt="" />
              </div>
            </div>
            <div class="player-control-btn">
              <div class="player-control-btn-content">
                <div class="like">
                  <img src="@/assets/like.png" alt="" />
                </div>
                <div class="download">
                  <img src="@/assets/download.png" alt="" />
                </div>
                <div class="msg">
                  <img src="@/assets/msg.png" alt="" />
                </div>
                <div class="more">
                  <img src="@/assets/more.png" alt="" />
                </div>
              </div>
            </div>
          </div>

          <!-- 底部 -->
          <div class="player-fullscreen-content-bottom">
            <!-- 歌曲播放进度条 -->
            <div class="player-control-progress">
              <div class="player-song-timeProgress nowTime">{{ nowTime }}</div>
              <div class="player-song-progress progress">
                <label for="">
                  <!-- <input type="range" v-model="value" @input="setCurrent" /> -->
                  <input
                    type="range"
                    :max="currentSongDetail.dt / 1000"
                    v-model="currentTime"
                    @input="setCurrent"
                  />
                  <div class="progress-bar">
                    <div class="back" :style="{ width: `${cu}%` }"></div>
                    <div class="pointer" :style="{ left: `${cu}%` }"></div>
                  </div>
                </label>
              </div>
              <div class="player-song-timeProgress totalTime">{{ totalTime }}</div>
            </div>
            <!-- 播放按钮 -->
            <div class="player-fullscreen-controler">
              <div class="player-fullscreen-controler-btn">
                <div class="controler-mode" @click="changeMode">
                  <img :src="mode[currentModeIndex].imgUrl" alt="" />
                </div>
                <div class="controler-prev" @click="prevSong">
                  <img src="@/assets/prev.png" alt="" />
                </div>
                <div class="controler-play" @click.stop="pausedAudio">
                  <img v-if="!isPaused" src="@/assets/pause2.png" alt="" />
                  <img v-else src="@/assets/play3.png" alt="" />
                </div>
                <div class="controler-next" @click="nextSong">
                  <img src="@/assets/next.png" alt="" />
                </div>
                <div class="controler-list" @click="isShowSongList = true">
                  <img src="@/assets/playlist.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <!-- 歌单 -->
          <SongListPage
            :song-list="songList"
            :song-index="songindex"
            :current-mode-index="currentModeIndex"
            :mode="mode"
            :song-list-length="songListLength"
            :is-active="isShowSongList"
            @closeSongList="isShowSongList = false"
            @currentItem="$emit('currentItem', $event)"
          ></SongListPage>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import SongListPage from "@/views/SongListPage.vue";
export default {
  components: {
    SongListPage
  },
  props: ["currentSongId", "currentSongIndex"],
  data() {
    return {
      currentSongDetail: null,
      durationTime: null,
      totalTime: null,
      isShowFullScreenPlayer: false,
      isPaused: false,
      currentTime: 0,
      nowTime: null,
      animateId: null,
      songList: null,
      songListLength: null,
      songId: this.currentSongId,
      songindex: this.currentSongIndex,
      isShowSongList: false,
      currentModeIndex: 0,
      mode: [
        {
          modeName: "列表循环",
          imgUrl: require("@/assets/listCycle.png")
        },
        {
          modeName: "单曲循环",
          imgUrl: require("@/assets/singleCycle.png")
        },
        {
          modeName: "随机播放",
          imgUrl: require("@/assets/randomPlay.png")
        }
      ],
      value: 0
    };
  },
  computed: {
    currentSongUrl() {
      return "https://music.163.com/song/media/outer/url?id=" + this.songId + ".mp3";
    },
    cu() {
      return (this.currentTime / this.durationTime) * 100;
    }
  },
  methods: {
    setCurrent() {
      let audio = this.$el.querySelector("audio");
      audio.currentTime = this.currentTime;
    },
    randomNum(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    changeMode() {
      this.currentModeIndex = this.currentModeIndex >= 2 ? 0 : ++this.currentModeIndex;
      this.playMode(this.currentModeIndex);
    },
    playMode(i) {
      let audio = this.$el.querySelector("audio");
      if (i == 1) {
        audio.loop = true;
      }
      if (i == 2) {
        //随机播放
        audio.loop = false;
      }
      if (i == 3) {
        audio.loop = false;
      }
    },
    prevSong() {
      this.songIndex = this.songindex <= 0 ? 0 : --this.songindex;
      this.songId = this.songList[this.songIndex].id;
    },
    nextSong() {
      if (this.currentModeIndex == 0) {
        this.songIndex =
          this.songindex >= this.songList.length - 1 ? this.songList.length - 1 : ++this.songindex;
      } else if (this.currentModeIndex == 2) {
        let x = this.randomNum(0, this.songList.length);
        if (this.songIndex == x) {
          return this.nextSong();
        } else {
          this.songIndex = x;
        }
      }

      window.console.log(this.songList[this.songIndex]);
      this.songId = this.songList[this.songIndex].id;
    },
    showFullScreen() {
      this.isShowFullScreenPlayer = !this.isShowFullScreenPlayer;
      this.$emit("show", this.isShowFullScreenPlayer);
    },
    getSongDetail() {
      this.axios
        .get(" https://musicapi.leanapp.cn/song/detail", {
          params: {
            ids: this.songId
          }
        })
        .then(response => {
          window.console.log(response);
          this.currentSongDetail = response.data.songs[0];
          this.durationTime = this.currentSongDetail.dt / 1000;
        });
    },
    getSongList() {
      // songList
      this.songList = JSON.parse(localStorage.getItem("songList")).data;
      this.songListLength = this.songList.length;
    },
    pausedAudio() {
      let audio = this.$el.querySelector("audio");

      if (this.isPaused) {
        audio.play();
      } else {
        audio.pause();
      }
      this.isPaused = audio.paused;
    },
    drawCircleProgress() {
      let audio = this.$el.querySelector("audio");

      let canvas = this.$el.querySelector("canvas");
      let ctx = canvas.getContext("2d");

      let id = window.setInterval(() => {
        if (audio.ended && this.currentModeIndex !== 1) {
          this.nextSong();
        }
        window.console.log("dd");
        this.currentTime = audio.currentTime;

        ctx.clearRect(0, 0, 36, 36);

        ctx.beginPath();
        ctx.arc(18, 18, 17, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.strokeStyle = "#ccc";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(
          18,
          18,
          17,
          -0.5 * Math.PI,
          2 * Math.PI * (this.currentTime / this.durationTime) - 0.5 * Math.PI
        );
        ctx.strokeStyle = "#42b983";
        ctx.stroke();
      }, 1000);
      return id;
    }
  },
  watch: {
    currentTime() {
      this.value = (this.currentTime / this.durationTime) * 100;
      var nm =
        parseInt(this.currentTime / 60) < 10
          ? "0" + parseInt(this.currentTime / 60)
          : parseInt(this.currentTime / 60);
      var ns =
        parseInt(this.currentTime % 60) < 10
          ? "0" + parseInt(this.currentTime % 60)
          : parseInt(this.currentTime % 60);
      let nowTime = nm + ":" + ns;
      this.nowTime = nowTime;
    },
    durationTime() {
      var tm =
        parseInt(this.durationTime / 60) < 10
          ? "0" + parseInt(this.durationTime / 60)
          : parseInt(this.durationTime / 60);
      var ts =
        parseInt(this.durationTime % 60) < 10
          ? "0" + parseInt(this.durationTime % 60)
          : parseInt(this.durationTime % 60);
      let totalTime = tm + ":" + ts;
      window.console.log(totalTime);
      this.totalTime = totalTime;
    },
    songId() {
      this.getSongDetail();
    },
    currentSongId: function(v) {
      this.songId = v;
      this.getSongDetail();
      this.getSongList();
    },
    currentSongIndex: function(v) {
      this.songIndex = v;
    },
    isPaused() {
      if (this.isPaused) {
        window.clearInterval(this.animateId);
      } else {
        window.clearInterval(this.animateId);
        this.animateId = this.drawCircleProgress();
      }
    },
    currentSongDetail() {
      // 第一次进入 后面每次更新
      this.$nextTick(() => {
        window.console.log("xxxxxxxxxxx", this);
        window.clearInterval(this.animateId);
        this.animateId = this.drawCircleProgress();
      });
    }
  },
  created() {
    // this.getSongDetail();
  },
  updated() {
    // this.setCurrent();
  }
};
</script>

<style lang="scss">
@mixin oneline {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.player {
  position: fixed;
  bottom: -100vh;
  left: 0;
  width: 100%;
  //   height: 60px;
  transition: all 0.6s;
  &.active {
    bottom: 0;
  }
  audio {
    height: 60px;
  }
  .player-bar {
    display: flex;
    border-top: 1px solid lightgray;
    background: rgba(255, 255, 255, 0.95);
    padding: 7px 10px;
    line-height: 36px;
    img.pic {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      animation: myrolling 20s linear infinite;
    }
    @keyframes myrolling {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
    @keyframes myrolling2 {
      from {
        transform: translate(-50%, -50%) rotate(0);
      }
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
    h3 {
      flex: 1;
      margin: 0 10px;
    }
    .progress {
      width: 36px;
      height: 36px;
      //   background: yellow;
      position: relative;

      text-align: center;
      i.control-btn {
        position: absolute;
        top: 3px;
        left: 0;
        width: 36px;
        height: 36px;
        img {
          width: 30px;
          height: 30px;
        }
      }
      i.control-btn2 {
        position: absolute;
        top: 3px;
        left: 2px;
        width: 36px;
        height: 36px;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
  &.paused {
    .player-bar {
      img {
        animation-play-state: paused;
      }
    }
    .player-fullscreen {
      .player-fullscreen-content {
        .player-fullscreen-content-middle {
          .music-player-disc {
            .music-player-image {
              .disc_light {
                animation-play-state: paused;
              }
              .disc_pic {
                animation-play-state: paused;
              }
            }
            .music-player-pointer {
              transform: rotate(-25deg);
            }
          }
        }
      }
    }
  }

  .player-fullscreen {
    width: 100vw;
    height: 100vh;
    position: relative;
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #333;
      z-index: -1;
    }
    .player-fullscreen-mask {
      background-size: cover;
      background-position: center;
      width: 100%;
      height: 100%;
      filter: blur(20px); /*高斯模糊*/
      opacity: 0.4; /*设置透明度就可以看到它下面的黑色遮罩层*/
    }
    .player-fullscreen-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9;
      // padding-top: 63px;
      // 顶部-----------------------------------------------------
      .player-fullscreen-content-top {
        position: relative;
        z-index: 999;
        height: 8vh;
        display: flex;
        align-items: center;
        background-color: #151414;
        color: #fff;

        .pull-btn {
          width: 32px;
        }
        .song-name {
          text-align: center;
          flex: 1;
          font-family: "宋体";
          div {
            &:nth-child(1) {
              color: #fff;
              @include oneline();
            }
            &:nth-child(2) {
              color: rgb(150, 149, 149);
              font-size: 12px;
              @include oneline();
            }
          }
        }
        .nothing {
          width: 32px;
        }
      }
      //中间-----------------------------------------------------------
      .player-fullscreen-content-middle {
        height: 75vh;
        position: relative;
        .music-player-disc {
          height: 68vh;
          .music-player-image {
            width: 248px;
            height: 248px;
            position: absolute;
            top: 73px;
            left: 50%;
            transform: translate(-50%);
            .disc_default {
              border-radius: 50%;
            }
            .disc {
              position: absolute;
              top: 0;
              left: 0;
            }
            .disc_light {
              position: absolute;
              top: 0;
              left: 0;
              animation: myrolling 20s linear infinite;
            }
            .disc_pic {
              width: 184px;
              height: 184px;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              animation: myrolling2 20s linear infinite;
            }
          }
          .music-player-pointer {
            position: absolute;
            top: 0px;
            left: 45%;
            z-index: 5;
            width: 84px;
            height: 122px;
            transform-origin: top left;
            transition: all 0.6s;
          }
        }
        //按钮
        .player-control-btn {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100vw;
          padding: 0 20px;
          height: 7vh;
          .player-control-btn-content {
            display: flex;
            text-align: center;
            .like {
              flex: 1;
            }
            .download {
              flex: 1;
            }
            .msg {
              flex: 1;
            }
            .more {
              flex: 1;
            }
          }
        }
      }

      //------------------------------------底部
      .player-fullscreen-content-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 17vh;
        //进度条
        .player-control-progress {
          width: 100vw;
          padding: 0 15px;
          display: flex;
          .progress {
            flex: 1;
            label {
              position: relative;
              display: inline-block;
              height: 30px;
              width: 100%;
              input {
                width: 100%;
                opacity: 0;
                height: 30px;
              }
              .progress-bar {
                height: 5px;
                width: 100%;
                background: gray;
                position: absolute;
                top: 12px;
                left: 0;
                .back {
                  width: 10%;
                  height: 100%;
                  background: rgb(219, 219, 219);
                  transition: all 0.3s;
                }
                .pointer {
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  background: white;
                  position: absolute;
                  top: -2px;
                  left: 10%;
                  cursor: pointer;
                  pointer-events: none;
                  transition: all 0.3s;
                }
              }
            }
          }
          .player-song-timeProgress {
            font-size: 12px;
            color: lightgray;
            // margin-top: 5px;
            padding: 0 3px;
            // background: rgba(0, 0, 0, 0.3);
            border-radius: 5px;
            height: 30px;
            line-height: 30px;
          }

          .nowTime {
            // float: left;
            width: 37px;
          }

          .totalTime {
            // float: right;
            width: 37px;
          }
        }
        //底部控制按钮
        .player-fullscreen-controler {
          color: white;
          .player-fullscreen-controler-btn {
            display: flex;
            width: 100vw;
            height: 60px;
            text-align: center;
            align-items: center;
            .controler-mode {
              flex: 1;
            }
            .controler-prev {
              flex: 1;
            }
            .controler-play {
              flex: 1;
            }
            .controler-next {
              flex: 1;
            }
            .controler-list {
              flex: 1;
            }
          }
        }
      }
    }
  }
}
</style>
