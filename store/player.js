export const state = () => ({
    isPlay:false,
    song:{
        al_img:'',//专辑封面
        song_name:'',//歌曲名称
        song_id:'',//歌曲id
        song_ar:'',//艺人名称
    },
    list:[],//歌曲列表
  })
export const getters = {

}
 
export const actions = {
    //设置当前歌曲
    setMusic({commit},data){
        commit('SETMUSIC',data)
    },
    playControl({commit}){
        commit('PLAYCONTROL')
    }
}

export const mutations = {
    PLAYCONTROL(state){
        state.isPlay = !state.isPlay
        // console.log('isPlay:',state.isPlay);
        
    },
    SETMUSIC(state,data){
        console.log('SETMUSIC:',data);
        
        state.song = data
        state.isPlay = true
    }
}
