import axios from 'axios'

// 导出基准地址，原因：其他地方不是通过axios发请求的地方用上基准地址
// 项目的接口地址
export const baseURL = 'http://ttapi.research.itcast.cn/'
const instance = axios.create({
  // axios 的一些配置，baseURL  timeout
  baseURL,
  // 请求时间
  timeout: 5000
})

// 请求工具函数
// 将整个函数直接以文件导出 所以可以直接调文件名使用
export default (url, method, submitData) => {
  // 负责发请求：请求地址，请求方式，提交的数据
  return instance({
    url,
    method,
    // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
    // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData ===== params:submitData 这样理解
    // toLowerCase() 转换成小写
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
