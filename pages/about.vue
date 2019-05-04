<template>
  <div class="about">
    <div class="container">
      <h1 class="page-headline">{{ $prismic.richTextAsPlain(title) }}</h1>
      <section class="about-section">
        <div>
          <prismic-rich-text :field="highlight"/>
        </div>
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
h1.page-headline {
  margin-top: 50px;
  margin-bottom: 20px;
}

section.about-section {
  position: relative;
  column-gap: 20px;
  grid-column-gap: 20px;
  row-gap: 20px;
  grid-row-gap: 20px;
  min-height: 300px;
  display: grid;
  grid-template-columns: 0.33fr 0.66fr;
  margin-bottom: 30px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr !important;
  }
}
</style>
