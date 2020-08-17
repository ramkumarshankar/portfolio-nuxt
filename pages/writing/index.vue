<template>
  <div class="writing">
    <div class="container">
      <h1 class="page-headline">Writing</h1>
      <ArticlesList :articles="articles" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticlesList from '@/components/ArticlesList.vue'
export default {
  name: 'Writing',
  components: {
    ArticlesList,
  },
  head() {
    return {
      titleTemplate: '%s | Writing',
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: `${this.baseTitle} | Writing`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.baseTitle} | Writing`,
        },
      ],
    }
  },
  computed: {
    ...mapState({
      baseTitle: (state) => state.baseTitle,
    }),
  },
  async asyncData({ $content, error }) {
    try {
      const articles = await $content('writing').fetch()
      const articlesList = []
      articles.forEach((article) => {
        articlesList.push({
          slug: article.slug,
          title: article.title,
          description: article.description,
          published_date: new Date(article.createdAt),
        })
      })
      return {
        articles: articlesList,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="stylus" scoped>
div.writing {
  h1.page-headline {
    margin-top: 50px;
    margin-bottom: 20px;
  }
}
</style>
