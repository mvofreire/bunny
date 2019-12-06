import axios from "axios";
import appConfig from "config";

let instance;
const createInstance = () => {
  const instance = axios.create({
    baseURL: appConfig.baseUrl,
    timeout: 30000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

  return instance;
};

const addInterceptors = instance => {
  instance.interceptors.response.use(
    function(response) {
      return response.data;
    },
    function(error) {
      return error;
    }
  );
};

const request = () => {
  instance = createInstance();

  addInterceptors(instance);

  return {
    get,
    post,
    put,
    patch,
    delete: _delete
  };
};

const get = (endpoint, params) => instance.get(endpoint, { params });
const post = (endpoint, params) => instance.post(endpoint, params);
const put = (endpoint, params) => instance.put(endpoint, params);
const patch = (endpoint, params) => instance.patch(endpoint, params);
const _delete = (endpoint, params) => instance.delete(endpoint, params);

export default request();
