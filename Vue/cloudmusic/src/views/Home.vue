<template>
  <div class="home">
    <div class="header">
      <div class="banner">
        <div class="logo">
          <img src="@/assets/logo.png" alt="" />
        </div>
        <div class="titleName">云音乐</div>
      </div>
      <ul id="nav">
        <li><router-link to="/recommend">推荐音乐</router-link></li>
        <li><router-link to="/hot">热歌榜</router-link></li>
        <li><router-link to="/search">搜索</router-link></li>
      </ul>
    </div>
    <keep-alive>
      <router-view class="main" @currentItem="$emit('currentItem', $event)"></router-view>
    </keep-alive>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {}
};
</script>
<style lang="scss">
.header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
  .banner {
    height: 100px;
    width: 100%;
    background: #151414;
    display: flex;
    align-items: center;
    padding: 0 15px;
    .logo {
      width: 32px;
      height: 32px;
      background: #fff;
      border-radius: 50%;
      margin-right: 5px;
    }
    .titleName{
      color: #fff;
      font-family: '宋体';
      font-size:26px;
      font-weight: bold;
    }
  }
  #nav {
    display: flex;
    border-bottom: 1px solid lightgray;
    width: 100vw;
    background: #fff;

    li {
      flex: 1;
      text-align: center;
      height: 40px;
      a {
        font-weight: bold;
        line-height: 40px;
        display: inline-block;
        color: #2c3e50;
        &.router-link-exact-active {
          color: #42b983;
          border-bottom: 2px solid#42b983;
        }
      }
    }
  }
}
.main {
  // margin-top: 40px;
}
</style>
