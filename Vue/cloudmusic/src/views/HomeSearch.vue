<template>
  <div>
    <form @submit.prevent="">
      <label for="">
        <img class="search-icon" src="@/assets/search.png" alt="" @click="getData(), getData2()" />
        <input class="search" type="text" placeholder="搜索歌曲、歌手、专辑" v-model="searchText" />
        <img
          v-if="searchText"
          class="clear-icon"
          src="@/assets/clear.png"
          alt=""
          @click="searchText = ''"
        />
      </label>
    </form>
    <div class="hot-list" v-if="!searchText">
      <h3>热门搜索</h3>
      <ul class="hot-search">
        <li v-for="(item, index) in hots" :key="index" @click="searchText = item.first">
          {{ item.first }}
        </li>
      </ul>
    </div>
    <section class="matchlist" v-if="all">
      <h3 v-if="all.mv || all.artist || all.album">最佳匹配</h3>
      <ul>
        <MatchItem v-if="all.mv" :mv="all.mv[0]"></MatchItem>
        <MatchItem v-if="all.artist" :artist="all.artist"></MatchItem>
        <MatchItem v-if="all.album" :album="all.album"></MatchItem>
      </ul>
    </section>
    <template v-if="Songs && searchText !== ''">
      <SongItem
        v-for="(item, index) in Songs"
        :key="index"
        :item="item"
        @currentItem="$emit('currentItem', $event)"
      ></SongItem>
    </template>
  </div>
</template>

<script>
import MatchItem from "@/components/MatchItem.vue";
import SongItem from "@/components/SongItem.vue";
export default {
  components: {
    MatchItem,
    SongItem
  },
  data() {
    return {
      searchText: "",
      hots: [],
      all: null,
      Songs: null
    };
  },
  watch: {
    searchText: function(v) {
      this.getData(v);
      this.getData2(v);
    }
  },
  methods: {
    getData(v = this.searchText) {
      this.axios
        .get("https://musicapi.leanapp.cn/search/multimatch", {
          params: {
            keywords: v
          }
        })
        .then(response => {
          window.console.log(response);
          this.all = response.data.result;
        });
    },

    getData2(v = this.searchText) {
      this.axios
        .get("http://music.kele8.cn/search", {
          params: {
            keywords: v
          }
        })
        .then(response => {
          window.console.log(response);
          this.Songs = response.data.result.songs;
        });
    }
  },
  created() {
    // this.axios.get("https://musicapi.leanapp.cn/search/hot").then(response => {
    //   window.console.log(response);
    //   ({ hots: this.hots } = response.data.result);
    // });
    this.myGet("hots", "https://musicapi.leanapp.cn/search/hot").then(res => {
      window.console.log(res);
      ({ hots: this.hots } = res.data.result);
    });
  }
};
</script>

<style lang="scss">
form {
  padding: 15px 10px;
  height: 60px;
  border-bottom: 1px solid rgb(241, 238, 238);
  label {
    position: relative;
    .search-icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 25px;
      padding-left: 5px;
    }
    .clear-icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 15px;
      height: 15px;
      margin-right: 5px;
      margin-top: 3px;
    }
    .search {
      width: 100%;
      height: 30px;
      outline: none;
      border: none;
      background: #ebecec;
      border-radius: 15px;
      padding-left: 30px;
      color: #333;
      &::-webkit-input-placeholder {
        color: rgb(177, 177, 177);
      }
    }
  }
}
.hot-list {
  padding: 15px 10px 0;
  ul.hot-search {
    overflow: hidden;
    margin: 10px 0 7px 0;
    li {
      float: left;
      border: 1px solid #d8d8d8;
      height: 32px;
      line-height: 32px;
      padding: 0 14px;
      margin: 0 8px 8px 0;
      border-radius: 17px;
      color: #333;
    }
  }
}
</style>
