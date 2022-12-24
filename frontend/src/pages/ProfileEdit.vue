<template>
  <div>
    <h2 class="title">编辑个人资料</h2>
    <div class="changeAvatar">
      <the-avatar :src="profileData.avatar" :width="48" :height="48"/>
      <the-button >修改头像</the-button>
      <input @change="uploadAvatar" type="file" class="inputFile"/>
    </div>
    <form class="profileForm" @submit.prevent="updateUser">
      <label for="username">用户名:</label>
      <input v-model="profileData.username" type="text"/>
      <label for="name">昵称:</label>
      <input v-model="profileData.name" type="text"/>
      <label for="intro">简介</label>
      <textarea v-model="profileData.intro" rows="12"/>
      <label for="mobilePhone">手机:</label>
      <input v-model="profileData.mobilePhone" type="text"/>
      <label>性别:</label>
      <div class="genderRadios">
        <input v-model="profileData.gender" type="radio" name="gender" id="M" value="M"/>男
        <input v-model="profileData.gender" type="radio" name="gender" id="F" value="F"/>女
      </div>
      <label for="website">网站:</label>
      <input v-model="profileData.website" type="text"/>
      <div class="actions">
        <the-button @click.prevent="router.push('/profile')" type="reset" reverse>取消</the-button>
        <the-button type="submit">确认</the-button>
      </div>
    </form>
  </div>
</template>

<script setup>

import TheAvatar from "../components/TheAvatar.vue";
import TheButton from "../components/TheButton.vue";
import {computed, reactive} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {uploadFile} from "../api/file.js";

const store = useStore()
const router = useRouter()

const user = computed(() => store.state.user.user);
const profileData = reactive({
  avatar: user.value.avatar,
  username: user.value.username,
  name: user.value.name,
  intro: user.value.intro,
  mobilePhone: user.value.mobilePhone,
  gender: user.value.gender,
  website: user.value.website,
});

//更新头像
async function uploadAvatar(e) {
  const file = e.target.files[0];
  profileData.avatar = await uploadFile(file);
}

//更新用户
async function updateUser() {
  console.log(profileData)
  await store.dispatch("updateUser", profileData).then(() => {
    router.push('/profile')
  });
}
</script>

<style scoped>
.title {
  margin-bottom: 42px;
  font-size: 24px;
  font-weight: 600;
}

.changeAvatar {
  display: flex;
  align-items: center;
  position: relative;
}

.changeAvatar .button {
  margin-left: 26px;
}

.inputFile {
  opacity: 0;
  position: absolute;
  cursor: pointer;
  top: 0;
  bottom: 0;
}

.profileForm {
  display: grid;
  grid-template-columns: max-content 1fr;
  row-gap: 32px;
  column-gap: 10px;
  margin-top: 38px;
}

.profileForm > label {
  grid-column: 1 / 2;
  justify-self: end;
  position: relative;
  /*top: px;*/
}

.profileForm > input, textarea {
  background: #f3f4f6;
  border-radius: 10px;
}

.profileForm .actions {
  grid-column: 1 / 3;
  justify-self: end;
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
}
</style>