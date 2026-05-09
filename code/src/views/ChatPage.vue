<template>
    <HeaderBar />
  <div class="chat-page">
    <!-- 左侧联系人列表 -->
    <div class="chat-contacts">
      <div class="search-bar">
        <input type="text" placeholder="搜索30天内的联系人" v-model="search" />
      </div>
      <div class="contact-tabs">
        <span :class="['tab', activeTab==='全部'?'active':'']" @click="activeTab='全部'">全部</span>
        <span :class="['tab', activeTab==='未读'?'active':'']" @click="activeTab='未读'">未读(2)</span>
        <span :class="['tab', activeTab==='新招呼'?'active':'']" @click="activeTab='新招呼'">新招呼</span>
        <span :class="['tab', activeTab==='仅沟通'?'active':'']" @click="activeTab='仅沟通'">仅沟通</span>
      </div>
      <div class="contact-list">
        <div v-for="contact in filteredContacts" :key="contact.id" :class="['contact-item', contact.id===activeContact.id?'selected':'']" @click="selectContact(contact)">
          <div class="avatar-status-wrap">
            <img :src="contact.avatar" class="contact-avatar" />
            <span class="online-dot" :class="contact.online ? 'online' : 'offline'"></span>
          </div>
          <div class="contact-info">
            <div class="contact-name">
              {{ contact.name }}
              <span class="contact-role">{{ contact.role }}</span>
              <span class="online-text" :class="contact.online ? 'online' : 'offline'">
                {{ contact.online ? '在线' : '离线' }}
              </span>
            </div>
            <div class="contact-msg">{{ contact.lastMsg }}</div>
          </div>
          <div class="contact-time">{{ contact.time }}</div>
        </div>
        <div v-if="filteredContacts.length===0" class="no-more">没有更多了</div>
      </div>
    </div>
    <!-- 右侧聊天内容区 -->
    <div class="chat-main">
      <div class="chat-header">
        <span class="chat-user-name">{{ activeContact.name }}</span>
        <span class="chat-user-role">{{ activeContact.role }}</span>
      </div>
      <div class="chat-job-info">
        <span class="job-title">前端开发实习生(004156)</span>
        <span class="job-salary">200-250元/天</span>
        <span class="job-location">成都</span>
      </div>
      <div class="chat-history">
        <div v-for="msg in messages" :key="msg.id" :class="['chat-msg', msg.from==='me'?'me':'other']">
          <img v-if="msg.from==='other'" :src="activeContact.avatar" class="msg-avatar" />
          <div class="msg-content">
            <template v-if="msg.type === 'resume'">
              <div class="resume-card">
                <div class="resume-icon">
                  <svg width="40" height="40" viewBox="0 0 48 48"><rect width="40" height="40" rx="8" fill="#4fd2d6"/><path d="M16 20h16M16 28h16M16 24h8" stroke="#fff" stroke-width="2" stroke-linecap="round"/><rect x="12" y="12" width="24" height="24" rx="4" fill="none" stroke="#fff" stroke-width="2"/></svg>
                </div>
                <div class="resume-info">
                  <div class="resume-text" v-if="msg.status === 'loading'">
                    简历发送中...<span class="resume-loading"></span>
                  </div>
                  <div class="resume-text" v-else>
                    已发送简历：<a :href="msg.fileUrl" target="_blank" style="color:#19c2e6;">{{ msg.fileName }}</a>
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="msg.type === 'typing'">
              <span class="typing-dot">对方正在输入...</span>
            </template>
            <template v-else>
              {{ msg.text }}
            </template>
          </div>
        </div>
      </div>
      <div class="chat-input-bar">
        <button class="icon-btn">😊</button>
        <button class="icon-btn">📎</button>
        <input class="chat-input" v-model="input" @keyup.enter="sendMsg" placeholder="请输入内容..." />
        <button class="send-btn" @click="sendMsg">发送</button>
      </div>
      <div class="chat-quick-btns">
        <button class="quick-btn" @click="chooseResume">发简历</button>
        <button class="quick-btn">换电话</button>
        <button class="quick-btn">换微信</button>
        <input ref="fileInput" type="file" accept=".pdf" style="display:none" @change="handleFileChange" />
      </div>
    </div>
  </div>
</template>
<script setup>
import HeaderBar from '../components/HeaderBar.vue';
import { ref, computed, watch } from 'vue';
const search = ref('');
const activeTab = ref('全部');
const contacts = ref([
  { id: 1, name: '李先生', role: '人事', avatar: 'https://randomuser.me/api/portraits/men/11.jpg', lastMsg: '您的附件简历已经发送...', time: '16:25', online: true },
  { id: 2, name: '唐琴燕', role: '招聘专家', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', lastMsg: '您的附件简历已经发送...', time: '昨天', online: false },
  { id: 3, name: '李女士', role: 'HRBP', avatar: 'https://randomuser.me/api/portraits/women/13.jpg', lastMsg: '您正在与Boss李女士沟通', time: '07月16日', online: true },
  { id: 4, name: '张女士', role: '招聘HR', avatar: 'https://randomuser.me/api/portraits/women/14.jpg', lastMsg: 'hi! 你的在线简历...', time: '06月24日', online: false }
]);
const activeContact = ref(contacts.value[0]);
const messages = ref([]); // 初始为空
const input = ref('');
const fileInput = ref(null);
const filteredContacts = computed(() => {
  if (!search.value) return contacts.value;
  return contacts.value.filter(c => c.name.includes(search.value));
});
function selectContact(contact) {
  activeContact.value = contact;
}
function sendMsg() {
  if (!input.value.trim()) return;
  messages.value.push({ id: Date.now(), from: 'me', text: input.value });
  // 自动回复逻辑
  if (input.value.includes('问贵司')) {
    // 2秒后显示“对方正在输入...”
    setTimeout(() => {
      const typingId = Date.now() + 1;
      messages.value.push({
        id: typingId,
        from: 'other',
        type: 'typing'
      });
      // 1秒后移除typing并回复1
      setTimeout(() => {
        const idx = messages.value.findIndex(m => m.id === typingId);
        if (idx !== -1) messages.value.splice(idx, 1);
        messages.value.push({
          id: Date.now(),
          from: 'other',
          text: '当然可以~'
        });
        // 1.2秒后再次显示typing
        setTimeout(() => {
          const typingId2 = Date.now() + 2;
          messages.value.push({
            id: typingId2,
            from: 'other',
            type: 'typing'
          });
          setTimeout(() => {
            const idx2 = messages.value.findIndex(m => m.id === typingId2);
            if (idx2 !== -1) messages.value.splice(idx2, 1);
            messages.value.push({
              id: Date.now(),
              from: 'other',
              text: '你想了解些什么呢？'
            });
          }, 4200);
        }, 2200);
      }, 2000);
    }, 4000);
  }
  input.value = '';
}
function chooseResume() {
  fileInput.value && fileInput.value.click();
}
function handleFileChange(e) {
  const file = e.target.files[0];
  if (file && file.type === 'application/pdf') {
    const msgId = Date.now();
    // 1. 先显示“发送中”卡片
    messages.value.push({
      id: msgId,
      from: 'me',
      type: 'resume',
      status: 'loading',
      fileName: file.name
    });
    // 2. 1.5秒后变为“已发送”
    setTimeout(() => {
      const msg = messages.value.find(m => m.id === msgId);
      if (msg) {
        msg.status = 'done';
        msg.fileUrl = URL.createObjectURL(file);
      }
    }, 1500);
  }
  e.target.value = '';
}
// 自动推送消息逻辑：监听联系人变化
watch(activeContact, (newContact) => {
  setTimeout(() => {
    if (newContact.name === '李女士') {
      messages.value = [{
        id: Date.now(),
        from: 'other',
        text: `hi！你的在线简历很吸引我，可以发详细简历聊聊吗？
需要同学有vue的经验；自备电脑。

• 线上远程工作，优秀可转正
• 重用优秀实习生，实习也能独立负责重要项目、快速成长
• 团队平等自由、年轻有活力`
      },3000];
    } else {
      messages.value = [{
        id: Date.now(),
        from: 'other',
        text: '方便发一份简历过来吗？'
      }];
    }
  }, );
}, { immediate: true });
</script>
<style scoped>
.chat-page {
  width: 100vw; height: 100vh; background: #f7fbff;
  display: flex; overflow: hidden;margin-top: 100px;
}
.chat-contacts {
  width: 460px; background: #fff; border-right: 1px solid #e0e7ef;
  display: flex; flex-direction: column;
}
.search-bar { padding: 18px 16px 8px 16px; }
.search-bar input {
  width: 100%; border-radius: 8px; border: 1px solid #e0e7ef;
  padding: 6px 12px; font-size: 1rem;
}
.contact-tabs {
  display: flex; gap: 8px; padding: 0 16px 8px 16px;
}
.tab { font-size: 0.98rem; color: #b0b8c9; cursor: pointer; padding: 2px 8px; border-radius: 6px; }
.tab.active { color: #19c2e6; background: #e0f7fa; font-weight: 700; }
.contact-list { flex: 1; overflow-y: auto; }
.contact-item {
  display: flex; align-items: center; gap: 10px; padding: 10px 16px; cursor: pointer;
  border-left: 3px solid transparent; transition: background 0.2s;
}
.contact-item.selected { background: #e6f7ff; border-left: 3px solid #19c2e6; }
.contact-avatar { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; }
.contact-info { flex: 1; }
.contact-name { font-weight: 700; color: #22223b; font-size: 1.05rem; }
.contact-role { color: #b0b8c9; font-size: 0.95rem; margin-left: 4px; }
.contact-msg { color: #b0b8c9; font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.contact-time { color: #b0b8c9; font-size: 0.92rem; margin-left: 6px; }
.no-more { text-align: center; color: #b0b8c9; padding: 18px 0; }
.chat-main { flex: 1; display: flex; flex-direction: column; background: #f7fbff; }
.chat-header { display: flex; align-items: center; justify-content: flex-start; padding: 18px 24px 0 24px; font-size: 1.1rem; }
.chat-user-name { font-weight: 700; color: #22223b; }
.chat-user-role { color: #b0b8c9; margin-left: 8px; }
.chat-job-info { padding: 8px 24px; color: #19c2e6; font-size: 1.05rem; display: flex; gap: 18px; }
.job-title { font-weight: 700; }
.job-salary { color: #ff5a5f; font-weight: 700; }
.job-location { color: #b0b8c9; }
.chat-history { flex: 1; padding: 18px 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
.chat-msg {
  display: flex;
  align-items: flex-start; /* 顶部对齐 */
  gap: 8px;
}
.chat-msg.me { flex-direction: row-reverse; }
.msg-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }
.msg-content {
  background: #fff; border-radius: 8px; padding: 8px 14px; font-size: 1.05rem; color: #22223b; box-shadow: 0 2px 8px #e0e7ef22; max-width: 320px; word-break: break-all;
  white-space: pre-line;
}
.chat-msg.me .msg-content { background: #19c2e6; color: #fff; }
.chat-input-bar { display: flex; align-items: center; gap: 8px; padding: 12px 24px; background: #f7fbff; border-top: 1px solid #e0e7ef; }
.icon-btn { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #b0b8c9; }
.chat-input { flex: 1; border: 1px solid #e0e7ef; border-radius: 8px; padding: 8px 12px; font-size: 1.05rem; outline: none; }
.send-btn { background: #19c2e6; color: #fff; border: none; border-radius: 8px; padding: 8px 22px; font-size: 1.05rem; font-weight: 700; cursor: pointer; }
.send-btn:hover { background: #13b0d1; }
.chat-quick-btns { display: flex; gap: 12px; padding: 8px 24px 18px 24px; }
.quick-btn { background: #fff; color: #19c2e6; border: 1.5px solid #19c2e6; border-radius: 8px; padding: 6px 18px; font-size: 1.05rem; font-weight: 700; cursor: pointer; transition: background 0.2s; }
.quick-btn:hover { background: #e0f7fa; }
.avatar-status-wrap {
  position: relative;
  display: inline-block;
}
.online-dot {
  position: absolute;
  right: 0; bottom: 2px;
  width: 10px; height: 10px;
  border-radius: 50%;
  border: 2px solid #fff;
}
.online-dot.online { background: #4fd26e; }
.online-dot.offline { background: #b0b8c9; }
.online-text {
  font-size: 0.92rem;
  margin-left: 6px;
}
.online-text.online { color: #4fd26e; }
.online-text.offline { color: #b0b8c9; }
.resume-card {
  display: flex;
  align-items: center;
  background: #e6f7fa;
  border-radius: 10px;
  padding: 12px 18px;
  min-width: 220px;
  max-width: 320px;
  box-shadow: 0 2px 8px #e0e7ef22;
  gap: 12px;
}
.resume-icon {
  width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
  background: #4fd2d6; border-radius: 8px;
}
.resume-info { flex: 1; }
.resume-text {
  color: #22223b;
  font-size: 1.05rem;
  font-weight: 500;
  word-break: break-all;
}
.resume-loading {
  display: inline-block;
  width: 16px; height: 16px;
  border: 2px solid #4fd2d6;
  border-top: 2px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 8px;
  vertical-align: middle;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.typing-dot {
  color: #b0b8c9;
  font-style: italic;
  font-size: 0.98rem;
}
</style> 