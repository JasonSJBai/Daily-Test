/**
 * 能发送异步ajax请求的函数
 * 封装axios库
 * 函数的返回值是promise对象
 */
import axios from "axios";
import { message } from "antd";

export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve) => {
    let promise;
    // 1.执行异步ajax请求
    if (type === "GET") {
      //发GET请求
      promise = axios.get(url, { params: data });
    } else {
      promise = axios.post(url, data);
    }
    // 2.如果成功了，调用resolve(value)
    promise
      .then((response) => {
        resolve(response.data);
      })
      // 3.如果失败了，不调用reject(reason)，而是提示错误信息
      .catch((error) => {
        message.error("请求出错了:" + error.message);
      });
  });
}
