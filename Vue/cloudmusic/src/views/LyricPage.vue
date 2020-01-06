<template>
  <div class="lrc" @click="$emit('change')">
    <div class="lyric-page">
      <ul class="ullrc">
        <li v-for="(item, index) in resolveLyric" :key="index">
          {{ item.text }}
        </li>
      </ul>
    </div>
    <div class="midline"></div>
  </div>
</template>

<script>
export default {
  props: ["resolveLyric"],
  data() {
    return {
      lrc: null,
      top:null
    };
  },
  watch: {
    lrc() {
      this.lrc.onmousedown = () => {
        this.lrc.onmousemove = () => {
          window.console.log(11111);
        };
      };
    }
  },
  mounted() {
    this.lrc = document.querySelector(".lrc");
    this.top = document.querySelector(".ullrc").marginTop
  }
};
</script>

<style lang="scss">
// 歌词
.lrc {
  height: 75vh;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  color: #888;
  text-align: center;
  .lyric-page {
    ul.ullrc {
      list-style: none;
      margin: 0;
      padding: 0;
      transition: 0.3s;
      font-family: "仿宋";
      li {
        height: 30px;
        line-height: 30px;
        transition: 0.3s;
        &.active {
          color: #fff;
          font-size: 1.2em;
          font-weight: bold;
        }
      }
    }
  }
  .midline {
    height: 1px;
    width: 100vw;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
  }
}
</style>
