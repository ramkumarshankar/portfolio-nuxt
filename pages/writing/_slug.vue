<template>
  <article class="container article-page">
    <span class="meta">{{ $moment(published_date).format('Do MMMM YYYY') }}</span>
    <h1>{{ $prismic.asText(title) }}</h1>
    <p class="summary">{{ summary }}</p>
    <section
      v-for="(slice, index) in slices"
      :key="'slice-' + index"
      class="article-slice"
    >
      <template v-if="slice.slice_type === 'rich_text'">
        <prismic-rich-text :field="slice.primary.content"/>
      </template>
      <template v-else-if="slice.slice_type === 'code_snippet'">
        <div v-highlight v-for="(item, codeBlockIndex) in slice.items" :key="'codeBlock-' + codeBlockIndex">
          <pre :class="'language-'+item.language">
            <code>
{{ $prismic.asText(item.snippet) }}
            </code>
          </pre>
        </div>
      </template>
      <template v-else-if="slice.slice_type === 'image'">
        <prismic-image
          v-for="(item, imageSliceIndex) in slice.items"
          :key="'imageslice-' + imageSliceIndex"
          :field="item.image"
          class="imageslice-item"
        />
      </template>
    </section>
  </article>  
</template>

<script>
export default {
  name: 'Article',
  async asyncData({ $prismic, params, error, req }) {
    try {
      const result = await $prismic.api.getByUID('article', params.slug)
      const article = result.data
      const title = article.title
      const summary = article.summary
      const slices = article.body
      return {
        title: title,
        summary: summary,
        published_date: new Date(result.first_publication_date),
        slices: slices
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>
// Styles for the rich text areas are defined in layout.styl.
// Scoped css doesn't apply to rich text elements
// Some basic styles here
article.article-page {
  margin-bottom: 50px;
  span.meta {
    font-size: 0.9em;
    font-weight: 700;
    color: $tag-color;
    width: auto !important;
    border-radius: 2px;
    @media only screen and (prefers-color-scheme: dark) {
      color: $tag-color-dark;
    }
  }
  section.article-slice {
    margin: 30px 0px;
  }
}
</style>