<template>
  <h1>Contact</h1>
</template>

<script>
export default {
  name: 'Contact',
  asyncData(context) {
    console.log(context);
  },
  created ()  {
    console.log(this.$store)
  }
}
</script>

<style>

</style>
