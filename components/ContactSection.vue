<template>
  <div class="contact-block">
    <div class="contact-heading">
      <h1>{{ $prismic.richTextAsPlain(heading) }}</h1>
      <prismic-rich-text :field="text" />
    </div>
    <contact-form />
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue"

export default {
  name: "ContactSection",
  components: {
    ContactForm
  },
  props: {
    heading: {
      type: Array,
      default: () => [],
      required: false
    },
    text: {
      type: Array,
      default: () => [],
      required: false
    }
  }
};
</script>

<style lang="stylus" scoped>
div.contact-block {
  border: 2px solid darken($snow, 10);
  border-radius: 2px;
  background: $snow;
  padding: 50px;
  margin-top: 30px;
  margin-bottom: 50px;

  button {
    margin-top: 5px;
  }

  div.contact-heading {
    text-align: center;
    width: 70%;
    margin: 0px auto 50px auto;
    margin-bottom: 50px;
    @media screen and (max-width: 800px) {
      width: auto;
    }
    h1 {
      font-family: $base-heading-font-family-serif;
    }
  }
}

</style>
