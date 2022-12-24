<template>
  <div class="loginPage">
    <div class="loginForm">
      <img :width="200" :height="200" src="src/assets/logo.png" alt="">
      <form @submit.prevent>
        <input name="email" type="email" placeholder="邮箱" v-model="form.email"/>
        <input v-if="!isLogin" type="text" placeholder="用户名" v-model="form.username"/>
        <input type="password" placeholder="密码" v-model="form.password"/>
        <input v-if="!isLogin" type="password" placeholder="确认密码" v-model="form.confirmPassword"/>
        <button class="cssbuttons-io-button" @click="isLogin?login():register()">
          {{ isLogin ? '登录' : '注册' }}
          <div class="icon">
            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"></path>
            </svg>
          </div>
        </button>
        <p @click="isLogin =!isLogin" class="info">
          {{ isLogin ? '还没账号？立即注册' : '已有账号？点击登录' }}
        </p>
        <div class="agreement" v-if="!isLogin">
          <input v-model="form.agreementChecked" type="checkbox"/>勾选表示同意隐私协议和使用规范
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {message} from 'ant-design-vue';
const store = useStore()
const router = useRouter()
const isLogin = ref(true)

// 表单对象数据
const form = reactive({
  email: null, // 邮箱
  username: null, // 用户名
  password: null, //密码
  confirmPassword: null, //验证密码
  agreementChecked: false //勾选协议
})
//注册
async function register() {
  if (!form.agreementChecked) {
    message.error('请勾选阅读并用户协议');
    return;
  }
  else if (!form.username||!form.password||!form.confirmPassword||!form.email) {
    message.error('登录信息不能为空！');
    return;
  }
  else if(form.confirmPassword!==form.password){
    message.error('两次密码不一致！');
    return;
  }
  await store.dispatch("registerUser", {
    email: form.email,
    username: form.username,
    password: form.password,
  })
}

//登录
async function login() {
  if (!form.email||!form.password){
    message.error('登录信息不能为空！');
    return;
  }
  await store.dispatch("loginUser", {
    email: form.email,
    password: form.password,
  })
}
</script>

<style scoped>
.loginPage {
  background-image: linear-gradient(112.5deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%, rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%, rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%, rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%, rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%, rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%, rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%), linear-gradient(157.5deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%, rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%, rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%, rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%, rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%, rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%, rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%), linear-gradient(135deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%, rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%, rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%, rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%, rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%, rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%, rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%), linear-gradient(90deg, rgb(195, 195, 195), rgb(228, 228, 228));
  background-blend-mode: overlay, overlay, overlay, normal;
  @apply w-screen h-screen flex justify-center items-center;
}

.loginForm {
  @apply bg-white flex  justify-center items-center w-[50vw] h-[70vh] rounded-xl;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  flex-direction: column;
}

.loginForm > form {
  @apply flex  justify-center items-center;
  flex-direction: column;
}

.loginForm > form > input {
  @apply bg-gray-100 py-2 px-4 rounded-xl;
}

.loginForm > form > input, button, p {
  @apply my-2;

}

.loginForm > form > p {
  @apply cursor-pointer;
  color: #A370F0;
}

.cssbuttons-io-button {
  background: #A370F0;
  color: white;
  font-family: inherit;
  padding: 0.35em;
  padding-left: 1.2em;
  font-size: 17px;
  font-weight: 500;
  border-radius: 0.9em;
  border: none;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  box-shadow: inset 0 0 1.6em -0.6em #714da6;
  overflow: hidden;
  position: relative;
  height: 2.8em;
  padding-right: 3.3em;
}

.cssbuttons-io-button .icon {
  background: white;
  margin-left: 1em;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.2em;
  width: 2.2em;
  border-radius: 0.7em;
  box-shadow: 0.1em 0.1em 0.6em 0.2em #7b52b9;
  right: 0.3em;
  transition: all 0.3s;
}

.cssbuttons-io-button:hover .icon {
  width: calc(100% - 0.6em);
}

.cssbuttons-io-button .icon svg {
  width: 1.1em;
  transition: transform 0.3s;
  color: #7b52b9;
}

.cssbuttons-io-button:hover .icon svg {
  transform: translateX(0.1em);
}

.cssbuttons-io-button:active .icon {
  transform: scale(0.95);
}

.agreement {
  color: #a1a1a1;
  display: flex;
  font-size: 12px;
  align-items: center;
  gap: 6px;
}

.loginForm > form > .error {
  border: 2px solid red;
}
</style>