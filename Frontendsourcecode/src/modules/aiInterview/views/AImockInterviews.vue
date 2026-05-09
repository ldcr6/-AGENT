<template>
  <div id="coze-chat-container"></div>
</template>
  
  <script>
  let cozeInited = false;

  // 请将下方占位符替换为你自己的 Coze 配置
  // 获取地址: https://www.coze.cn/open/api/token
  const COZE_PAT = process.env.VUE_APP_COZE_PAT || 'YOUR_COZE_PAT_TOKEN';
  const COZE_BOT_ID = process.env.VUE_APP_COZE_BOT_ID || 'YOUR_COZE_BOT_ID';
  
  export default {
    name: 'AImockInterviews',
    data() {
      return {
        containerKey: 0,
        cozeClient: null
      }
    },
    mounted() {
      this.initCozeChat();
    },
    methods: {
      initCozeChat() {
        if (cozeInited) return;
        cozeInited = true;
        
        const container = document.getElementById('coze-chat-container');
        if (container) container.innerHTML = '';
  
        if (window.CozeWebSDK) {
          this.cozeClient = new window.CozeWebSDK.WebChatClient({
            config: {
              bot_id: COZE_BOT_ID,
              isIframe: true,
              message_filter: (message) => {
                if (message.type !== 'text') {
                  console.warn('不支持的富媒体消息类型:', message.type);
                  return {
                    ...message,
                    content: '此消息格式不支持显示，请使用纯文本交互'
                  };
                }
                return message;
              }
            },
            componentProps: {
              title: 'AI模拟面试',
            },
            auth: {
              type: 'token',
              token: COZE_PAT,
              onRefreshToken: () => COZE_PAT
            }
          });
        }
      }
    },
    beforeUnmount() {
      cozeInited = false;
      
      if (this.cozeClient && typeof this.cozeClient.destroy === 'function') {
        this.cozeClient.destroy();
      }
      
      this.containerKey++;
    }
  }
  </script>
  
  <style scoped>

</style>
