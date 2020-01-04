<template>
  <div class="recommend-songlist-item" @click="$router.push({path:'playlist',query:{id:item.id}})">
      <div class="rec-Img">
          <img :src="item.picUrl" alt="">
          <span>{{item.playCount}}</span>
      </div>
      <div class="rec-text">{{item.name}}</div>
  </div>
</template>

<script>
export default {
    props:['item'],
    methods: {
        translatePlayCount(n){
            if(n>99999999){
                return (n/100000000).toFixed(2)+'亿'
            }else if(n>9999){
                return (n/10000).toFixed(1)+'万'
            }
        }

    },
    created() {
        this.item.playCount = this.translatePlayCount(this.item.playCount)
    },
}
</script>

<style>

</style>