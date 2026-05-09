import { SPARK_CONFIG } from './config.js';
import CryptoJS from 'crypto-js'
import { btoa } from 'js-base64';

let httpUrl = {
  host: "spark-api.xf-yun.com",
  pathname: "/v4.0/chat"
};
let modelDomain = "4.0Ultra"; // 明确指定模型版本

function getWebsocketUrl() {
  return new Promise((resolve, reject) => {
    var apiKey = SPARK_CONFIG.APIKey;
    var apiSecret = SPARK_CONFIG.APISecret;
    var url = "wss://" + httpUrl.host + httpUrl.pathname;
    var host = `spark-api.xf-yun.com`;
    var date = new Date().toUTCString();
    var algorithm = "hmac-sha256";
    var headers = "host date request-line";
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${httpUrl.pathname} HTTP/1.1`;
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    var signature = CryptoJS.enc.Base64.stringify(signatureSha);
    var authorizationOrigin =
      `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    var authorization = btoa(authorizationOrigin);
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
    resolve(url);
  });
}

// 连接星火大模型 
let ws;

function wsConnect(callback, cb) {
  return new Promise(async (resolve, reject) => {
    try {
      let url = await getWebsocketUrl();
      
      // 使用标准 WebSocket API
      ws = new WebSocket(url);
      
      ws.onopen = function(event) {
        console.log('WebSocket连接已打开');
        callback && callback();
        resolve();
      };
      
      ws.onerror = function(event) {
        console.error('WebSocket连接打开失败', event);
        reject(event);
      };
      
      ws.onmessage = function(event) {
        try {
          const data = JSON.parse(event.data);
          console.log('收到消息:', data);
          
          if (data.header && data.header.code !== 0) {
            console.error(`请求错误: ${data.header.code}, ${data.header.message}`);
            return;
          }
          
          // 提取消息内容
          const message = data.payload?.choices?.text?.[0]?.content || '';
          
          // 传递给回调函数
          cb && cb(message);
          
          // 检查是否为最终消息
          if (data.header?.status === 2) {
            console.log('收到最终消息，关闭连接');
            ws.close();
          }
        } catch (e) {
          console.error('解析消息错误:', e);
        }
      };
      
      ws.onclose = function(event) {
        console.log('WebSocket连接已关闭');
      };
    } catch (error) {
      console.error('连接失败:', error);
      reject(error);
    }
  });
}

async function requestSpark(question, cb) {
  // 关闭之前的连接（如果存在）
  if (ws) {
    ws.close();
    ws = null;
  }
  
  try {
    await wsConnect(() => {
      const params = {
        "header": {
          "app_id": SPARK_CONFIG.APPID
        },
        "parameter": {
          "chat": {
            "domain": modelDomain,
            "temperature": 0.5,
            "max_tokens": 4096
          }
        },
        "payload": {
          "message": {
            "text": question
          }
        }
      };
      console.log('发送请求:', JSON.stringify(params));
      ws.send(JSON.stringify(params));
    }, cb);
  } catch (error) {
    console.error('连接失败:', error);
    throw error;
  }
}

export default requestSpark;