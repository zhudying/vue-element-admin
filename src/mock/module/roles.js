import Mock from 'mockjs'
// import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

export const getRoles = req => {
  let list = Mock.mock({
    'code': 200,
    'message': '成功',
    'data': [
      {
        name: "首页",
        path: "/home",
        sort: '1',
        children: [
          {
            name: "首页",
            path: "/home",
            file: '/home',
            meta: {
              title: "首页"
            }
          },
          {
            name: "详情",
            path: "/detail",
            file: '/home',
            meta: {
              title: "详情",
              activeMenu: '/home'
            }
          }
        ]
      },
      {
        name: "banner",
        path: "/banner",
        file: '/banner',
        sort: '1',
        meta: {
          title: "banner"
        }
      },
      {
        name: "课程管理",
        path: "/course",
        file: '/course',
        sort: '1',
        meta: {
          title: "课程管理"
        }
      },
      {
        name: "题库管理",
        path: "/question",
        children: [
          {
            name: "题库1",
            path: "/questionOne",
            file: '/question/questionOne',
            meta: {
              title: "题库1"
            }
          },
          {
            name: "题库2",
            path: "/questionTwo",
            file: '/question/questionTwo',
            meta: {
              title: "题库2"
            }
          }
        ]
      },
      {
        name: "结论管理",
        path: "/result",
        file: '/result',
        sort: '1',
        meta: {
          title: "结论管理"
        }
      },
      {
        name: "系统管理",
        path: "/system",
        children: [
          {
            name: "系统管理1",
            path: "/systemOne",
            file: '/system/systemOne',
            meta: {
              title: "系统管理1"
            }
          },
          {
            name: "系统管理2",
            path: "/systemTwo",
            file: '/system/systemTwo',
            meta: {
              title: "系统管理2"
            }
          }
        ]
      }
    ]
  })
  return list
}