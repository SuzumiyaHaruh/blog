<template>
  <div class="postItem">
    <img
        :src="'http://localhost:1337' + post.image"
        @click="$store.dispatch('showPostDetails',post.id)"
        alt=""
        width="100%"
        height="100%"
        style="background: #eee"
    />
    <div class="postInfo">
      <div class="postMeta">
        <the-avatar :src="post?.user?.avatar" class="avatar" width="34"
                    height="34"/>
        <span>{{ post?.user?.name }}</span>
        <span class="postPubDate">{{ dateToRelative(post.publishedAt) }}</span>
        <post-actions
            :likes="post.liked_bies"
            :comments="post.comments"
            :favors="post.favored_bies"
            :likedByMe="post.likedByMe"
            :favoredByMe="post.favoredByMe"
            @likeClick="$store.dispatch('toggleLike', post.id)"
            @favorClick="$store.dispatch('toggleFavor', post.id)"
            @commentsClick="
            this.$store.dispatch('showPostDetails', post.id)"
        />
      </div>
      <div class="postDesc">
        <p> {{ post.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

import TheAvatar from "./TheAvatar.vue";
import PostActions from "./PostActions.vue";
import {dateToRelative} from "../utils/date.js";
import {computed} from "vue";

const props = defineProps({
  post: {
    type: Object,
    default: {}
  }
})

// const image = computed(() => {
//   return 'http://localhost:1337/uploads/thumbnail_' + props.post.image.split('/uploads/')[1]
// })
// const avatar = computed(() => {
//   if (props.post?.user?.avatar) {
//     return 'http://localhost:1337' + props.post?.user?.avatar
//   } else {
//     return ''
//   }
// })
</script>

<style scoped>
.postItem {
  @apply rounded-xl;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.postInfo {
  @apply p-[24px]
}

.postItem > img {
  @apply w-full h-[200px] bg-[#eee] cursor-pointer rounded-t-xl;
  object-fit: cover;
}

.postMeta {
  display: grid;
  grid-template-areas:
    "avatar name actions"
    "pubDate pubDate actions";
  grid-template-columns: 42px 1fr 3fr;
  row-gap: 6px;
}

.postMeta .avatar {
  grid-area: avatar;
}

.postMeta .postPubDate {
  grid-area: pubDate;
  color: #9f9f9f;
  font-size: 14px;
}

.postActions {
  grid-area: actions;
  display: grid;

}

.postDesc {
  margin-top: 28px;
  white-space: pre-line;
}
</style>