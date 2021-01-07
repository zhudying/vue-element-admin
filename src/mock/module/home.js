import Mock from 'mockjs'
// import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

export const getTableList = req => {
  let userInfo = null
  userInfo = Mock.mock({
    'list|1-18': [
      {
        'time': '@date("yyyy-MM-dd hh:mm:ss")',
        'timeLang|1': '@increment',
        'id|1': '@increment',
        'author|1': '@cname',
        'name': '@title',
        'num|1-200': 1,
        'image': Random.image('1540x215', '#50B347', '#FFF', 'Mock.js')
      }
    ]
  })
  return userInfo
}
