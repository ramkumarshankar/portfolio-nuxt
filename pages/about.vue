<template>
  <div class="about">
    <div class="container">
      <div class="page-heading-section">
        <h1>{{ $prismic.richTextAsPlain(title) }}</h1>
        <prismic-rich-text :field="highlight"/>
      </div>
      <section class="about-section">
        <div>
          <prismic-rich-text :field="bodyText"/>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  head() {
    return {
      titleTemplate: '%s | About'
    }
  },
  async asyncData({app, error, req}) {
    try {
      const result = await app.api.getSingle("aboutpage")
      const document = result.data
      const docId = result.id;
      const title = document.title;
      const highlight = document.highlight;
      const bodyText = document.text;
      return {
        docId: docId,
        title: title,
        highlight: highlight,
        bodyText: bodyText
      };
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style lang="stylus" scoped>
div.about {
  position: relative;
}

section.about-section {
  margin-bottom: 80px;
}
</style>
