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

//获取一级或二级分类列表（一级列表的parentId为"0"，二级列表的parentId为所处一级分类的"_id"）
export const reqCategorys = (parentId) =>
  ajax("/manage/category/list", { parentId });

//添加分类
export const reqAddCategorys = (parentId, categoryName) =>
  ajax("/manage/category/add", { parentId, categoryName }, "POST");
//更新分类
export const reqUpdateCategorys = (categoryId, categoryName) =>
  ajax("/manage/category/update", { categoryId, categoryName }, "POST");

//获取商品分页列表
export const reqProducts = (pageNum, pageSize) =>
  ajax("/manage/product/list", { pageNum, pageSize });

//搜索商品分页列表(根据商品名称/商品描述)
//searchType:搜索的类型，productName/productDesc
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchName,
  searchType,
}) =>
  ajax("/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });

//获取天气
export async function reqWeather() {
  const ip = await getIpClient();
  const cityCode = await getCityCodeByIp(ip);
  const weather = await getWeatherByCityCode(cityCode);
  return weather;
}
