<template>
  <div>
    <nav-bar />
    <nuxt />
    <page-footer />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import PageFooter from '@/components/PageFooter.vue'

export default {
  name: 'Layout',
  components: {
    NavBar,
    PageFooter
  }
}
</script>

<style lang="stylus">
html {
  box-sizing: border-box;

  @media only screen and (prefers-color-scheme: dark) {
    background: $page-background-dark;
  }
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
