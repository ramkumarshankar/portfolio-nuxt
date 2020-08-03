<template>
  <section class="articles-list">
    <article v-for="article in articles" :key="article.id">
      <span class="meta">{{ $moment(article.published_date).format('Do MMMM YYYY') }}</span>
      <nuxt-link :to="'/writing/'+article.uid">
        <h2>{{ $prismic.asText(article.title) }}</h2>
      </nuxt-link>
      <p>{{ article.summary }}</p>
    </article>
  </section>
</template>

<script>
export default {
  name: "ArticlesList",
  props: {
    articles: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style lang="stylus" scoped>
section.articles-list {
  article {
    margin-bottom: 40px;
    a {
      color: $text-color

      @media only screen and (prefers-color-scheme: dark) {
        color: $text-color-dark;
      }

      h2 {
        margin-bottom: 10px;
        line-height: 1.3em;
      }
      p {
        margin-bottom: 0;
      }
    }
    span.meta {
      // margin-right: 10px
      font-size: 0.9em;
      // text-transform: uppercase;
      font-weight: 700;
      color: $tag-color;
      width: auto !important;
      border-radius: 2px;
      @media only screen and (prefers-color-scheme: dark) {
        color: $tag-color-dark;
      }
    }
  }
}
</style>