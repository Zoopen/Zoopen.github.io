<template>
  <div>
    <!-- 唱片 -->
    <div class="music-player-disc" @click="$emit('change')">
      <!-- 唱片图片 -->
      <div class="music-player-image">
        <img class="disc_default" src="@/assets/disc_default.png" alt="" />
        <img class="disc" src="@/assets/disc.png" alt="" />
        <img class="disc_light" src="@/assets/disc_light.png" alt="" />
        <img class="disc_pic" :src="currentSongDetail.al.picUrl" alt="" />
      </div>
      <!-- 指针 -->
      <div class="music-player-pointer">
        <img src="@/assets/needle.png" alt="" />
      </div>
    </div>
    <div class="player-control-btn">
      <div class="player-control-btn-content">
        <div class="like">
          <img src="@/assets/like.png" alt="" />
        </div>
        <div class="download">
          <img src="@/assets/download.png" alt="" />
        </div>
        <div class="msg">
          <img src="@/assets/msg.png" alt="" />
        </div>
        <div class="more">
          <img src="@/assets/more.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props:["currentSongDetail"]
};
</script>

<style></style>
