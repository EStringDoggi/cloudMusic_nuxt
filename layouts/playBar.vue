<template>
  <div>
    <div class="top">
      <!-- 返回按钮 -->
      <div class="goback" @click="navBack">
        <Icon type="md-arrow-back" />
      </div>
    </div>
    <nuxt />
    <!-- 播放器条 -->
    <div class="playBar">
      <!-- 专辑封面 -->
      <div class="pic">
        <img src alt />
      </div>
      <!-- 音乐名称 & 艺人-->
      <div class="text">
        <div class="song-name">音乐名称</div>
        <div class="artist-name">艺人</div>
      </div>
      <!-- 播放按钮 -->
      <div class="icon-btn">
        <svg class="icon-md" aria-hidden="true" v-if="!isPlay" @click="playControl">
          <use xlink:href="#icon-bofang" />
        </svg>
        <svg class="icon-md" aria-hidden="true" v-else @click="playControl">
          <use xlink:href="#icon-zanting" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlay: false
    };
  },
  methods: {
    playControl: function() {
      this.isPlay = !this.isPlay;
    },
    navBack1:function(){
        this.myfunc.navBack()
        // console.log(this.myfunc.navBack);
    },
    navBack:function(){
                this.$router.go(-1)
            }
  }
};
</script>

<style lang='scss' scoped>
@import url('../assets/css/variables.scss');

.playBar {
  display: flex;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 0.5em;
  .pic {
    width: 3.5em;
    height: 3.5em;
    margin-right: 1em;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      vertical-align: bottom;
    }
  }
  .text {
    color: #fff;
    flex: 1;
    .song-name {
      font-size: 1.2em;
    }
    .artist-name {
      font-size: 1em;
    }
  }
  .icon-btn {
  }
}
</style>