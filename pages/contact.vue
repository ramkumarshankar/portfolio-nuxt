<template>
  <div class="contact">
    <div class="container">
      <div class="page-heading-section">
        <h1>{{ $prismic.richTextAsPlain(title) }}</h1>
        <prismic-rich-text :field="subheading"/>
      </div>
      <section class="contact-section">
        <contact-form />
      </section>
      <img src="~/assets/images/undraw_mail_box.svg">
    </div>
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";

export default {
  name: 'Contact',
  head() {
    return {
      titleTemplate: '%s | Contact'
    }
  },
  components: {
    ContactForm
  },
  async asyncData({ app, error, req }) {
    try {
      const result = await app.api.getSingle('contactpage')
      const document = result.data
      const docId = result.id
      const title = document.title
      const subheading = document.subheading;
      return {
        docId: docId,
        title: title,
        subheading: subheading
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style lang="stylus" scoped>
div.contact {
  position: relative;
  padding-bottom: 30px;
  img {
    position: absolute;
    right: 40px;
    bottom: 0px;
    width: 130px;
    transform: rotate(10deg);

    @media screen and (max-width: 800px) {
      display: none;
    }
  }
  
  section.contact-section {
    position: relative;
    min-height: 300px;
  }
}
</style>