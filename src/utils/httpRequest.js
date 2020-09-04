// 引入axios
import axious from 'axios'
import { message, Button, Spin } from 'antd';
import ReactDOM from 'react-dom';
import React from 'react';


const Error = () => {
   return message.error('服务器内部错误');
};

const Myspin=(props)=>{
  return  <Spin  className="spin" size="large" spinning={props.loading} style={{position:"absolute",top:'30px',left:'52%',index:'999'}}></Spin>
}

// ReactDOM.render(
//  <error/>,
//   mountNode,
// );


// 添加请求拦截器，这里面可以配置一下每次请求都需要携带的参数，比如 token，timestamp等等，根据项目自己配置
axious.interceptors.request.use(
  function(config) {
    ReactDOM.render(
      <Myspin loading={true}/>,
       document.getElementById("toolips")
     );
    // 每次请求带上token和用户编号
    // if (store.getters.token) {
    // config.headers['Token'] = getToken()
    // config.headers['Authorization'] = store.getters.userId
    // }
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // 每次请求带上时间戳 防刷处理
    if (config.method === 'get' || config.method === 'delete') {
      config.params = {
        ...config.params,
        timestamp: Date.parse(new Date()) / 1000
      }
    } else if (config.method === 'post' || config.method === 'put') {
      config.data = {
        ...config.data,
        timestamp: Date.parse(new Date()) / 1000
      }
    } else {
      config.data = {
        ...config.data,
        timestamp: Date.parse(new Date()) / 1000
      }
    }
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)


// 添加响应拦截器 ，这里的 response是接收服务器返回后的结果，也可以在这里做一些状态判断
axious.interceptors.response.use(
  response => {
    ReactDOM.render(
      <Myspin loading={false}/>,
       document.getElementById("toolips")
     );
    if (response.status == 404) {
      ReactDOM.render(
 <Error/>,
  document.getElementById("root"),
);
      return Promise.resolve(new Error('网络异常，请稍后重试'))
    }
    else{
      return response
    }
  },
  error => {
    ReactDOM.render(
      <Error/>,
       document.getElementById("toolips")
     );
    return Promise.reject(error)
  }
)
// 提供axios给外部调用
export default axious




;