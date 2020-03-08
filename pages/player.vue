<template>
  <div class="container">
    <!-- <div class="top">
        <span class="goback" @click="navBack">
            <Icon type="md-arrow-back" />
        </span>
    </div> -->
    <!-- 专辑封面 -->
    <div class="al-img">
      <img :src="[song.al_img?song.al_img:'']" alt />
    </div>
    <!-- 歌曲信息 -->
    <div class="text">
      <div class="name">{{song.song_name}}</div>
      <div class="ar">{{song.song_ar}}</div>
    </div>
    <!-- 控制 -->
    <div class="control">
      <!-- 上一首 -->
      <div>
        <svg class="icon-player-md" aria-hidden="true">
          <use xlink:href="#icon-shangyishou" />
        </svg>
      </div>
      <!-- 播放 -->
      <div @click="play">
        <svg class="icon-player-lg" aria-hidden="true" v-show="isPlay">
          <use xlink:href="#icon-zanting" />
        </svg>
        <svg class="icon-player-lg" aria-hidden="true" v-show="!isPlay">
          <use xlink:href="#icon-bofang" />
        </svg>
      </div>
      <!-- 下一首 -->
      <div>
        <svg class="icon-player-md" aria-hidden="true">
          <use xlink:href="#icon-xiayishou" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    // ...mapState(["isPlay", "song", "list"])
    // ...mapState({
    //     song:'player/song'
    // })
    song(){
        return this.$store.state.player.song
    },
    isPlay(){
        return this.$store.state.player.isPlay
    }
  },
  methods:{
    ...mapActions(['toggle_tabbar','toggle_playBar']),
    ...mapActions({
        playControl:'player/playControl'
    }),
      navBack: function() {
      this.$router.go(-1);
    },
    play:function(){
        this.playControl()
    }
  },
  beforeMount(){
    this.toggle_tabbar(false)
    this.toggle_playBar(true)
  },
  mounted(){
    //   console.log('你猜能不能打印出来？：',this.$refs.player);
      
  }
};
</script>

<style lang='scss' scoped>
.container {
//   padding: 0 1em;
  .top{
      position: relative;
      height: 2em;
      .goback{
          position: absolute;
          top: 0.5em;
          left: 1em;

      }
  }
  .al-img {
    width: 100%;
    height: 100vw;
    max-width: 414px;
    max-height: 414px;
    margin-bottom: 1.5em;
    // margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      vertical-align: bottom;
    }
  }
  .text{
      text-align: center;
          margin-bottom: 3em;
      .name{
          font-size: 1.5em;
          color: $Text1;
          margin-bottom: 1em;
      }
      .ar{
          font-size: 1em;
          color: $Text4;
      }
  }
  .control{
      display: flex;
      width: 80%;
      margin: 0 auto;
      text-align: center;
        //   line-height: 4.5em;
      &>div{
          flex: 1;
      }
    //   .icon-lg{
    //       position: relative;
    //         top: -0.5em;
    //   }
  }
}
</style>