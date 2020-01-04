<template>
  <div class="recommend-songlist">
    <RecommendSongListItem
      v-for="(item, index) in recommendSongList"
      :key="index"
      :item="item"
    ></RecommendSongListItem>
  </div>
</template>

<script>
import RecommendSongListItem from "@/components/RecommendSongListItem.vue";
export default {
  props: ["recommendSongList"],
  components: {
    RecommendSongListItem
  }
};
</script>

<style lang="scss">
.recommend-songlist {
  display: flex;
  flex-wrap: wrap;
  .recommend-songlist-item {
    flex: 1 0 30%;
    &:nth-child(3n+2){
        margin: 0 3px;
    }
    .rec-Img {
      position: relative;
      img {
        vertical-align: middle;
      }
      span {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 12px;
        color: #fff;
      }
    }
    .rec-text {
      padding: 6px 2px 0 6px;
      font-size: 14px;
      margin-bottom: 10px;
      //以下让文字两行显示 多的隐藏出现...
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}
</style>
