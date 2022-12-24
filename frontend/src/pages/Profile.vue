<template>
  <div>
    <div class="profileContainer">
      <the-avatar :src="user.avatar" :width="186" :height="186"/>
      <div class="profile">
        <p class="name">
          <span>{{ user.name }}</span>
          <router-link to="/profile/edit">编辑个人资料</router-link>
        </p>
        <p class="handle">@{{ user.username }}</p>
        <div class="description">
          <pre>
            {{ user.intro }}
          </pre>
          <p class="website"> {{ user.website }}/</p>
        </div>
      </div>
    </div>
    <div class="tabs">
      <div @click="currentTab=index" :class="{ active: index === currentTab }" class="tab"
           v-for="(tab,index) in tabs">
        <the-icon :icon="tab.icon"/>
        <p>{{ tab.label }}</p>
      </div>
    </div>
    <div class="tabContent">
      <p>{{ myPosts[currentTab].length }} 篇帖子</p>
      <div class="posts">
        <img v-for="post in myPosts[currentTab]"
             :src="'http://localhost:1337'+post.image"
             :key="post.id"
             class="postImage" alt=""/>
      </div>
    </div>

  </div>
</template>

<script setup>

import TheAvatar from "../components/TheAvatar.vue";
import TheIcon from "../components/TheIcon.vue";
import {useStore} from "vuex";
import {computed, reactive, ref, watch} from "vue";
import _default from "ant-design-vue/lib/vc-slick/inner-slider.js";
import {loadPostsByMe, loadPostsLikedOrFavoredByMe} from "../api/post.js";


const store = useStore();
const user = computed(() => store.state.user.user)

const tabs = ref([
  {
    label: "我的",
    icon: "posts",
  },
  {
    label: "赞过",
    icon: "like",
  },
  {
    label: "收藏",
    icon: "favorite",
  },
]);
const currentTab = ref(0);
const myPosts = reactive({
  0: [],
  1: [],
  2: [],
});

watch(currentTab, async () => {
  switch (currentTab.value) {
    case 0:
      if (myPosts[0].length === 0) {
        const arr = await loadPostsByMe();
        // await loadPostsByMe(res => {
        //   myPosts[0] = res.data
        // })
        // myPosts[0].map((post) => ({
        //   ...post,
        //   image: post?.image?.[0].url,
        // }));
        myPosts[0] = arr.data.map((post) => ({
          ...post,
          image: post?.attributes?.image.data[0]?.attributes?.url,
        }));
        console.log(arr)
      }
      break;
    case 1:
      if (myPosts[1].length === 0) {
        myPosts[1] = await loadPostsLikedOrFavoredByMe();
        console.log(myPosts[0])
      }
      break;
    case 2:
      if (myPosts[2].length === 0) {
        myPosts[2] = await loadPostsLikedOrFavoredByMe("favors");
      }
      break;
    default:
      return;
  }
}, {immediate: true})
</script>

<style scoped>
.profileContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10vw;
}

.avatar {
  justify-self: end;
}

.profile .name {
  display: flex;
  align-items: center;
}

.profile .name > span {
  font-size: 26px;
}

.profile .name > a {
  color: #A370F0;
  text-decoration: none;
  margin-left: 26px;
}

.profile .handle {
  margin-top: 4px;
  color: #848484;
}

.profile .description {
  margin-top: 26px;
  margin-bottom: 22px;
}

.tabs {
  display: flex;
  grid-template-columns: repeat(3, 88px);
  column-gap: 4vw;
  justify-content: center;
  margin-top: 7vmin;
  margin-bottom: 20px;
}

.tab {
  text-align: center;
  padding: 5px 12px;
  cursor: pointer;
}

.tab > svg {
  width: 32px;
  height: 32px;
  stroke: #8a9194;
  fill: #8a9194;
}

.tab.active {
  background: #f6f9fb;
  border-radius: 18px;
}

.tab.active > svg {
  stroke: #A370F0;
  fill: #A370F0;
}

.tab.active > p {
  color: #A370F0;
}

.tabContent > p {
  text-align: center;
  font-weight: 600;
  margin-bottom: 32px;
}

.posts {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
}

.postImage {
  width: 100%;
  height: 321px;
  background: #eee;
  object-fit: cover;
}
</style>