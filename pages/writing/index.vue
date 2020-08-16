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
  async asyncData({ $prismic, error }) {
    try {
      const response = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'article'),
        {
          fetch: [
            'article.title',
            'article.summary',
            'article.published_date',
            'article.uid',
          ],
          orderings: '[document.first_publication_date desc]',
          // keep page size large to get all articles
          pageSize: 100,
        }
      )
      const articles = response.results
      const articlesList = []
      articles.forEach((article) => {
        articlesList.push({
          uid: article.uid,
          title: article.data.title,
          summary: article.data.summary,
          published_date: new Date(article.first_publication_date),
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
