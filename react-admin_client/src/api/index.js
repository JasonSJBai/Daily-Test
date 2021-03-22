/**
 * 包含应用中所有接口请求函数的模块
 */
import ajax from "./ajax";
import {
  getIpClient,
  getCityCodeByIp,
  getWeatherByCityCode,
} from "./getWeather";

//登录接口
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");

//添加用户
export const reqAddUser = (user) => ajax("/manage/user/add", user, "POST");

//获取天气
export async function reqWeather() {
  const ip = await getIpClient();
  const cityCode = await getCityCodeByIp(ip);
  const weather = await getWeatherByCityCode(cityCode);
  return weather;
}
