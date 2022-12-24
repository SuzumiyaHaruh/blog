<template>
<div class="content">
  <slot/>
</div>
</template>

<script>
export default {
  name: "TheLayout"
}
</script>

<style scoped>
.content{
  @apply w-[80vw] max-w-[1124px] m-auto mt-[88px];
}
</style>