export const state = () => ({
    showTabbar:true,
    showPlayBar:false,
  })
  export const getters = {

}
 
export const actions = {
    toggle_tabbar({commit},params){
        commit('TOGGLE_TABBAR',params)
    },
    toggle_playBar({commit},params){
        commit('TOGGLE_PLAYBAR',params)
    }
}

export const mutations = {
    TOGGLE_TABBAR(state,params){
        state.showTabbar = params
    },
    TOGGLE_PLAYBAR(state,params){
        state.showPlayBar = params
    }
}
