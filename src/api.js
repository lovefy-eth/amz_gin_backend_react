import axios from "axios";

// 设置 host
const host = process.env.REACT_APP_API_HOST || "http://localhost:8080";

// 封装请求
function request(url, method, data, header = {}) {
  // 构建请求配置
  const config = {
    url: url,
    method: method,
    headers: header,
    data: data,
    baseURL: host,
    timeout: 60000,
  };

  // 发送请求
  return axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

// 封装 get 请求
function get(url, data) {
  return request(url, "get", data);
}

// 封装 post 请求
function post(url, data) {
  return request(url, "post", data);
}

// post json 请求
function postJson(url, data) {
  return request(url, "post", data, {
    "Content-Type": "application/json",
  });
}

const QueryPathData_MongoAggregate = [
  {
    "$match": {
      "path": {
        "$ne": ""
      }
    }
  },
  {
    "$group": {
      "_id": "$path",
      "count": {
        "$sum": 1
      }
    }
  },
  {
    "$sort": {
      "_id": -1
    }
  }
]


export const QueryPathAggregate = () => MongoAggregate(QueryPathData_MongoAggregate);
export const MongoAggregate = (data) => postJson('/MongoAggregate', data);

export const Categorys2TreeNode = (data) => get('/Categorys2TreeNode', data);

