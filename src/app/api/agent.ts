import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

//using promise chaining
// axios.interceptors.response.use((response) => {
//   return sleep(1000)
//     .then(() => {
//       return response;
//     })
//     .catch((error) => {
//       console.log(error);
//       return Promise.reject(error);
//     });
// });

//using async/await
axios.interceptors.response.use(async (response) => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
  });

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string) => axios.get<T>(url).then(responseBody),
  put: <T>(url: string) => axios.get<T>(url).then(responseBody),
  del: <T>(url: string) => axios.get<T>(url).then(responseBody),
};

const Activities = {
  list: () => request.get<Activity[]>("./activities"),
};

const agent = {
  Activities,
};

export default agent;
