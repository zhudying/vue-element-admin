import axios from "./index";

// 登录接口
export function getLogin(data) {
  return axios({
    method: "get",
    url: "/getLogin"
  })
}

// 登出
export function logout() {
  return axios({
    method: 'get',
    url: '/Logout'
  })
}
// 权限--路由接口
export function getRoles(data) {
  return axios({
    method: "get",
    url: "/getRoles"
  })
}