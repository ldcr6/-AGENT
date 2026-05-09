<template>
  <transition name="modal-fade">
 <teleport to="body">
   <div class="modal-mask" v-show="show">
     <div class="modal-container">
       <div class="modal-header">
         <div class="brand-logo">
           <span>乐面</span> <!-- 修改品牌名称 -->
         </div>
         <button class="modal-close" @click="closeModal">×</button>
       </div>
       
       <div class="modal-body">
         <!-- 邮箱注册表单 (默认显示) -->
         <div class="form-group">
           <input 
             type="email" 
             placeholder="请输入邮箱" 
             v-model="form.email"
             :disabled="isLoading"
           />
           <div v-if="errors.email" class="error-tip">{{ errors.email }}</div>
         </div>
         
         <!-- 验证码输入区域 -->
         <div class="form-group captcha-group">
           <input 
             type="text" 
             placeholder="请输入邮箱验证码" 
             v-model="form.emailCode"
             :disabled="isLoading"
           />
           <button 
             class="send-btn"
             :disabled="emailCountdown > 0 || isLoading"
             @click="showCaptchaModal = true"
           >
             {{ emailCountdown > 0 ? `${emailCountdown}秒后重发` : '获取验证码' }}
           </button>
         </div>
         
         <div v-if="showResendTip" class="resend-tip">
           未收到邮箱验证码？<a @click="showCaptchaModal = true">重新发送</a>
         </div>
         
         <!-- 昵称输入 -->
         <div class="form-group">
           <input 
             type="text" 
             placeholder="请输入昵称" 
             v-model="form.nickname"
             :disabled="isLoading"
           />
           <div v-if="errors.nickname" class="error-tip">{{ errors.nickname }}</div>
         </div>
         
         <!-- 密码设置 -->
         <div class="form-group">
           <input 
             :type="showPassword ? 'text' : 'password'" 
             placeholder="请设置登录密码" 
             v-model="form.password"
             :disabled="isLoading"
           />
           <button class="toggle-password" @click="showPassword = !showPassword">
             <i :class="showPassword ? 'icon icon-eye-off' : 'icon icon-eye'"></i>
           </button>
           <div v-if="errors.password" class="error-tip">{{ errors.password }}</div>
         </div>
         
         <!-- 确认密码 -->
         <div class="form-group">
           <input 
             :type="showConfirmPassword ? 'text' : 'password'" 
             placeholder="请确认密码" 
             v-model="form.confirmPassword"
             :disabled="isLoading"
           />
           <button class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
             <i :class="showConfirmPassword ? 'icon icon-eye-off' : 'icon icon-eye'"></i>
           </button>
           <div v-if="errors.confirmPassword" class="error-tip">{{ errors.confirmPassword }}</div>
         </div>

         <button 
           class="register-btn" 
           @click="handleRegister"
           :disabled="isLoading"
         >
           <span v-if="isLoading">注册中...</span>
           <span v-else>立即注册</span>
         </button>

         
       </div>
       
       
       <div class="switch-tip">
         已有账号？<a @click="$emit('to-login')">去登录</a>
       </div>
       <div class="modal-footer">
         <div class="slogan">每时每刻，都有人在此成功！</div>
       </div>
     </div>
   </div>
   
   <!-- 图形验证码弹窗 -->
   <div v-if="showCaptchaModal" class="captcha-modal">
     <div class="captcha-overlay" @click.self="showCaptchaModal = false"></div>
     <div class="captcha-container">
       <div class="captcha-header">
         <h3>发送邮箱验证码</h3>
         <p>邮箱 {{ form.email }}</p>
       </div>
       
       <div class="captcha-body">
         <div class="form-group">
           <input 
             type="text" 
             placeholder="请输入图形验证码" 
             v-model="captchaInput"
           />
           <div class="captcha-image" @click="refreshCaptcha">
             <!-- 图形验证码显示区域 -->
               <img 
                 v-if="captchaImageUrl && !captchaImageLoading" 
                 :src="captchaImageUrl" 
                 alt="验证码"
               >
             <span v-if="!captchaImageUrl && !captchaImageLoading">点击刷新验证码</span>
             <span v-else>加载中...</span>
           </div>
         </div>
         
         <button class="captcha-submit" @click="sendEmailVerification">
           发送验证码
         </button>
       </div>
     </div>
   </div>
 </teleport>
</transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { ref, reactive,watch, onUnmounted  } from 'vue'
import axios from 'axios'
import md5 from "js-md5";

const api = axios.create({
 baseURL: '/register',
 timeout: 10000,
 headers: {'Content-Type': 'application/json'}
})

// 主模态框状态
// const isShow = ref(false)
const props = defineProps({
  show: Boolean
})
watch(() => props.show, (newVal) => {
  // 模态框显示时重置表单
  if (newVal) {
    resetForm()
  }
})
const emit = defineEmits(['close', 'to-login'])
const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const showResendTip = ref(false)

// 表单数据
const form = reactive({
 email: '',
 emailCode: '',
 nickname: '',
 password: '',
 confirmPassword: ''
})

// 验证码相关状态
const showCaptchaModal = ref(false)
const captchaInput = ref('')
const captchaImageLoading = ref(false)
const emailCountdown = ref(0)
let countdownTimer = null

// 错误信息
const errors = reactive({
 email: '',
 emailCode: '',
 nickname: '',
 password: '',
 confirmPassword: ''
})

// 邮箱验证
const validateEmail = () => {
 errors.email = ''
 if (!form.email) {
   errors.email = '请输入邮箱'
   return false
 }
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
   errors.email = '请输入有效的邮箱'
   return false
 }
 return true
}

// 密码验证
const validatePassword = () => {
 errors.password = ''
 errors.confirmPassword = ''
 
 if (!form.password) {
   errors.password = '请设置密码'
   return false
 }
 if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,18}$/.test(form.password)) {
   errors.password = '密码只能是数字、字母、特殊字符，8 - 18位'
   return false
 }
 if (form.password !== form.confirmPassword) {
   errors.confirmPassword = '两次输入的密码不一致'
   return false
 }
 return true
}

// 昵称验证
const validateNickname = () => {
 errors.nickname = ''
 if (!form.nickname) {
   errors.nickname = '请输入昵称'
   return false
 }
 if (form.nickname.length < 2 || form.nickname.length > 20) {
   errors.nickname = '昵称长度需在2 - 20个字符之间'
   return false
 }
 return true
}

// 监听图形验证码弹窗的显示
watch(showCaptchaModal, (newVal) => {
 if (newVal) {
   
   // 验证邮箱格式是否正确
   if (validateEmail()) {
     refreshCaptcha()
   } else {
     // 如果邮箱格式错误，关闭弹窗并提示
     showCaptchaModal.value = false
     alert('请填写正确的邮箱地址')
   }
 }
  if (!newVal) {
   // 关闭时重置验证码状态
   captchaInput.value = ''
   if (captchaImageUrl.value) {
     URL.revokeObjectURL(captchaImageUrl.value)
     captchaImageUrl.value = ''
   }
 }
})
const captchaImageUrl = ref('') // 存储验证码图片的URL
// 刷新图形验证码
const refreshCaptcha = async () => {
try {
   captchaImageLoading.value = true
   // 项目中调用后端获取验证码图片
   const response = await api.get('/captchaImage', {
     params: { 
       email: form.email,
       type: 0  //注册类型
       }, // 需要传递邮箱
     responseType: 'blob' // 接收二进制数据
   })
   
   // 将Blob转换为URL
   const blob = new Blob([response.data], { type: 'image/png' })
   captchaImageUrl.value = URL.createObjectURL(blob)
 } catch (error) {
 console.error('获取验证码失败', error)
 let message = '获取验证码失败，请重试'
 
 if (error.response) {
   // 根据后端返回的错误码显示具体信息
   switch (error.response.status) {
     case 400:
       message = '请求参数错误'
       break;
     case 429:
       message = '请求过于频繁，请稍后再试'
       break;
   }
 }
 
 alert(message)
 captchaImageLoading.value = false
 }
}

// 组件卸载时释放URL对象
onUnmounted(() => {
 if (captchaImageUrl.value) {
   URL.revokeObjectURL(captchaImageUrl.value)
 }
})

// 发送邮箱验证码
const sendEmailVerification = async () => {
 if (!captchaInput.value) {
   alert('请输入图形验证码')
   return
 }
 
 try {
   // 调用后端发送邮箱验证码接口
   await api.post('/email/send-verification', {
     email: form.email,
     captcha: captchaInput.value
   })
   
   // 开始倒计时
   emailCountdown.value = 60
   countdownTimer = setInterval(() => {
     emailCountdown.value--
     if (emailCountdown.value <= 0) {
       clearInterval(countdownTimer)
       showResendTip.value = true
     }
   }, 1000)
   
   // 关闭验证码弹窗
   showCaptchaModal.value = false
   captchaInput.value = ''
   
 } catch (error) {
   alert(error.response?.data?.message || '发送验证码失败，请重试')
   refreshCaptcha()
 }
}

// 处理注册
const handleRegister = async () => {
 // 表单验证
 const isValid = validateEmail() && 
                 validateNickname() && 
                 validatePassword() &&
                 form.emailCode
 
 if (!isValid) {
   if (!form.emailCode) alert('请输入邮箱验证码')
   return
 }
 
 try {
   isLoading.value = true
   form.password = md5(form.password);
   
   // 调用后端注册接口
   const response = await api.post('/register', {
     email: form.email,
     code: form.emailCode,
     nickname: form.nickname,
     password: form.password
   })
   
   if (response.data.code === 200) {
     alert('注册成功！')
     closeModal()
     // 触发登录模态框显示（需要父组件实现）
    //  emit('registered')
   } else {
     throw new Error(response.data.msg || '注册失败')
   }
 } catch (error) {
   alert(error.message || '注册失败，请重试')
 } finally {
   isLoading.value = false
 }
}

// 切换到登录


// 关闭模态框
const closeModal = () => {
//  isShow.value = false
emit('close') // 通知父组件关闭
 // 重置状态
 resetForm()
}

// 重置表单
const resetForm = () => {
 form.email = ''
 form.emailCode = ''
 form.nickname = ''
 form.password = ''
 form.confirmPassword = ''
 
 // 清除错误信息
 Object.keys(errors).forEach(key => errors[key] = '')
 
 // 清除倒计时
 if (countdownTimer) {
   clearInterval(countdownTimer)
   emailCountdown.value = 0
 }
 
 showResendTip.value = false
}

// 暴露方法给父组件
// defineExpose({
//  open: () => {
//    isShow.value = true
//  },
//  close: closeModal
// })

// 定义事件
// const emit = defineEmits(['show-login', 'registered'])
</script>

<style scoped>
/* 新增图形验证码弹窗样式 */
.captcha-modal {
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: 10000;
}

.captcha-overlay {
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background: rgba(0, 0, 0, 0.5);
}

.captcha-container {
 position: relative;
 width: 380px;
 background: #fff;
 border-radius: 16px;
 box-shadow: 0 12px 36px rgba(0, 0, 0, 0.2);
 z-index: 2;
 padding: 24px;
}

.captcha-header {
 text-align: center;
 margin-bottom: 20px;
}

.captcha-header h3 {
 font-size: 20px;
 color: #2c3e50;
 margin-bottom: 8px;
}

.captcha-header p {
 color: #7f8c8d;
 font-size: 15px;
}

.captcha-image {
 height: 40px;
 background: #f5f7fa;
 border-radius: 8px;
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 margin-top: 10px;
 color: #7f8c8d;
 border: 1px dashed #e0e6ed;
 overflow: hidden; /* 防止图片超出边界 */
}

.captcha-image img {
 width: 80%;
 height: 100%;
 display: flex;
 object-fit: cover; /* 保持图片比例 */
}

.captcha-submit {
 width: 100%;
 padding: 14px;
 background: #42c8a5;
 color: white;
 border: none;
 border-radius: 12px;
 font-size: 16px;
 margin-top: 20px;
 cursor: pointer;
 transition: background 0.3s;
}

.captcha-submit:hover {
 background: #38b494;
}

/* 其他样式调整 */
.captcha-group {
 position: relative;
}

.send-btn {
 position: absolute;
 right: 0;
 top: 0;
 height: 100%;
 padding: 0 16px;
 background: #f0f9f6;
 color: #42c8a5;
 border: 1px solid #e0f6ef;
 border-radius: 0 12px 12px 0;
 font-size: 14px;
 cursor: pointer;
 transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
 background: #e0f6ef;
}

.send-btn:disabled {
 background: #f5f7fa;
 color: #a3b1c6;
 cursor: not-allowed;
}

.resend-tip {
 text-align: right;
 font-size: 13px;
 color: #7f8c8d;
 margin-top: -10px;
 margin-bottom: 20px;
}

.resend-tip a {
 color: #42c8a5;
 cursor: pointer;
 text-decoration: none;
}

.login-redirect {
 text-align: center;
 margin-top: 20px;
 font-size: 14px;
 color: #7f8c8d;
}

.login-redirect a {
 color: #42c8a5;
 cursor: pointer;
 font-weight: 500;
}

/* 添加过渡动画的 CSS */
.modal-fade-enter-active,
.modal-fade-leave-active {
 transition: opacity 1s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
 opacity: 0;
}
.error-tip {
 color: #ff4d4f;
 font-size: 12px;
 margin-top: 4px;
}

/* 禁用状态样式 */
button:disabled {
 opacity: 0.6;
 cursor: not-allowed;
}

/* 共享样式（与登录模态框相同） */
.modal-mask {
 position: fixed;
 top: 0;
 left: 0;
 width: 100vw;
 height: 100vh;
 background: rgba(255, 255, 255, 0.95);
 backdrop-filter: blur(8px);
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: 9999;
}

.modal-container {
 width: 380px;
 background: #fff;
 border-radius: 16px;
 box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
 overflow: hidden;
 position: relative;
}

.modal-header {
 padding: 24px 24px 16px;
 display: flex;
 justify-content: space-between;
 align-items: center;
}

.brand-logo {
 display: flex;
 flex-direction: column;
}

.brand-logo span {
 font-size: 24px;
 font-weight: 700;
 color: #2c3e50;
 letter-spacing: 1px;
}

.modal-close {
 font-size: 24px;
 color: #999;
 background: none;
 border: none;
 cursor: pointer;
 width: 40px;
 height: 40px;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: all 0.2s;
}

.modal-close:hover {
 background: #f5f7fa;
 color: #666;
}

.modal-body {
 padding: 0 24px 24px;
}

.register-tabs {
 display: flex;
 gap: 24px;
 margin-bottom: 24px;
 border-bottom: 1px solid #f0f2f5;
 padding-bottom: 16px;
}

.register-tabs button {
 padding: 8px 0;
 background: none;
 border: none;
 font-size: 16px;
 color: #8c9aaf;
 cursor: pointer;
 position: relative;
 font-weight: 500;
}

.register-tabs button.active {
 color: #42c8a5;
}

.register-tabs button.active::after {
 content: '';
 position: absolute;
 bottom: -17px;
 left: 0;
 right: 0;
 height: 3px;
 background: #42c8a5;
 border-radius: 2px;
}

.form-group {
 margin-bottom: 20px;
 position: relative;
}

.phone-input {
 display: flex;
 gap: 10px;
}

.phone-input select {
 width: 120px;
 padding: 14px 12px;
 border: 1px solid #e0e6ed;
 border-radius: 12px;
 font-size: 14px;
 appearance: none;
 background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%238c9aaf' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 12px center;
 background-size: 16px;
 cursor: pointer;
}

.phone-input input,
.form-group input {
 flex: 1;
 padding: 14px 0px;
 border: 1px solid #e0e6ed;
 border-radius: 12px;
 font-size: 15px;
 transition: all 0.2s;
}

.form-group input {
 width: 100%;
 /* padding-right: 0px; */
}

.phone-input input:focus,
.form-group input:focus {
 border-color: #42c8a5;
 box-shadow: 0 0 0 3px rgba(66, 200, 165, 0.1);
 outline: none;
}

.send-btn {
 position: absolute;
 right: 0;
 top: 0;
 height: 100%;
 padding: 0 16px;
 background: #f0f9f6;
 color: #42c8a5;
 border: 1px solid #e0f6ef;
 border-radius: 0 12px 12px 0;
 font-size: 14px;
 cursor: pointer;
 transition: all 0.2s;
}

.send-btn:hover {
 background: #e0f6ef;
}

.toggle-password {
 position: absolute;
 right: 12px;
 top: 50%;
 transform: translateY(-50%);
 background: none;
 border: none;
 color: #8c9aaf;
 cursor: pointer;
}

.register-btn {
 width: 100%;
 padding: 16px;
 background: linear-gradient(90deg, #42c8a5, #38a3d1);
 color: #fff;
 border: none;
 border-radius: 12px;
 font-size: 16px;
 font-weight: 500;
 cursor: pointer;
 transition: all 0.3s;
 box-shadow: 0 4px 12px rgba(66, 200, 165, 0.25);
 margin-top: 8px;
}

.register-btn:hover {
 transform: translateY(-2px);
 box-shadow: 0 6px 16px rgba(66, 200, 165, 0.35);
}

.third-party-register {
 margin: 24px 0;
}

.divider {
 position: relative;
 text-align: center;
 color: #8c9aaf;
 font-size: 13px;
 margin-bottom: 20px;
}

.divider::before,
.divider::after {
 content: '';
 position: absolute;
 top: 50%;
 width: 30%;
 height: 1px;
 background: linear-gradient(to right, transparent, #e0e6ed);
}

.divider::before {
 left: 0;
}

.divider::after {
 right: 0;
 background: linear-gradient(to left, transparent, #e0e6ed);
}

.third-buttons {
 display: flex;
 justify-content: center;
 gap: 24px;
}

.third-btn {
 display: flex;
 flex-direction: column;
 align-items: center;
 background: none;
 border: none;
 cursor: pointer;
 color: #666;
 font-size: 13px;
}

.third-btn .icon {
 width: 48px;
 height: 48px;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 margin-bottom: 8px;
 font-size: 24px;
 transition: all 0.3s;
}

.third-btn.wechat .icon {
 background: #f0f9f6;
 color: #42c8a5;
}

.third-btn.qq .icon {
 background: #f5f8ff;
 color: #38a3d1;
}

.third-btn:hover .icon {
 transform: translateY(-4px);
 box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.agreement {
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 13px;
 color: #8c9aaf;
}

.agreement input {
 margin-right: 6px;
 accent-color: #42c8a5;
}

.agreement a {
 color: #42c8a5;
 text-decoration: none;
 margin: 0 4px;
}

.modal-footer {
 padding: 16px 24px;
 background: #f8fafc;
 text-align: center;
}

.slogan {
 font-size: 13px;
 color: #a3b1c6;
 font-style: italic;
}

.icon {
 display: inline-block;
 font-style: normal;
}

.icon-eye::before {
 content: "👁️";
}

.icon-eye-off::before {
 content: "👁️‍🗨️";
}

.icon-wechat::before {
 content: "💬";
}

.icon-qq::before {
 content: "🐧";
}
.switch-tip {
  text-align: center;
  margin: 18px 0 0 0;
  color: #8c9aaf;
  font-size: 15px;
}
.switch-tip a {
  color: #42c8a5;
  margin-left: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.switch-tip a:hover {
  color: #38a3d1;
  text-decoration: underline;
}
</style>