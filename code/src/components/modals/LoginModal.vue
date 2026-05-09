<template>
     <transition name="modal-fade">
 <teleport to="body">
    <div class="modal-mask" v-show="show">
      <div class="modal-container">
        <div class="modal-header">
          <div class="brand-logo">
            <span>乐面</span>
          </div>
          <button class="modal-close" @click="closeModal">×</button>
        </div>
        
        <div class="modal-body">
          <!-- 登录方式切换 -->
          <div class="login-tabs">
            <button 
              :class="{ active: loginType === 'phone' }" 
              @click="loginType = 'phone'"
            >
              手机登录
            </button>
            <button 
              :class="{ active: loginType === 'email' }" 
              @click="loginType = 'email'"
            >
              邮箱登录
            </button>
          </div>

          <!-- 手机登录表单 -->
          <div v-if="loginType === 'phone'" class="form-group">
            <div class="phone-input">
              <select v-model="form.phone.countryCode">
                <option value="+86">CN +86</option>
                <option value="+1">US +1</option>
                <!-- 其他区号 -->
              </select>
              <input 
                type="tel" 
                placeholder="请输入您的手机号" 
                v-model="form.phone.phoneNumber"
                :disabled="isLoading"
              />
            </div>
            <div v-if="errors.phone" class="error-tip">{{ errors.phone }}</div>
          </div>
          <div v-if="loginType === 'phone'" class="form-group">
            <input 
              type="text" 
              placeholder="请输入验证码" 
              v-model="form.phone.code"
              :disabled="isLoading"
            />
            <button 
              class="send-btn"
              :disabled="smsCountdown > 0 || isLoading"
              @click="sendSMSCode"
            >
              {{ smsCountdown > 0 ? `${smsCountdown}秒后重发` : '获取验证码' }}
            </button>
          </div>

          <!-- 邮箱登录表单 -->
          <div v-if="loginType === 'email'" class="form-group">
            <input 
              type="email" 
              placeholder="请输入邮箱" 
              v-model="form.email.email"
              :disabled="isLoading"
            />
            <div v-if="errors.email" class="error-tip">{{ errors.email }}</div>
          </div>
          <div v-if="loginType === 'email'" class="form-group">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="请输入密码" 
              v-model="form.email.password"
              :disabled="isLoading"
            />
            <button class="toggle-password" @click="showPassword = !showPassword">
              <i :class="showPassword ? 'icon icon-eye-off' : 'icon icon-eye'"></i>
            </button>
            <div v-if="errors.password" class="error-tip">{{ errors.password }}</div>
          </div>

           <!-- 邮箱登录表单（新增验证码部分） -->
            <div v-if="loginType === 'email'" class="form-group captcha-group">
              <input 
                type="text" 
                placeholder="请输入验证码" 
                v-model="form.email.captchaCode"
                :disabled="isLoading"
              />
              <div class="captcha-container">
                <img 
                  :src="captchaBase64" 
                  alt="验证码" 
                  class="captcha-img"
                  @click="generateCaptcha" 
                />
                <button 
                  class="refresh-captcha"
                  @click="generateCaptcha()"
                  :disabled="isLoading"
                >
                  <i class="icon icon-refresh"></i>
                </button>
                <div v-if="errors.captcha" class="error-tip mt-2">{{ errors.captcha }}</div>
              </div>
            </div>

          <div class="form-tip" v-if="loginType === 'phone'">
            未注册的账号验证通过后将自动注册
          </div>

          <button 
            class="login-btn" 
            @click="handleLogin"
            :disabled="isLoading"
          >
            <span v-if="isLoading">登录中...</span>
            <span v-else>登录</span>
          </button>

          <!-- 第三方登录 -->
          <div class="third-party-login">
            <div class="divider">或使用以下方式登录</div>
            <div class="third-buttons">
              <button class="third-btn wechat" @click="openThirdPartyModal('wechat')">
                <i class="icon icon-wechat"></i>
                <span>微信</span>
              </button>
              <button class="third-btn qq" @click="openThirdPartyModal('qq')">
                <i class="icon icon-qq"></i>
                <span>QQ</span>
              </button>
              <button class="third-btn weibo" @click="openThirdPartyModal('weibo')">
                <i class="icon icon-weibo"></i>
                <span>微博</span>
              </button>
              <button class="third-btn github" @click="openThirdPartyModal('github')">
                <i class="icon icon-github"></i>
                <span>GitHub</span>
              </button>
            </div>
          </div>

          <!-- 用户协议 -->
          <div class="agreement">
            <input 
              type="checkbox" 
              v-model="agreed" 
              :disabled="isLoading"
            />
            <span>我已阅读并同意 <a href="#">用户协议</a></span>
          </div>
        </div>
        
        
        <div class="switch-tip">
          没有账号？<a @click="$emit('to-register')">去注册</a>
        </div>
        <div class="modal-footer">
          <div class="slogan">每时每刻，都有人在此成功！</div>
        </div>
      </div>
    </div>
  </teleport>
</transition>
<!-- 拟真第三方登录弹窗 -->
<div v-if="showThirdPartyModal" class="thirdparty-modal">
  <div class="thirdparty-overlay" @click.self="showThirdPartyModal = false"></div>
  <div class="thirdparty-container">
    <div class="thirdparty-header">
      <span>{{
        thirdPartyType === 'wechat' ? '微信' :
        thirdPartyType === 'qq' ? 'QQ' :
        thirdPartyType === 'weibo' ? '微博' :
        thirdPartyType === 'github' ? 'GitHub' :
        '第三方'
      }}授权登录</span>
    </div>
    <div class="thirdparty-body">
      <div v-if="thirdPartyType === 'wechat'">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=wechat-mock" alt="微信二维码" />
        <p>请使用微信扫码以继续</p>
      </div>
      <div v-else-if="thirdPartyType === 'qq'">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=qq-mock" alt="QQ二维码" />
        <p>请使用QQ扫码以继续</p>
      </div>
      <div v-else-if="thirdPartyType === 'weibo'">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=weibo-mock" alt="微博二维码" />
        <p>请使用微博扫码以继续</p>
      </div>
      <div v-else-if="thirdPartyType === 'github'">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=github-mock" alt="GitHub二维码" />
        <p>请使用GitHub扫码以继续</p>
      </div>
      <button class="thirdparty-confirm" @click="confirmThirdPartyLogin">确认授权</button>
      <button class="thirdparty-cancel" @click="showThirdPartyModal = false">取消</button>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, reactive, watch, } from 'vue'
// import axios from 'axios'
import { defineProps, defineEmits } from 'vue'

// 配置axios
/* const api = axios.create({
  baseURL: 'http://localhost:8989/api/v1/auth', // 调整基础URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})
 */
/* // 添加请求拦截器
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
 */
 const props = defineProps({
  show: Boolean // 接收父组件的显示状态
})

watch(() => props.show, (newVal) => {
  // 模态框显示时生成验证码（如果需要）
  if (newVal && loginType.value === 'email') {
    generateCaptcha()
  }
})
const loginType = ref('phone')
const showPassword = ref(false)
const agreed = ref(false)
const isLoading = ref(false)
const smsCountdown = ref(0)
let countdownTimer = null

// 验证码相关状态
const generatedSMSCode = ref('') // 手机验证码
const captchaText = ref('')     // 邮箱图片验证码文本
/*const captchaKey = ref('')*/
const captchaBase64 = ref('')

// 表单数据（新增邮箱验证码字段）
const form = reactive({
  phone: {
    countryCode: '+86',
    phoneNumber: '',
    code: ''
  },
  email: {
    email: '',
    password: '',
    captchaCode: '' // 验证码输入值
  }
})

// 错误信息（新增验证码错误）
const errors = reactive({
  phone: '',
  email: '',
  password: '',
  captcha: ''
})

// 验证规则（新增验证码验证）
const validatePhone = () => {
  errors.phone = ''
  if (!form.phone.phoneNumber) {
    errors.phone = '请输入手机号'
    return false
  }
  if (!/^1[3-9]\d{9}$/.test(form.phone.phoneNumber)) {
    errors.phone = '请输入有效的手机号'
    return false
  }
  return true
}

const validateEmail = () => {
  errors.email = ''
  if (!form.email.email) {
    errors.email = '请输入邮箱'
    return false
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.email)) {
    errors.email = '请输入有效的邮箱'
    return false
  }
  return true
}

const validatePassword = () => {
  errors.password = ''
  if (!form.email.password) {
    errors.password = '请输入密码'
    return false
  }
  if (form.email.password.length < 6) {
    errors.password = '密码长度至少6位'
    return false
  }
  return true
}

const validateCaptcha = () => {
  errors.captcha = ''
  if (!form.email.captchaCode) {
    errors.captcha = '请输入验证码'
    return false
  }
/*   if (!captchaKey.value) {
    errors.captcha = '验证码已过期，请刷新'
    return false
  } */
  return true
}

// 监听登录类型变化，自动获取验证码
watch(loginType, (newVal) => {
  if (newVal === 'email') {
    generateCaptcha()
  }
})
// 获取图片验证码
const generateCaptcha = () => {
  // 生成4位随机验证码（字母+数字）
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'
  let result = ''
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  captchaText.value = result
  
  // 2. 创建canvas绘制验证码图片
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 120
  canvas.height = 40
  
  // 背景
  ctx.fillStyle = '#f0f9f6'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // 绘制文字
  ctx.font = 'bold 24px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  // 添加干扰线
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = `#${Math.floor(Math.random()*16777215).toString(16)}`
    ctx.beginPath()
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.stroke()
  }
  
  // 添加噪点
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `#${Math.floor(Math.random()*16777215).toString(16)}`
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      1,
      1
    )
  }
  
  // 绘制文本（每个字符单独绘制，位置稍有偏移）
  for (let i = 0; i < result.length; i++) {
    ctx.fillStyle = `#${Math.floor(Math.random() * 0x7F7F7F).toString(16).padStart(6, '0')}`
    ctx.fillText(
      result.charAt(i),
      25 + i * 25 + Math.random() * 5,
      20 + (Math.random() - 0.5) * 10
    )
  }
  
  // 转换为Base64
  captchaBase64.value = canvas.toDataURL('image/png')
}
/* onMounted(() => {
  console.log(loginType.value === 'email')
  if (loginType.value === 'email') {
   
    fetchCaptcha()
  }
}) */




// 发送短信验证码（前端模拟）
const sendSMSCode = () => {
  if (!validatePhone()) return
  
  try {
    isLoading.value = true
    
    // 生成6位随机数字验证码
    generatedSMSCode.value = Math.floor(100000 + Math.random() * 900000).toString()
    
    // 2. 在右上角显示提示信息（模拟发送）
    const notification = document.createElement('div')
    notification.style.position = 'fixed'
    notification.style.top = '20px'
    notification.style.right = '20px'
    notification.style.padding = '15px 20px'
    notification.style.background = '#42c8a5'
    notification.style.color = 'white'
    notification.style.borderRadius = '8px'
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
    notification.style.zIndex = '10000'
    notification.style.fontSize = '14px'
    notification.innerHTML = `验证码已发送：<strong>${generatedSMSCode.value}</strong>`
    
    document.body.appendChild(notification)
    
    // 5秒后自动移除提示
    setTimeout(() => {
      notification.style.transition = 'opacity 0.5s'
      notification.style.opacity = '0'
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 500)
    }, 5000)
    
    // 开始倒计时
    smsCountdown.value = 60
    countdownTimer = setInterval(() => {
      smsCountdown.value--
      if (smsCountdown.value <= 0) {
        clearInterval(countdownTimer)
      }
    }, 1000)
  } catch (error) {
    alert('发送验证码失败，请重试')
  } finally {
    isLoading.value = false
  }
}

// 处理登录（前端验证）
const handleLogin = async () => {
  // 验证用户协议
  if (!agreed.value) {
    alert('请同意用户协议')
    return
  }
  
  // 表单验证
  let isValid = false
  if (loginType.value === 'phone') {
    isValid = validatePhone()
    if (!form.phone.code) {
      alert('请输入验证码')
      return
    }
  } else {
    isValid = validateEmail() && validatePassword() && validateCaptcha()
    if (!isValid) return
  }
  
  try {
    isLoading.value = true
    
    // 1. 验证码校验
    if (loginType.value === 'phone') {
      // 手机验证码校验
      if (form.phone.code !== generatedSMSCode.value) {
        alert('验证码错误，请重新输入')
        form.phone.code = '' // 清空输入框
        return
      }
    } else {
      // 邮箱验证码校验（不区分大小写）
      if (form.email.captchaCode.toLowerCase() !== captchaText.value.toLowerCase()) {
        errors.captcha = '验证码错误'
        form.email.captchaCode = '' // 清空输入框
        generateCaptcha() // 刷新验证码
        return
      }
    }
    
     // 模拟登录成功
    const token = 'simulated_token'
    const userInfo = {
      username: loginType.value === 'phone' 
        ? form.phone.phoneNumber 
        : form.email.email.split('@')[0],
      email: loginType.value === 'email' ? form.email.email : '',
      phone: loginType.value === 'phone' ? form.phone.phoneNumber : ''
    }
    
    // 存储用户信息到localStorage
    localStorage.setItem('authToken', token)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    
    closeModal()
    
    // 跳转到后台管理系统
    window.location.href = 'http://localhost:9000/'
    
  } catch (error) {
    alert('登录失败，请重试')
    if (loginType.value === 'email') {
      generateCaptcha()
    }
  } finally {
    isLoading.value = false
  }
}


// 使用defineEmits声明事件
const emit = defineEmits(['close', 'to-register'])
const closeModal = () => {
  emit('close') // 通知父组件关闭
  // 清除倒计时
  if (countdownTimer) {
    clearInterval(countdownTimer)
    smsCountdown.value = 0
  }
  
  // 重置表单（新增验证码相关重置）
  form.phone.phoneNumber = ''
  form.phone.code = ''
  form.email.email = ''
  form.email.password = ''
  form.email.captchaCode = ''
  agreed.value = false
  errors.phone = ''
  errors.email = ''
  errors.password = ''
  errors.captcha = ''
  // captchaKey.value = ''
  captchaBase64.value = ''
}

const showThirdPartyModal = ref(false)
const thirdPartyType = ref('') // 'wechat' | 'qq' | 'weibo' | 'github'

const openThirdPartyModal = (type) => {
  thirdPartyType.value = type
  showThirdPartyModal.value = true
}

const confirmThirdPartyLogin = () => {
  // 模拟第三方登录成功
  const token = 'thirdparty_token_' + thirdPartyType.value
  const userInfo = {
    username: {
      wechat: '微信用户',
      qq: 'QQ用户',
      weibo: '微博用户',
      github: 'GitHub用户',
    }[thirdPartyType.value] || '第三方用户',
    email: '',
    phone: ''
  }
  localStorage.setItem('authToken', token)
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
  showThirdPartyModal.value = false
  closeModal()
  window.location.href = 'http://localhost:9000/'
}

// defineExpose({
//   open: () => (isShow.value = true),
//   close: closeModal
// })
</script>

<style scoped>
/* 验证码输入框 */
.captcha-group {
  position: relative;
  display: flex;
  gap: 10px;
  flex-direction: column; 
}
.captcha-container {
  display: flex;
  align-items: center;
  gap: 8px;
}
.captcha-img {
  width: 120px;
  height: 40px;
  border: 1px solid #e0e6ed;
  border-radius: 12px;
  cursor: pointer;
  object-fit: cover;
}
.refresh-captcha {
  background: #f0f9f6;
  color: #42c8a5;
  border: 1px solid #e0f6ef;
  border-radius: 0 12px 12px 0;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.refresh-captcha:hover {
  background: #e0f6ef;
}
.icon-refresh::before {
  content: "🔄";
}
.mt-2 {
  margin-top: 8px;
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
/* 添加错误提示样式 */
.error-tip {
  color: #ff4d4f;
  font-size: 15px;
  margin-top: 4px;
  
  display: flex;
  justify-content: flex-end;
}

/* 禁用状态样式 */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
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
.login-tabs {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #f0f2f5;
  padding-bottom: 16px;
}

.login-tabs button {
  padding: 8px 0;
  background: none;
  border: none;
  font-size: 16px;
  color: #8c9aaf;
  cursor: pointer;
  position: relative;
  font-weight: 500;
}

.login-tabs button.active {
  color: #42c8a5;
}

.login-tabs button.active::after {
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

.form-tip {
  font-size: 13px;
  color: #8c9aaf;
  text-align: center;
  margin: -10px 0 20px;
}

.login-btn {
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
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(66, 200, 165, 0.35);
}

.third-party-login {
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
.icon-eye-off::before {
  content: "👁️‍🗨️";
}

.icon-eye::before {
  content: "👁️";
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
.thirdparty-modal {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  display: flex; justify-content: center; align-items: center; z-index: 10001;
}
.thirdparty-overlay {
  position: absolute; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.3);
}
.thirdparty-container {
  position: relative; background: #fff; border-radius: 16px; padding: 32px 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15); z-index: 2; width: 320px; text-align: center;
}
.thirdparty-header { font-size: 20px; font-weight: bold; margin-bottom: 16px; }
.thirdparty-body img { width: 150px; height: 150px; margin: 0 auto 12px; }
.thirdparty-confirm {
  width: 100%; padding: 12px; background: #42c8a5; color: #fff; border: none;
  border-radius: 8px; font-size: 16px; margin-top: 16px; cursor: pointer;
}
.thirdparty-cancel {
  width: 100%; padding: 10px; background: #f5f7fa; color: #666; border: none;
  border-radius: 8px; font-size: 15px; margin-top: 8px; cursor: pointer;
}
.icon-weibo::before { content: "🌟"; }
.icon-github::before { content: "🐱"; }
</style>