import axios from 'axios';
import config from './config';

const instance = axios.create();

instance.defaults.timeout = config.TIMEOUT
// instance.defaults.baseURL = config.BASE_URL

// 请求拦截器
instance.interceptors.request.use(req => {
    // console.log('req:',req);
    return req;
}, error => {
    console.log('request error:',error);
    
    return Promise.reject(error);
}
)

// 响应拦截器
instance.interceptors.response.use(res => {
    // console.log(res.data);
    
    return res.data
}, error => {
    console.log("出错了", error);
    return Promise.reject(error);
})

export default instance;