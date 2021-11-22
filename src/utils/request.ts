import axios from 'axios';
import { Toast } from 'vant';
import baseConfig from '@/utils/baseconfig';

const service = axios.create({
  baseURL: baseConfig.baseUrl, // url = base url + request url
  timeout: 80000, // request timeout,
});

// request interceptor
service.interceptors.request.use(
  (config: any) => config,
  (error: Error) => (Promise.reject(error)),
);

// response interceptor
service.interceptors.response.use(
  (response: any) => {
    const res = response.data;
    if (res.code !== '0' && res.code !== 0) {
      return Toast.fail(res.message || 'Error');
      // return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res;
  },
  (error: Error) => {
    //Toast.fail(error.message);
    return Promise.reject(error);
  },
);

export default service;
