<template>
  <section class="articles-list">
    <p v-if="articles.length === 0">Nothing here yet. Check back later!</p>
    <article v-else v-for="article in articles" :key="article.id">
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
  margin-bottom: 50px;

  article {
    margin-bottom: 30px;
    a {
      color: $text-color

      @media only screen and (prefers-color-scheme: dark) {
        color: $text-color-dark;
      }

      h2 {
        margin-bottom: 5px;
        line-height: 1.3em;
      }
      p {
        margin-bottom: 0;
      }
    }
    span.meta {
      font-size: 0.9em;
      font-weight: 700;
      color: $tag-color;
      width: auto !important;
      margin-bottom: 10px;
      @media only screen and (prefers-color-scheme: dark) {
        color: $tag-color-dark;
      }
    }
  }
}
</style>