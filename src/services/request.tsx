import axios from 'axios';
import { message } from 'antd';
import { history } from "src/router";
// import md5 from 'js-md5';
// import Cookies from 'js-cookie';

export const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api/recruit-manage' : '/recruit-manage',
  withCredentials: true,
  timeout: 60000 * 1.5 // 请求超时时间
});

// request拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log('request error', error);
    Promise.reject(error);
  }
);

// response 拦截器
request.interceptors.response.use(
  (response) => {
    if (
      response.headers['content-type'] != null &&
            response.headers['content-type'].indexOf('vnd.ms-excel') > 0
    ) {
      return response;
    }
    const res = response.data;
    if (res.code !== 0) {
      if (res.code === 403) {
        history.push('/login');
        // message.error(res.msg);
        // window.history.pushState('/login');
        return Promise.reject(res);
      }

      if (res.code >= 500) {
        message.error(res.msg);
      }

      return Promise.reject(res);
    } else {
      console.log(response);
      return response?.data.data;
    }
  },
  (error) => {
    console.log('err' + error);
    return Promise.reject(error);
  }
);
