<script setup>
import NavBar from "./components/NavBar.vue";
import TheLayout from "./components/TheLayout.vue";
</script>

<template>
  <template v-if="$route.name!=='login'">
    <header class="header">
      <nav-bar/>
    </header>
    <the-layout>
      <transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
      >
        <router-view/>
      </transition>
    </the-layout>
  </template>
  <template v-else>
    <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
    >
      <router-view/>
    </transition>
  </template>
  <footer class="footer" :class="{inside:$route.name==='login'}">&copy;Haruhi Suzumiya.All Rights Reserved</footer>
</template>

<style scoped>
.header {
  height: 80px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
}

.footer {
  text-align: center;
  padding: 38px 0;
  color: #828282;
}

.footer.inside {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
