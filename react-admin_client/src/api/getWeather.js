import axios from "axios";

export async function getIpClient() {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    // console.log(response);
    return response.data.ip;
  } catch (error) {
    console.error(error);
  }
}

export async function getCityCodeByIp(ip) {
  try {
    // const ip = "210.74.156.250";  //西安IP
    // const ip = "210.176.40.54";  //外网IP
    const response = await axios.get(
      "https://restapi.amap.com/v3/ip?key=e68088425affae741257323fb127c082&ip=" +
        ip
    );
    // console.log(response);
    return response.data.adcode;
  } catch (error) {
    console.error(error);
  }
}

export async function getWeatherByCityCode(cityCode) {
  try {
    // const cityCode = "610100";
    if (cityCode === []) {
      const response = await axios.get(
        "https://restapi.amap.com/v3/weather/weatherInfo?key=e68088425affae741257323fb127c082&city=" +
          cityCode
      );
      // console.log(response);
      const { weather, city, temperature } = response.data.lives[0];
      return { weather, city, temperature };
    } else {
      return { weather: "-", city: "-", temperature: "-" };
    }
  } catch (error) {
    console.error(error);
  }
}
