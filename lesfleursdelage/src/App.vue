<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  watch: {
      '$route' (to, from) {
        if(to.meta.title){
          this.$store.commit('setTitle',to.meta.title)
        }
      }
  },
}
</script>
