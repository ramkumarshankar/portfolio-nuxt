<template>
  <div class="contact-block">
    <prismic-rich-text :field="text"/>
    <nuxt-link class="primary" to="/contact" tag="button">Get in touch</nuxt-link>
  </div>
</template>

<script>
export default {
  name: "ContactSection",
  props: {
    text: {
      type: Array,
      required: false
    }
  }
};
</script>

<style lang="stylus" scoped>
div.contact-block {
  margin-top: 30px;
  margin-bottom: 50px;
  button {
    margin-top: 5px;
  }
}

</style>
