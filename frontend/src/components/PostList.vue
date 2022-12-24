<template>
  <div class="postList">
    <slot/>
  </div>
</template>

<script setup>

</script>

<style scoped>

.postList {
  @apply grid grid-cols-3 gap-6;
}
</style>