<template>
  <div class="bg-gradient-gray text-center fullscreen flex flex-center">

  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('logoutUser').then(() =>  {
      location.reload();
    });

  },
  name: 'PageIndex'
}
</script>
