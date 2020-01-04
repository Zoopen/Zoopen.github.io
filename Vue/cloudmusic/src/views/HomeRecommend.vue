<template>
  <div>
    <HomeTitle>推荐歌单</HomeTitle>
    <RecommendSongList :recommendSongList="recommendSongList"></RecommendSongList>
    <HomeTitle>最新音乐</HomeTitle>
    <SongItem
      v-for="(item, index) in newSongs"
      :key="index"
      :item="item"
      :song-list="newSongs"
      :item-index="index"
      @currentItem="$emit('currentItem', $event)"
    ></SongItem>
  </div>
</template>

<script>
import HomeTitle from "@/components/HomeTitle.vue";
import RecommendSongList from "@/components/RecommendSongList.vue";
import SongItem from "@/components/SongItem.vue";

export default {
  components: {
    HomeTitle,
    RecommendSongList,
    SongItem
  },
  data: function() {
    return {
      recommendSongList: [],
      newSongs: []
    };
  },

  created() {
    // this.axios.get("https://musicapi.leanapp.cn/personalized?limit=6").then(response => {
    //   // window.console.log(response)
    //   ({ result: this.recommendSongList } = response.data);
    // });
    // this.axios.get("https://musicapi.leanapp.cn/personalized/newsong").then(response => {
    //   // window.console.log(response);
    //   ({ result: this.newSongs } = response.data);
    // });

    //封装的方法
    this.myGet("newSongs", "https://musicapi.leanapp.cn/personalized/newsong").then(res => {
      window.console.log(res);
      ({ result: this.newSongs } = res.data);
    });
    this.myGet("recommendSongList", "https://musicapi.leanapp.cn/personalized", {
      params: {
        limit: 6
      }
    }).then(res => {
      // window.console.log(res);
      ({ result: this.recommendSongList } = res.data);
    });
  }
};
</script>

<style></style>
