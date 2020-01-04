<template>
  <div id="app">
    <keep-alive>
      <router-view v-show="!isShowFullScreenPlayer" @currentItem="getId($event)" />
    </keep-alive>
    <Player
      :current-song-id="currentSongId"
      :current-song-index="currentSongIndex"
      @show="haddler($event)"
      @currentItem="getId($event)"
    ></Player>
  </div>
</template>
<script>
import Player from "@/views/Player.vue";
export default {
  components: {
    Player
  },
  data() {
    return {
      currentSongId: "",
      currentSongIndex: "",
      isShowFullScreenPlayer: false,
    };
  },

  methods: {
    haddler(b) {
      window.console.log(b);
      this.isShowFullScreenPlayer = b;
    },
    showPlayer() {
      this.isShowPlayer = true;
    },
    getId(obj) {
      window.console.log(obj);
      this.currentSongId = obj.currentId;
      this.currentSongIndex = obj.currentIndex;
     
    }
  },

};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
a {
  text-decoration: none;
}
</style>
