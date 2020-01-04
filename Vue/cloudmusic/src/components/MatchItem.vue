<template>
  <li class="matchitem">
    <template v-if="mv">
      <div class="mv">
        <div class="left">
          <img :src="mv.cover" alt="" />
        </div>
        <article class="mid">
          <h4 class="describe">
            MV:
            <span>{{ mv.name }}</span
            ><span v-if="mv.alia">({{ mv.alia[0] }})</span>
          </h4>
          <p>许嵩</p>
        </article>
        <div class="right">
          <i><img src="@/assets/right.png" alt=""></i>
        </div>
      </div>
    </template>
    <template v-else-if="artist">
      <div class="artist">
        <div class="left">
          <img :src="artist[0].img1v1Url" alt="" />
        </div>
        <article class="mid">
          <h4 class="describe">
            歌手:
            <span>{{ artist[0].name }}</span
            ><span v-if="artist[0].alia">({{ artist[0].alia[0] }})</span>
          </h4>
        </article>
        <div class="right">
          <i><img src="@/assets/right.png" alt=""></i>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="album" @click="getAlbumDetail(album[0].id)">
        <div class="left">
          <img :src="album[0].blurPicUrl" alt="" />
        </div>
        <article class="mid">
          <h4 class="describe">
            专辑:
            <p>
              <span>{{ album[0].name }}</span
              ><span v-if="album[0].alia">{{ album[0].alia[0] }}</span>
            </p>
          </h4>
          <p>{{ album[0].artists[0].name }}</p>
        </article>
        <div class="right">
          <i><img src="@/assets/right.png" alt=""></i>
        </div>
      </div>
    </template>
  </li>
</template>

<script>
export default {
  props: ["mv", "artist", "album"],
  methods: {
    getAlbumDetail(id){
      this.axios.get("https://musicapi.leanapp.cn/album",{
        params:{
          id:id
        }
      }).then(res=>{
        window.console.log(res)
      })
    } 
  },
};
</script>

<style lang="scss">
 @mixin same(){
      display: flex;
    .left {
      margin-right: 15px;
      width: 50px;
      height: 50px;
      img {
        width: 89px;
        height: 50px;
        display: block;
      }
    }
    article.mid {
      flex: 1;
      h4 {
        line-height: 30px;
        display: flex;
        span {
          line-height: 30px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
      p {
        font-size: 12px;
      }
    }
    .right {
      i {
        line-height: 50px;
        img{
          width: 22px;
        }
      }
    }
  }
li.matchitem {
  margin-left: 10px;
  padding: 8px 10px 8px 0;
  border-bottom: 1px solid lightgray;
  .mv {
    @include same();
    .left {
      margin-right: 15px;
      width: 89px;
      height: 50px;
      img {
        width: 89px;
        height: 50px;
        display: block;
      }
    }
   
  }
 
  .artist {
    @include same()
  }
  .album{
    @include same()
  }
}
</style>
