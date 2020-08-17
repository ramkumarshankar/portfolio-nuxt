<template>
  <article class="container article-page">
    <span class="meta">{{
      $moment(article.createdAt).format('Do MMMM YYYY')
    }}</span>
    <nuxt-content :document="article" />
  </article>
</template>

<script>
export default {
  name: 'Article',
  head() {
    return {
      titleTemplate: '%s | Writing | ' + this.article.title,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.article.title,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.article.title,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.article.description,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.article.description,
        },
      ],
    }
  },
  async asyncData({ $content, params, error }) {
    try {
      const article = await $content('writing', params.slug).fetch()
      return { article }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="stylus">
// Not using 'scoped' here, scoped css doesn't work correctly to elments within nuxt-content
.article-page {
  margin-bottom: 50px;
  span.meta {
    font-size: 0.9em;
    font-weight: 700;
    color: $tag-color;
    width: auto !important;
    margin-bottom: 5px;
    @media only screen and (prefers-color-scheme: dark) {
      color: $tag-color-dark;
    }
  }

  h1 {
    margin-bottom: 0px;
    line-height: 1.3em;
  }

  code {
    font-family: $base-mono-font-family;
    background: $snow;
    border-radius: 2px;
    padding: 2px 5px;

    @media only screen and (prefers-color-scheme: dark) {
      background: $snow-dark;
    }
  }

  img {
    width: 100%;
    object-fit: cover;
  }

  div.embed {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    margin-bottom: 20px;

    iframe, object, embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
    }
  }
  pre {
    white-space: pre;
    margin-bottom: 20px;

    code {
      background: transparent;
      font-family: $base-mono-font-family;

      * {
        font-family: $base-mono-font-family;
      }
    }
  }
}
</style>
