<template>
  <div class="comment">
    <div class="left">
      <img :src="item.user.avatarUrl" alt="" />
    </div>
    <div class="right">
      <div class="header">
        <div class="meta">
          <div class="nickname">{{ item.user.nickname }}</div>
          <div class="comment-time">{{ item.time }}</div>
        </div>
        <div class="comment-like">
            <span class="likedCount" v-if="item.likedCount">{{ item.likedCount }}</span>
            <i><img src="@/assets/thumbs-up.png" alt=""></i>
        </div>
      </div>
      <div class="comment-content">
        <span class="comment-text">{{ item.content }}</span>
      </div>
      <div class="comment-replied" v-if="item.beReplied[0]">
        <span class="comment-replied-user">@{{ item.beReplied[0].user.nickname }}:  </span>
        <span class="comment-replied-text">{{ item.beReplied[0].content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    timeMaker(t) {
      var date = new Date(t); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      this.item.time = Y + M + D + h + m + s;
    }
  },
  updated(){
    // window.console.log(this.item)
    this.timeMaker(this.item.time);
  }
};
</script>

<style lang="scss">
.comment {
  display: flex;
  padding-top: 10px;
  border-bottom: 1px solid rgb(240, 239, 239);
  .left {
    width: 30px;
    height: 30px;
    margin: 0 10px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  .right {
    flex: 1;
    padding: 0 10px 10px 0;
    .header {
        position: relative;
      .meta {
        .nickname {
          font-size: 14px;
          color: #666;
        }
        .comment-time {
          font-size: 9px;
        }
      }
      .comment-like{
          position: absolute;
          top: 0;
          right: 0;
          height: 22px;
          .likedCount{
              display: inline-block;
              line-height: 22px;    
          }
          i{
              img{
                  width: 22px;
                  height: 22px;
                  vertical-align: text-bottom;
              }
          }
      }
    }
    .comment-content {
      margin-top: 5px;
      font-size: 15px;
      color: #333;
    }
    .comment-replied{
        font-size: 14px;
        color: #888;
    }
  }
}
</style>
