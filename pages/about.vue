<template>
  <div class="about">
    <div class="container">
      <div class="about-headline">
        <h1>{{ $prismic.richTextAsPlain(title) }}</h1>
        <prismic-rich-text :field="highlight"/>
      </div>
      <img class="about-img-highlight" src="~/assets/images/undraw_resume.svg">
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
  div.about-headline {
    width: 70%;
    text-align: center;
    margin: 80px auto;

    h1 {
      font-family: $base-heading-font-family-serif;
    }

    @media screen and (max-width: 800px) {
      width: auto;
    }
  }

  img.about-img-highlight {
    position: absolute;
    top:-20px;
    right: 50px;
    transform: rotate(20deg);
    width: 150px;

    @media screen and (max-width: 800px) {
      display: none;
    }
  }
}
h1.page-headline {
  margin-top: 50px;
  margin-bottom: 20px;
}

section.about-section {
  margin-bottom: 80px;
}
</style>
