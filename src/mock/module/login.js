import Mock from 'mockjs';
// import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

export const getLogin = req => {
  let userInfo = null
  userInfo = Mock.mock({
    'code': 200,
    'message': '成功',
    'data':
    {
      'userName': 'admin',
      'sex': '男',
      "age": 20,
      'token': 'qweqwcxqwee'
    }
  })
  return userInfo
}