<template>
  <div>
    <div class="hot-header">
      <div class="hot-icon"></div>
      <div class="hot-time">更新日期: 12月26日</div>
    </div>
    <SongItem
      v-for="(item, index) in tracks"
      :key="index"
      :item="item"
      :index="index"
      :song-list="tracks"
      :item-index="index"
      @currentItem="$emit('currentItem', $event)"
    ></SongItem>
  </div>
</template>

<script>
import SongItem from "@/components/SongItem.vue";
export default {
  components: {
    SongItem
  },
  data() {
    return {
      tracks: [],
      date: null
    };
  },
  created() {
    // this.axios.get("https://musicapi.leanapp.cn/top/list?idx=1").then(response => {
    //   // window.console.log(response)
    //   ({ tracks: this.tracks } = response.data.playlist);
    // });
    this.myGet("tracks", "https://musicapi.leanapp.cn/top/list", {
      params: {
        idx: 1
      }
    }).then(res => {
      window.console.log(res);
      ({ tracks: this.tracks } = res.data.playlist);
    });
  }
};
</script>

<style lang="scss">
.hot-header {
  background: url("../assets/hot-music-bg.jpg");
  background-position: center;
  width: 100%;
  height: 124px;
  padding-left: 20px;
  padding-top: 10px;
  .hot-icon {
    width: 142px;
    height: 67px;
    background: url("../assets/index-icon.png");
    background-size: 166px 97px;
    background-position: -24px -30px;
  }
  .hot-time {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 10px;
  }
}
</style>
