import Mock from 'mockjs';
import { getLogin } from './module/login';
import { getTableList } from './module/home';
import { getRoles } from './module/roles';
import { Logout } from './module/logout';

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 0
})
Mock.mock(/\/getLogin/, 'get', getLogin);
Mock.mock(/\/getTableList/, 'get', getTableList);
Mock.mock(/\/getRoles/, 'get', getRoles);
Mock.mock(/\/Logout/, 'get', Logout);

export default Mock
