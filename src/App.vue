<template>
  <div id="app">
    <AppHeader />
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
</script>

<style lang="scss">
#app {
  font-family: Helvetica, Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  display: flex;
  flex: 1 1 auto;

  &__home {
    margin: auto;
  }
}
</style>
