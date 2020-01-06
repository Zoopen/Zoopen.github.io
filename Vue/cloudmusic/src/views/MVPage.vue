<template>
  <div class="mvpage" v-if="mvdata">
    <div class="mv-box">
      <video :src="mvUrl" controls></video>
    </div>
    <div class="mv-wrap">
      <div class="go-back" @click="$router.go(-1)">
        ←
      </div>
      <div class="mv-title">
        <div class="tt"><span>MV</span>{{ mvdata.name }}</div>
        <div
          class="singer"
          @click="$router.push({ path: 'singerpage', query: { id: mvdata.artists[0].id } })"
        >
          歌手: {{ mvdata.artistName }}
        </div>
        <div class="info">
          <span class="time">发布时间: {{ mvdata.publishTime }}</span>
          <span class="played">播放: {{ playCount }}</span>
        </div>
      </div>
      <div class="listTitle">
        相关推荐
      </div>
      <div class="listTitle">
        精彩评论
      </div>
      <Comment v-for="(item, index) in hotComments" :key="'hc' + index" :item="item"></Comment>
      <Comment v-for="(item, index) in comments" :key="'c' + index" :item="item"></Comment>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
export default {
  components: {
    Comment
  },
  data() {
    return {
      mvdata: null,
      hotComments: null,
      comments: null
    };
  },
  computed: {
    mvUrl() {
      return this.mvdata.brs[240];
    }
  },
  methods: {
    getDetail(id) {
      window.console.log(id);
      this.axios
        .get("https://musicapi.leanapp.cn/mv", {
          params: {
            mvid: id
          }
        })
        .then(res => {
          window.console.log(res);
          this.mvdata = res.data.data;
          this.playCount = this.translatePlayCount(this.mvdata.playCount);
        });
    },
    getMvComment(id) {
      this.axios
        .get(" https://musicapi.leanapp.cn/comment/mv", {
          params: {
            id: id
          }
        })
        .then(res => {
          window.console.log(res);
          this.hotComments = res.data.hotComments;
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
      window.console.log(to);
      vm.getDetail(to.query.id);
      vm.getMvComment(to.query.id);
    });
  }
};
</script>

<style lang="scss">
.mvpage {
  .mv-box {
    background: #000;
    position: sticky;
    top: 0;
    left: 0;
    video {
      height: 30vh;
      width: 100vw;
      vertical-align: middle;
    }
  }
  .mv-wrap {
    height: 70vh;
    overflow-y: scroll;
    .go-back{
        margin-left: 10px;
    }
    .mv-title {
      padding: 0 10px 12px;
      .tt {
        font-size: 18px;
        color: #333;

        span {
          color: #d33a31;
          border: 1px solid #d33a31;
          font-size: 12px;
          margin-right: 5px;
          height: 24px;
          line-height: 24px;
        }
      }
      .singer {
        margin: 11px 0;
        color: #507daf;
      }
      .info {
        font-size: 13px;
        color: #999;
        .time {
          padding-right: 15px;
        }
        .played {
          margin-left: 15px;
        }
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
