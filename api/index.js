// import axios from 'axios';
import request from '../util/request';
import config from '../util/config'

export function getBanner(){
    return request({
        url:config.BASE_URL_1+'/banner',
        method: 'get',
    })
}

//推荐歌单
export function getPersonalized(){
    return request({
        url:config.BASE_URL_1+'/personalized',
        method: 'get',
    })
}
export function getPlaylistDetail(params){
    // console.log('params:',params);
    
    return request({
        url:config.BASE_URL_1 + '/playlist/detail',
        method:'get',
        params: params
    })
}
