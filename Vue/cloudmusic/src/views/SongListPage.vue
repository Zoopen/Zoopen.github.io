<template>
  <div class="song-list-page" :class="{active:isActive}">
    <div class="song-list-page-title">
      <div class="song-list-page-title-mode">
        <div class="left">
          <img :src="mode[currentModeIndex].imgUrl" alt="" />
          <span>{{ mode[currentModeIndex].modeName }}</span>
          <span>({{ songListLength }})</span>
        </div>
        <span class="close" @click="$emit('closeSongList')">✖</span>
      </div>
    </div>
    <SongItem
      v-for="(item, index) in songList"
      :key="index"
      :item="item"
      :song-list="songList"
      :item-index="songIndex"
      :list="list"
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
  props: ["songList", "songIndex", "mode", "currentModeIndex", "songListLength","isActive"],
  data() {
    return {
      list: true
    };
  }
};
</script>

<style lang="scss">
.song-list-page {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 0;
  overflow-y: scroll;
  background: rgb(22, 22, 22);
  color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  transition: all .6s;
  &.active {
    height: 70vh;
  }
  .song-list-page-title {
    position: sticky;
    top: 0;
    left: 0;
    height: 45px;
    // line-height: 45px;
    width: 100vw;
    background: rgb(22, 22, 22);
    padding: 5px;
    border-bottom: 1px solid rgb(87, 87, 87);
    .song-list-page-title-mode {
      //   height: 45px;
      //   line-height: 45px;
      display: flex;
      align-items: center;
      .left {
        flex: 1;
        img {
          vertical-align: middle;
          margin-right: 5px;
        }
      }

      .close {
        width: 22px;
        text-align: center;
      }
    }
  }
  .song-item {
    height: 35px;
    line-height: 30px;
    .mid {
      border-bottom: 1px solid rgb(87, 87, 87);
    }
  }
}
</style>
