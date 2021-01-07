import axios from "axios";
import { Message } from "element-ui";
import router from "@/router";
import qs from 'qs';
import store from '@/store'

// 创建axios实例
const service = axios.create({
  // api的base_url
  baseURL: process.env.VUE_APP_URL, // 本地-后端解决跨域后
  // baseURL: process.env.NODE_ENV === "dev" ? "/api" : process.env.VUE_APP_URL, // 本地-前端解决跨域
  timeout: 15000 // 请求超时时间
});

// request 请求拦截器
service.interceptors.request.use(
  config => {
    //设置header
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    config.headers["Content-Type"] = "application/json;  charset=UTF-8";

    // 格式化 get 请求
    if (config.method === 'get' && config.data) {
      config.url = `${config.url}?${qs.stringify(config.data, { indices: false })}`
    }
    // 让每个请求携带自定义token 
    if (store.getters.token) {
      // header添加token
      config.headers["Authorization"] = store.getters.token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// respone 响应拦截器
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error, "error");
    if (error.response.status == 400) {
      Message({
        message: "参数信息有误",
        center: true
      });
      return;
    } else if (error.response.status == 401) {
      Message({
        message: "未授权",
        center: true
      });
      router.push("/login");
      return;
    } else if (error.response.status == 404) {
      Message({
        message: "连接失败",
        center: true
      });
      return;
    } else if (error.response.status == 500) {
      Message({
        message: "服务器内部错误",
        center: true
      });
      return;
    } else if (error.response.status == 560) {
      Message({
        message: "数据库异常",
        center: true
      });
      return;
    }
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
