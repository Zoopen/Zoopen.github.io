<template>
  <div class="playlist" v-if="playlist">
    <div class="go-back" @click="goBack">←</div>
    <div class="playlist-header">
      <div class="left">
        <div class="cover">
          <img :src="playlist.coverImgUrl" alt="" />
          <span>{{ playlist.playCount }}</span>
        </div>
      </div>
      <div class="right">
        <div class="name">{{ playlist.name }}</div>
        <div class="author">
          <div class="touxiang">
            <img :src="creator.avatarUrl" alt="" />
          </div>
          <div class="nickname">
            {{ creator.nickname }}
          </div>
        </div>
      </div>
    </div>
    <div class="playlist-intro">
      <div class="tags">
        标签:<Tag v-for="(item, index) in tags" :key="index" :item="item"></Tag>
      </div>
      <div class="description" :class="{hide:hide}">
        <span class="desc-text">简介:{{ playlist.description }}</span>
        <i v-if="hide" @click="hide=false"><img src="@/assets/down.png" alt=""/></i>
        <i v-else @click="hide=true"><img src="@/assets/up.png" alt=""/></i>
      </div>
    </div>

    <div class="listTitle">
      歌曲列表
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
    <div class="listTitle">
      精彩评论
    </div>
    <Comment v-for="(item, index) in comments" :key="'c' + index" :item="item"></Comment>
    <!-- <Comment :item="comments"></Comment> -->
  </div>
</template>

<script>
import SongItem from "@/components/SongItem.vue";
import Tag from "@/components/Tag.vue";
import Comment from "@/components/Comment.vue";
export default {
  name:"playlist",
  components: {
    SongItem,
    Tag,
    Comment
  },
  data() {
    return {
      playlist: null,
      tracks: [],
      subscribers: [],
      creator: null,
      tags: [],
      comments: null,
      hide:true
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getDetail(id) {
      this.myGet("detail" + id, "https://musicapi.leanapp.cn/playlist/detail", {
        params: {
          id: id
        }
      }).then(res => {
        window.console.log(res);
        ({ playlist: this.playlist } = res.data);
        ({ tracks: this.tracks } = res.data.playlist);
        ({ subscribers: this.subscribers } = res.data.playlist);
        ({ creator: this.creator } = res.data.playlist);
        ({ tags: this.tags } = res.data.playlist);
        this.playlist.playCount = this.translatePlayCount(this.playlist.playCount);
      });
      // this.axios
      //   .get("https://musicapi.leanapp.cn/playlist/detail", {
      //     params: {
      //       id: id
      //     }
      //   })
      //   .then(response => {
      //     // window.console.log(response)
      //     ({ playlist: this.playlist } = response.data);
      //     ({ tracks: this.tracks } = response.data.playlist);
      //     ({ subscribers: this.subscribers } = response.data.playlist);
      //     ({ creator: this.creator } = response.data.playlist);
      //     ({ tags: this.tags } = response.data.playlist);
      //     this.playlist.playCount = this.translatePlayCount(this.playlist.playCount);
      //   });
    },
    getComment(id) {
      this.axios.get("https://musicapi.leanapp.cn/comment/playlist?id=" + id).then(res => {
        window.console.log(res);
        this.comments = res.data.comments;
      });
    },
    translatePlayCount(n) {
      if (n > 99999999) {
        return (n / 100000000).toFixed(2) + "亿";
      } else if (n > 9999) {
        return (n / 10000).toFixed(1) + "万";
      }
    }
  },

  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    window.console.log(to, from);
    next(vm => {
      // window.console.log(vm);
      vm.getDetail(to.query.id);
      vm.getComment(to.query.id);
    });
  }
};
</script>

<style lang="scss">
.go-back {
  // background: #42b983;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  color: #fff;
}
.playlist-header {
  padding: 30px 10px 30px 15px;
  display: flex;
  background-color: rgba(0, 0, 0, 0.384);
  position: relative;
  .left {
    // width: 126px;
    position: relative;
    .cover {
      width: 126px;
      img {
        vertical-align: middle;
      }
      span {
        color: #fff;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  .right {
    margin-left: 16px;
    flex: 1 1 auto;
    .name {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-weight: bolder;
      color: #fefefe;
      font-size: 17px;
    }
    .author {
      display: flex;
      margin-top: 20px;
      height: 30px;
      .touxiang {
        // line-height: 30px;
        width: 30px;
        img {
          vertical-align: middle;
          border-radius: 50%;
        }
      }
      .nickname {
        flex: 1;
        margin-left: 5px;
        line-height: 30px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
}
.playlist-intro {
  margin: 0 10px 0 15px;
  color: #666;
  .tags {
    line-height: 20px;
    font-size: 14px;
    margin: 10px 0;
    .tag {
      font-size: 12px;
      margin: 0 5px;
      padding: 1px 8px;
      border: 1px solid lightgray;
      border-radius: 10px;
    }
  }
  .description {
    font-size: 14px;
    padding-bottom: 18px;
    position: relative;
    // display: -webkit-box;
    // -webkit-line-clamp: 2;
    // -webkit-box-orient: vertical;
    // overflow: hidden;
    &.hide .desc-text {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    i{
      position: absolute;
      bottom: 0;
      right: 0;
      img{
        width: 15px;
        height: 15px;
      }
    }
  }
}
.listTitle {
  font-size: 14px;
  color: #666;
  background: #eeeff0;
  padding-left: 15px;
}
</style>
