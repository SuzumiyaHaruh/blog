<template>
  <!--  导航栏-->
  <nav class="navbar">
    <router-link class="" to="/">
      <img width="200" src="../assets/logo.png" alt=""/>
    </router-link>
    <div class="searchInput">
      <input @change="searchPosts" type="text"/>
      <the-icon icon="search"/>
    </div>
    <div class="navItems">
      <router-link to="/">
        <the-icon icon="home"/>
      </router-link>
      <button>
        <the-icon @click="publishPost" icon="publish"/>
      </button>
      <!--      下拉栏-->
      <div class="profileDropDown">
        <the-avatar :src="$store.state.user.user.avatar" @mouseover="isShow=true" width="42" height="42"
                    style="cursor: pointer"/>
        <div @mouseleave="isShow=false" v-if="isShow">
          <ul class="profileMenu">
            <li>
              <router-link to="/profile">个人主页</router-link>
            </li>
            <li>
              <router-link @click="logoutClick" to="/login">退出登录</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>

import TheIcon from "./TheIcon.vue";
import TheAvatar from "./TheAvatar.vue";
import {useStore} from "vuex";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {logout} from "../api/auth.js";

const router = useRouter()
const store = useStore()
const isShow = ref(false)

function publishPost() {
  store.commit('changeShowPostUpload', true)
}

async function searchPosts(e) {
  await store.dispatch('searchPost', e.target.value)
  await router.push({
    name: 'search_result',
    params: {
      term: e.target.value
    }
  })
}
function logoutClick(){
  logout()
}
</script>

<style scoped>
.navbar {
  @apply w-4/5 m-auto h-[80px] flex items-center justify-between;
}

.navbar svg {
  @apply w-[38px] h-[38px];
}

.searchInput {
  position: relative;
}

.searchInput input {
  @apply w-full px-[36px] py-[12px] bg-gray-100 rounded-2xl border-none;
}

.searchInput > svg {
  @apply absolute top-[14px] left-[12px];
}

.navItems {
  @apply flex justify-self-auto items-center gap-[24px];
}

.navItems > button {
  @apply border-none bg-none
}

.profileDropDown {
  position: relative;
}

.profileMenu {
  @apply absolute w-max p-[24px] list-none bg-white rounded right-0 grid translate-y-[18px];
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
  row-gap: 18px;
}

.profileMenu::before {
  @apply block absolute w-0 h-0 top-[-12px] right-[10px];
  content: "";
  display: block;
  border-bottom: 12px solid white;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
}

.profileMenu a,
.profileMenu li {
  @apply cursor-pointer decoration-0;
}

.profileMenu a:visited {
  color: initial;
}
</style>