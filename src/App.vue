<template>
  <v-app class="app" :class="mode">
    <v-main>
    <Navigation :mode="mode" @toggle="toggle"/>
      <router-view/>
    </v-main>
  </v-app>
</template>
<script>
import Navigation from './components/layout/Navigation';
export default {
  name: 'App',
  data() {
    return {
      mode: 'light'
    }
  },
  components: {
    Navigation
  },
  methods: {
    toggle () {
      if (this.mode === "dark") {
        this.mode = "light";
      } else {
        this.mode = "dark";
      }
    }
  },
};
</script>
<style lang="scss" src="./scss/main.scss"></style>