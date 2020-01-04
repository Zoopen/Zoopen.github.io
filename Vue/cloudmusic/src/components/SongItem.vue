<template>
  <div
    class="song-item"
    @click="
      $emit('currentItem', { currentId: item.id, currentIndex: itemIndex });
      addSongList();
    "
  >
    <div class="left" v-if="index !== undefined">{{ index + 1 }}</div>
    <template v-if="!list">
      <div class="mid" v-if="item.song">
        <div class="song-title">{{ item.name }}</div>
        <div class="song-detail">
          <i class="sg"></i>{{ item.song.artists[0].name }}-{{ item.song.album.name }}
        </div>
      </div>
      <div class="mid" v-else-if="item.ar">
        <div class="song-title">{{ item.name }}</div>
        <div class="song-detail">
          <i v-if="$route.name !== 'playlist'" class="sg"></i>{{ item.ar[0].name }}-{{
            item.al.name
          }}
        </div>
      </div>
      <div class="mid" v-else>
        <div class="song-title">{{ item.name }}</div>
        <div class="song-detail">
          <i class="sg"></i>{{ item.artists[0].name }} - {{ item.album.name }}
        </div>
      </div>
      <div class="right"><img src="@/assets/play.png" alt="" /></div>
    </template>
    <template v-else>
      <div class="mid" v-if="item.song">
        <span class="song-name">{{ item.name }}</span>
        <span class="song-artist"> - {{ item.song.artists[0].name }}</span>
      </div>
      <div class="mid" v-else-if="item.ar">
        <span class="song-name">{{ item.name }}</span>
        <span class="song-artist"> - {{ item.ar[0].name }}</span>
      </div>
      <div class="mid" v-else>
        <span class="song-name">{{ item.name }}</span>
        <span class="song-artist"> -{{ item.artists[0].name }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["songList", "item", "index", "hot", "itemIndex", "list"],
  methods: {
    addSongList() {
      this.$setSongList("songList", this.songList);
    }
  },
  created() {
    window.console.log(this.$route);
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
.song-item {
  height: 50px;
  display: flex;
  .left {
    text-align: center;
    line-height: 50px;
    width: 40px;
  }
  .mid {
    flex: 1;
    padding: 6px;
    border-bottom: 1px solid rgb(207, 207, 207);
    .song-title {
      font-size: 17px;
      color: #333333;
      @include oneline();
    }
    .song-detail {
      font-size: 12px;
      color: #888888;
      @include oneline();
      .sg {
        background: url("../assets/index-icon.png");
        display: inline-block;
        width: 12px;
        height: 8px;
        margin-right: 4px;
        background-size: 166px 97px;
      }
    }
      @include oneline();
    .song-name{
      color: #fff;
      letter-spacing: 1px;
    }
    .song-artist{
      color: rgb(209, 207, 207);
      font-size: 12px;
      letter-spacing: 1px;
    }
  }
  .right {
    width: 40px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid rgb(207, 207, 207);
    img {
      width: 22px;
      vertical-align: middle;
    }
  }
}
</style>
