//mockData.js

import Mock from 'mockjs'
// 模拟数组
let List = [];
for (let i = 0; i < 3; i++) {
  List.push(Mock.mock({
    id: '@increment', // 生成一个全局的自增整数
    timestamp: +Mock.Random.date('T'), // 随机时间戳
    author: '@first', // 随机姓名
    title: '@title(5, 10)', // 随机一个标题，5-10个字符
    'status|1': ['published', 'draft', 'deleted'], // 三选一
    display_time: '@datetime', // 随机日期时间
  }))
}

let list = Mock.mock({
  data: {
    responseCode: 200,
    responseMessage: 'success',
    datas: List
  }
})



let mockData = {
  list: list
}
// 导出数据
export default mockData;