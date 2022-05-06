<template>
  <main-header></main-header>
  <router-view v-slot="{ Component }">
    <transition
      name="anim-page"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import MainHeader from "@/components/common/AppHeader";
export default {
  name: "App",
  components: {
    MainHeader,
  },
};
</script>

<style lang="scss">
</style>
