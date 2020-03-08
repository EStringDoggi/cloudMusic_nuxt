<template>
  <div>
    <div class="top" v-show="showPlayBar">
      <!-- 返回按钮 -->
      <div class="goback" @click="navBack">
        <Icon type="md-arrow-back" />
      </div>
    </div>

    <nuxt />

    <!-- 播放器 -->
    <audio :src="songUrl" ref="player" autoplay></audio>

    <!-- 播放器条 -->
    <div class="playBar" v-if="showPlayBar" @click="navTo('player')">
      <!-- 专辑封面 -->
      <div class="pic">
        <img :src="song.al_img" alt />
      </div>
      <!-- 音乐名称 & 艺人-->
      <div class="text">
        <div class="song-name">
          <span v-show="song.song_name">{{song.song_name}}</span>
          <span v-show="!song.song_name">音乐名称</span>
        </div>
        <div class="artist-name">
          <span v-show="song.song_ar">{{song.song_ar}}</span>
          <span v-show="!song.song_ar">艺人</span>
        </div>
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

    <!-- 底栏 -->
    <div class="tabBar" v-show="showTabbar">
      <div @click="navTo('/')">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-waixingqiu" />
          </svg>
        </div>
        <div>首页</div>
      </div>
      <div @click="navTo('myList')">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-leida" />
          </svg>
        </div>
        <div>我的音乐</div>
      </div>
      <div @click="navTo('player')">
        <div class="al-img">
          <img :src="song.al_img" alt />
          <!-- <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-waixingqiu" />
          </svg>-->
        </div>
        <!-- <div>首页</div> -->
      </div>
      <div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-feichuan" />
          </svg>
        </div>
        <div>...</div>
      </div>
      <div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yuhangyuan" />
          </svg>
        </div>
        <div>...</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      // songUrl:
      // "https://music.163.com/song/media/outer/url?id=" + 1407909532 + ".mp3"
    };
  },
  computed: {
    ...mapState(["showTabbar", "showPlayBar"]),
    isPlay() {
      return this.$store.state.player.isPlay;
    },
    song() {
      return this.$store.state.player.song;
    },
    songUrl() {
      return (
        "https://music.163.com/song/media/outer/url?id=" +
        this.song.song_id +
        ".mp3"
      );
    }
  },
  watch: {
    isPlay: {
      handler: function() {
        if (this.isPlay) {
          this.$refs.player.play();
        } else {
          this.$refs.player.pause();
        }
        console.log("this.isPlay:", this.isPlay);
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      playControl: "player/playControl"
    }),
    navTo: function(page) {
      console.log(this.$router);
      this.$router.push({
        path: page
        // query:params
      });
    },
    navBack: function() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang='scss'>
@import url("../assets/css/variables.scss");
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.tabBar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #eee;
  padding: 0.1rem 0;
  background-color: #fff;
  & > div {
    flex: 1;
    text-align: center;
  }
  .al-img {
    width: 3.5em;
    height: 3.5em;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
    top: -1em;
    box-sizing: border-box;
    border: 1px solid $Text5;
    transform: scale(1.2);
    img {
      width: 100%;
    // vertical-align: bottom;
      height: 100%;
      object-fit: cover;
    }
  }
}

// 因为需要切换页面时音乐不间断，layout只使用一个
// 播放条
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
