<template>
  <div class="container">
    <div class="top">
      <!-- 专辑封面 -->
      <div class="top-left">
        <img :src="playlist.coverImgUrl" alt />
      </div>
      <div class="top-md">
        <!-- 歌单标题 -->
        <h3>{{playlist.name}}</h3>
        <!-- 作者 -->
        <div class="creator">
          <img :src="playlist.creator.avatarUrl" alt />
          <span>{{playlist.creator.nickname}}</span>
          <span>{{playlist.createTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}创建</span>
        </div>
        <!-- 简介 -->
        <div class="detail text-hidden-3">{{playlist.description}}</div>
        <!-- 标签 -->
        <div class="tag">
          <span v-for="(tag,index) in playlist.tags" :key="index">{{tag}}</span>
        </div>
      </div>
      <div class="top-right">
        <!-- <img :src="playlist.coverImgUrl" alt=""> -->
      </div>
      <!-- 背景图片 -->
      <div class="bgimg" :style="{backgroundImage: 'url('+ playlist.coverImgUrl +')'}"></div>
    </div>
    <!-- 选项 -->
    <div class="tabbar" ref="tabbar">
      <Button type="primary">全部播放</Button>
      <span :class="{select:tabbarIndex == 0}">歌曲</span>
      <span :class="{select:tabbarIndex == 1}">评论</span>
    </div>
    <!-- 列表 -->
    <div class="list">
      <ul>
        <li v-for="(item,index) in tracks" :key="index" @click="playMusic(item)">
          <img :src="item.al.picUrl" alt />
          <div>
            <div class="song-name">{{item.name}}</div>
            <div class="song-ar">{{item.ar[0].name}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getPlaylistDetail } from "../api/index";
import { mapState,mapActions,mapMutations } from 'vuex'

export default {
  data() {
    return {
      // playlist: "",
      tabbarIndex: 0,
      // privileges:{},
      columns: [
        {
          title: "歌曲名",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ]
    };
  },
  components: {},
  methods: {
    ...mapActions(['toggle_tabbar','toggle_playBar']),
    ...mapMutations({
      SETMUSIC: 'player/SETMUSIC'
    }),
    playMusic:function(item){
      let data = {};
      data.al_img = item.al.picUrl
      data.song_name = item.name
      data.song_id = item.id
      data.song_ar = item.ar[0].name

      this.SETMUSIC(data)
      
      // 跳转到播放界面
      this.$router.push({
        path:'player'
      })
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
    
    let { playlist } = await getPlaylistDetail({
      id: route.query.id
    });

    return {
      playlist: playlist,
      tracks: playlist.tracks
    };
  },
  async fetch({ store, params }){
    // await store.dispatch('toggle_tabbar',false)
    // await store.dispatch('toggle_playBar',true)
  },
  beforeMount(){
    this.toggle_tabbar(false)
    this.toggle_playBar(true)
  },
  mounted() {
    console.log(this.$route.query.id);

    // console.log(this.$refs.top.style);
    // this.$refs.top.style.backgroundImage = this.playlist.coverImgUrl
    // console.log(this.$refs.top.backgroundImage);
  },
  // layout: "playBar"
};
</script>

<style lang='scss' scoped>
.top {
  height: 20em;
  padding: 5em 1em;
  display: flex;
  position: relative;
  .top-left {
    width: 10em;
    min-width: 10em;
    height: 10em;
    margin-right: 1em;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      vertical-align: bottom;
      border-radius: 2px;
    }
  }
  .top-md {
    h3 {
      margin-bottom: 1em;
      color: #333;
    }
    .creator {
      margin-bottom: 1em;
      img {
        display: inline-block;
        width: 2em;
        height: 2em;
        object-fit: cover;
        border-radius: 50%;
        vertical-align: bottom;
      }
      span {
        margin-right: 1em;
      }
    }
    .detail {
      font-size: 0.9em;
      // color:
    }
    .tag{
      span{
        display: inline-block;
        padding: 0.2em 1em;
        color: $Text5;
        background-color: rgba(0,0,0,.5);
        border-radius: 1em;
        margin-right: 1em;
        font-size: 0.8em;
      }
    }
  }
  .bgimg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20em;
    z-index: -1;
    opacity: 0.4;
    background-size: cover;
  }
}
.tabbar {
  padding-left: 2em;
  border-bottom: 2px solid $Text5;
  span {
    position: relative;
    top: 2px;
    display: inline-block;
    padding: 1em;
    margin-left: 2em;

    // border-bottom: 2px solid transparent;
  }
  span.select {
    color: $Primary;
    border-bottom: 2px solid $Primary;
    // background-color: $Background;
  }
}
.list {
  padding: 1em;
  li {
    display: flex;
    padding: 1em 0;
    border-bottom: 1px solid $Background;
    transition: all ease-in 0.2s;
    img {
      min-width: 4em;
      height: 4em;
      object-fit: cover;
      vertical-align: bottom;
      border-radius: 4px;
    }
    &>div {
      flex: 1;
      padding-left: 1em;
      .song-name{
        font-size: 1.2em;
        color: $Text1;
      }
      .song-ar{
        color: $Text3;
      }
    }
  }
  li:active{
    background-color: $Background;
  }
}
</style>
