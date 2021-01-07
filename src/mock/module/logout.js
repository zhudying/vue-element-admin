import Mock from 'mockjs';

export const Logout = () => {
  let data = Mock.mock({
    'code': 200,
    'message': '成功',
    'data': '退出成功'
  })
  return data
}