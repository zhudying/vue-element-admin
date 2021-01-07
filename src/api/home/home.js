import axios from "../index";
// post
export function getData(data) {
  return axios({
    method: "post",
    url: "/getdata",
    data
  });
}
// get
export function getTableList(params) {
  return axios({
    method: "get",
    url: "/getTableList",
    data: params
  });
}
// 表格导入
export function importExcels(data) {
  const formdata = new FormData();
  for (let key in data) {
    formdata.append(key, data[key])
  }
  return axios({
    method: 'post',
    url: "/importExcel",
    data: formdata
  })
}