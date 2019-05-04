<template>
  <div class="project">
    <div class="container">
      <span v-for="(tag, index) in tags" :key="index" class="tag">
        {{ tag }}
        <span v-if="index !== tags.length -1">&nbsp;/&nbsp;</span>
      </span>
      <h1 class="page-headline">{{ $prismic.richTextAsPlain(title) }}</h1>
      <p>{{ $prismic.richTextAsPlain(description) }}</p>
      <div v-if="ctaTitle && ctaTitle.length !== 0" class="cta-section">
        <prismic-link :field="ctaLink" class="cta_link" style="margin-top:100px">
          <span>{{ $prismic.richTextAsPlain(ctaTitle) }}</span>
        </prismic-link>
      </div>
      <project-card v-if="titleImage" :title-image="titleImage" :project-card="projectCard"/>

      <section class="project-detail">
        <section
          v-for="(slice, index) in slices"
          :key="'slice-' + index"
          class="project-detail-slice"
        >
          <template v-if="slice.slice_type === 'paragraph'">
            <text-slice
              v-for="(item, paragraphSliceIndex) in slice.items"
              :key="'textslice-' + paragraphSliceIndex"
              :heading="$prismic.richTextAsPlain(item.heading)"
              :body="item.paragraph"
            />
          </template>
          <template v-else-if="slice.slice_type === 'image'">
            <prismic-image
              v-for="(item, imageSliceIndex) in slice.items"
              :key="'imageslice-' + imageSliceIndex"
              class="imageslice-item"
              :field="item.image"
            />
          </template>
          <template v-else-if="slice.slice_type === 'text_highlight'">
            <prismic-rich-text
              v-for="(item, highlightSliceIndex) in slice.items"
              :key="'highlightslice-' + highlightSliceIndex"
              :field="item.highlight"
            />
          </template>
          <template v-else-if="slice.slice_type === 'video'">
            <video-embed
              v-for="(item, videoSliceIndex) in slice.items"
              :key="'videoslice-' + videoSliceIndex"
              :html-content="item.video.html"
            />
          </template>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import prismicDOM from 'prismic-dom'
import ProjectCard from '@/components/ProjectCard.vue'
import TextSlice from '@/components/TextSlice.vue'
import VideoEmbed from '@/components/VideoEmbed.vue'

export default {
  name: 'Project',
  components: {
    ProjectCard,
    TextSlice,
    VideoEmbed
  },
  head() {
    return {
      titleTemplate: '%s | Work | ' + prismicDOM.RichText.asText(this.title)
    }
  },
  async asyncData({ app, params, error, req }) {
    try {
      const result = await app.api.getByUID('project', params.slug)
      const document = result.data
      const title = document.title
      const description = document.short_description
      const projectCard = document.project_card
      const titleImage = document.image
      const ctaLink = document.cta_link
      const ctaTitle = document.cta_text
      const slices = document.body
      const displayedTags = result.tags
      const index = displayedTags.indexOf('featured')
      if (index !== -1) {
        displayedTags.splice(index, 1)
      }
      return {
        tags: displayedTags,
        title: title,
        description: description,
        titleImage: titleImage,
        projectCard: projectCard,
        ctaTitle: ctaTitle,
        ctaLink: ctaLink,
        slices: slices
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style lang="stylus" scoped>
div.project {
  margin-top: 50px;

  section.project-detail {
    margin-bottom: 30px;
    min-height: 300px;
    position: relative;
  }

  section.project-detail-slice {
    margin: 30px 0px;
  }

  h1.page-headline {
    margin-bottom: 20px;
  }

  .tag {
    margin-top: 5px;
    // margin-right: 10px
    font-size: 0.75em;
    text-transform: uppercase;
    font-weight: 700;
    color: $tag-color;
    width: auto !important;
    border-radius: 2px;
  }

  img {
    width: 100%;
    object-fit: cover;
  }

  img.imageslice-item {
    margin-bottom: 20px;
  }

  div.cta-section {
    margin: 40px 0px;
  }

  .cta_link {
    background: $button-color;
    border: none;
    border-radius: 2px;
    padding: 10px 25px;
    font-size: 1.125em;
    transition: all 0.2s;
    color: #FFF;
    font-weight: 700;
    margin: 0;
    text-decoration: none;
  }

  .cta_link:hover {
    background: darken($button-color, 20);
  }
}
</style>
