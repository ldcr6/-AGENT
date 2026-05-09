// 星火大模型配置-大模型测试 项目集合下面 
// 请将下方占位符替换为你自己的讯飞星火 API 配置
// 获取地址: https://console.xfyun.cn/services/bm4
export const SPARK_CONFIG = {
  APPID: process.env.VUE_APP_SPARK_APPID || 'YOUR_SPARK_APPID',
  APISecret: process.env.VUE_APP_SPARK_API_SECRET || 'YOUR_SPARK_API_SECRET',
  APIKey: process.env.VUE_APP_SPARK_API_KEY || 'YOUR_SPARK_API_KEY',
  modelDomain: '4.0Ultra'
}

