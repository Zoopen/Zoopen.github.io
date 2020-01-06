<template>
  <div class="singer" v-if="artist">
    <div class="go-back" @click="goBack">
        <img src="@/assets/left.png" alt="">
    </div>
    <div class="singer-header">
      <img :src="artist.picUrl" alt="" />
      <div class="artist-info">
        <p class="name">{{ artist.name }}</p>
      </div>
    </div>
    <!-- 标题 -->
    <SingerTitle>歌手简介</SingerTitle>
    <div class="description" :class="{ hide: hide }">
      <span class="desc-text">{{ artist.briefDesc }}</span>
      <div class="showallbtn">
        <i v-if="hide" @click="hide = false">完整歌手介绍<img src="@/assets/down.png" alt=""/></i>
        <i v-else @click="hide = true">收起<img src="@/assets/up.png" alt=""/></i>
      </div>
    </div>
    <SingerTitle>热门单曲</SingerTitle>
    <SongItem
      v-for="(item, index) in hotSongs"
      :key="index"
      :item="item"
      :index="index"
      :song-list="hotSongs"
      :item-index="index"
      @currentItem="$emit('currentItem', $event)"
    ></SongItem>
  </div>
</template>

<script>
import SingerTitle from "@/components/SingerTitle.vue";
import SongItem from "@/components/SongItem.vue";
export default {
  components: {
    SingerTitle,
    SongItem
  },
  data() {
    return {
      artist: null,
      hotSongs: null,
      hide: true
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getDetail(id) {
      this.axios
        .get("https://musicapi.leanapp.cn/artists", {
          params: {
            id: id
          }
        })
        .then(res => {
          window.console.log(res);
          ({ artist: this.artist } = res.data);
          ({ hotSongs: this.hotSongs } = res.data);
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    window.console.log(to, from);
    next(vm => {
      // window.console.log(vm);
      window.console.log(to);
      vm.getDetail(to.query.id);
    });
  }
};
</script>

<style lang="scss">
.singer {
  .go-back {
  }
  .singer-header {
      position: relative;
    img {
    }
    .artist-info {
      position: absolute;
      top: 50%;
      left: 10px;
      .name {
        color: #fff;
      }
    }
  }
  .description {
    font-size: 14px;
    // padding-bottom: 18px;
    padding: 0 16px 18px;
    position: relative;
    // display: -webkit-box;
    // -webkit-line-clamp: 2;
    // -webkit-box-orient: vertical;
    // overflow: hidden;
    color: #666;

    &.hide .desc-text {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .showallbtn {
      text-align: center;
      margin-top: 25px;
      i {
        //   position: absolute;
        //   bottom: 0;
        //   right: 0;
        font-style: normal;
        img {
          width: 15px;
          height: 15px;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
