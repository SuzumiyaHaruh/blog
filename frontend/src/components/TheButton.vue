<template>
<button class="button"  :class="{ primary: color === 'primary', reverse }">
  <slot/>
</button>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: "primary",
  },
  reverse: Boolean,
});
</script>

<style scoped>
.button {
  border-radius: 8px;
  padding: 10px 32px;
  border: none;
  color: white;
  font-size: 16px;
}

.button.primary {
  background: #A370F0;
}

.button.reverse {
  background: none;
  border: 1px solid #e8e8e8;
  color: initial;
}
</style>