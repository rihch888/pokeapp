<template>
<div class="not-found">
<center><v-img
  alt="Pokemon 404"
  class="shrink mr-2"
  contain
  src="@/assets/404.png"
  transition="scale-transition"
  width="1000"
  @click="goHome"
/></center>
</div>
</template>
<script>
export default {
  name: 'PageNotFound',
  created() {
      
  },
  methods: {
        goHome() {
          this.$router.push('/home');
        },
    },
}
</script>
