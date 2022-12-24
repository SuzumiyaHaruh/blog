<template>
  <img :src="avatar||defaultAvatar" class="avatar" alt=""/>
</template>

<script setup>
import defaultAvatar from '../assets/avatar-1.jpg'
import {computed} from "vue";

 const props=defineProps({
  src: String,
  width: {
    type: Number,
    default: 34
  },
  height: {
    type: Number,
    default: 34
  },
})
const avatar = computed(() => {
    if (props.src){
      return 'http://localhost:1337' + props.src
    }
})
</script>

<style scoped>
.avatar {
  @apply rounded-[50%] bg-[#eee];
  width: v-bind(width+ 'px');
  height: v-bind(height+ 'px');
  object-fit: cover;
  object-position: top center;
}
</style>