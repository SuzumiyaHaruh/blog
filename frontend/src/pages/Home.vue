<template>
  <div>
    <post-list>
      <post-item v-for="post in posts" :post="post" :key="posts.id"></post-item>
    </post-list>
    <!--    弹窗-->
    <post-details v-if="showPostDetails"/>
    <post-upload v-if="showPostUpload"/>
  </div>
</template>

<script setup>

import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import PostUpload from "../components/PostUpload.vue";
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import PostDetails from "../components/PostDetails.vue";

const store = useStore()

const showPostUpload = computed(() => store.state.showPostUpload)
const showPostDetails = computed(() => store.state.showPostDetails)
const posts = computed(() => store.state.post.list)

onMounted(() => {
  store.dispatch('loadAllPosts')
})
</script>

<style scoped>

</style>