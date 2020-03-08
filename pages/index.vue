<template>
  <div class="container">
    <!-- 搜索栏 -->
    <div class="top">
      <Row>
        <i-col span="18" :offset="3">
          <i-input placeholder="歌曲/艺人">
            <i-button slot="append" icon="ios-search"></i-button>
          </i-input>
        </i-col>
      </Row>
    </div>
    <!-- banner -->
    <!-- <Carousel autoplay v-model="bannerIndex" loop arrow="never">
      <CarouselItem v-for="(banner,index) in banners" :key="index">
        <div class="banner">
          <img :src="banner.imageUrl" />
        </div>
      </CarouselItem>
    </Carousel>-->
    <!-- swiper -->
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(banner,index) in banners" :key="index">
          <img :src="banner.imageUrl" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!-- 歌单 -->
    <div class="title">
      <h2>热门歌单</h2>
      <span>更多</span>
    </div>
    <div class="list">
      <div
        class="list-item"
        v-for="(item,index) in songlist"
        :key="index"
        @click="navTo('songlist',{id:item.id})"
      >
        <img :src="item.picUrl" alt />
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner, getPersonalized } from "../api/index";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      bannerIndex: 0,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          // type : 'progressbar',
          bulletClass: "my-bullet", //需设置.my-bullet样式
          bulletActiveClass: "my-bullet-active"
        },
        autoplay: true
        // some swiper options...
      }
    };
  },
  components: {},
  methods: {
    ...mapActions(["toggle_tabbar", "toggle_playBar"]),
    navTo: function(page, params) {
      console.log(this.$router);
      this.$router.push({
        path: page,
        query: params
      });
    }
  },

  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    // console.log("asyncData");
    let { banners } = await getBanner();
    let { result } = await getPersonalized();
    // console.log("banners:", banners);
    return {
      banners,
      songlist: result
    };
  },
  async fetch({ store, params }) {
    // await store.dispatch('toggle_tabbar',true)
    // await store.dispatch('toggle_playBar',false)
  },
  beforeMount() {
    this.toggle_tabbar(true);
    this.toggle_playBar(false);
  }
};
</script>

<style lang='scss' scoped>
.container {
  padding-bottom: 4em;
}
.my-bullet {
  border-radius: 0;
  width: 1.5em;
  height: 2px;
  display: inline-block;
  background-color: #000;
  opacity: 0.4;
  margin: 0 0.2em;
}
.my-bullet-active {
  background: #fff;
  opacity: 1;
}

.top {
  margin: 0.5em 0;
}
.banner,
.swiper-slide {
  height: 3rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.title {
  position: relative;
  // padding: 1em 0;
  padding: 12px 0;
  // font-size: 1em;
  h2 {
    padding-left: 1em;
  }
  span {
    position: absolute;
    top: 0;
    right: 1em;
    font-size: 1.5em;
    padding: 12px 0;
  }
}
.list {
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.list-item {
  position: relative;
  width: 2.2rem;
  height: 2.2rem;
  margin-bottom: 0.5rem;
  border-radius: 0.2rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: bottom;
  }
  & > div {
    position: absolute;
    width: 100%;
    padding: 0.3em;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 1em;
    border-radius: 0 0 0.2rem 0.2rem;
  }
}
</style>
