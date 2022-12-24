<template>
  <the-modal @close="$store.dispatch('hidePstDetails')">
    <div class="postDetails">
      <img class="postImage" :src="'http://localhost:1337' + post.image" alt=""/>
      <div class="postMeta">
        <div class="author">
          <the-avatar :src="post.image"/>
          <span>{{ post?.user?.name }}</span>
        </div>
        <pre class="postDesc">{{ post.description }}</pre>
        <div class="comments">
          <div class="comment" v-for="comment in comments" :key="comment.id">
            <the-avatar :src="comment.user?.avatar"/>
            <span class="user">{{ comment.user?.name }}</span>
            <span class="commentDate">{{ dateToRelative(comment.pubDate) }}</span>
            <p class="commentContent">{{ comment.content }}</p>
          </div>
        </div>
        <div class="actions">
          <post-actions/>
          <span class="postPubDate">{{
              dateToRelative(post.publishedAt)
            }}</span>
          <input v-model="content" type="text" name="comment" id="" class="commentInput" placeholder="写一条评论吧！"/>
          <button class="releaseBtn" @click="ReleaseClick(content,post.id)">发布</button>
        </div>
      </div>
    </div>
  </the-modal>
</template>

<script setup>

import TheIcon from "./TheIcon.vue";
import TheAvatar from "./TheAvatar.vue";
import PostActions from "./PostActions.vue";
import TheModal from "./TheModal.vue";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import {dateToRelative} from "../utils/date.js";
import {comment} from "../store/comment/index.js";

const store = useStore()
const post = computed(() => store.getters.postDetails);
const comments = computed(() => store.state.comment.list)
const content = ref('')
// 发布评论
const ReleaseClick = (content, postId) => {
  store.dispatch('addComment', {content, postId: postId})
  content.value = ''
}
</script>

<style scoped>
.postDetails {
  @apply grid w-[80vw] h-[80vh];
  grid-template-columns: 1fr minmax(auto, 300px);
  grid-template-rows: minmax(0, 1fr);
}

.postImage {
  @apply w-full h-full object-cover;
}

.postMeta {
  @apply p-[24px] pt-[36px] grid items-start max-h-full h-full;
  grid-template-rows: max-content max-content 1fr max-content;
}

.author {
  @apply flex items-center gap-[10px];
}

.postDesc {
  @apply w-full whitespace-pre-wrap mt-[24px];
}

.comments {
  @apply grid items-start overflow-y-auto h-full;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  grid-gap: 28px;
}

.comment {
  @apply grid items-center;
  grid-template-areas:
    "avatar name date"
    "comment comment comment";
  grid-template-columns: 34px 1fr 1fr;
  column-gap: 10px;
  row-gap: 14px;
}

.commentDate {
  @apply justify-self-end text-[#a7a7a7];
  grid-area: date;
}

.commentContent {
  grid-area: comment;
}

.actions {
  @apply grid items-center;
  border-top: 1px solid #eaeaea;
  grid-template-columns: repeat(5, 1fr);
  margin: 20px -24px 0px -24px;
  padding: 20px 24px 0 24px;
  row-gap: 16px;
}

.postActions > :deep(svg) {
  transform: scale(0.8125);
}

.postPubDate {
  color: #9f9f9f;
  grid-column: 2 / 6;
  justify-self: end;
  font-size: 14px;
}

.commentInput {
  @apply bg-[#f7f7f7] rounded-[16px] border-none;
  grid-column: 1 / 4;
}

.commentInput::placeholder {
  @apply text-[#b9b9b9] border-none;
}

.commentPubBtn {
  @apply text-[#1da0ff] border-none bg-none ml-[20px] ;
  font-size: 16px;
}
.releaseBtn{
  @apply py-2 text-[#A370F0];
  /*display: inline-block;*/
  /*margin-left: 10px;*/
  font-size: 16px;
  margin-left: 20px;
  grid-column: 4 / 6;
}
</style>