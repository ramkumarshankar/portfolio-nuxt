<template>
  <div class="project">
    <div class="container">
      <span v-for="(tag, index) in tags" :key="index" class="tag">
        {{ tag }}
        <span v-if="index !== tags.length - 1">&nbsp;/&nbsp;</span>
      </span>
      <h1 class="page-headline">{{ $prismic.asText(title) }}</h1>
      <p>{{ $prismic.asText(description) }}</p>
      <div v-if="ctaTitle && ctaTitle.length !== 0" class="cta-section">
        <prismic-link
          :field="ctaLink"
          class="cta_link"
          style="margin-top: 100px;"
        >
          <span>{{ ctaTitle }}</span>
        </prismic-link>
      </div>
      <project-card
        v-if="titleImage"
        :title-image="titleImage"
        :project-card="projectCard"
      />

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
              :heading="$prismic.asText(item.heading)"
              :body="item.paragraph"
            />
          </template>
          <template v-else-if="slice.slice_type === 'image'">
            <prismic-image
              v-for="(item, imageSliceIndex) in slice.items"
              :key="'imageslice-' + imageSliceIndex"
              :field="item.image"
              class="imageslice-item"
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
import { mapState } from 'vuex'
import prismicDOM from 'prismic-dom'
import ProjectCard from '@/components/ProjectCard.vue'
import TextSlice from '@/components/TextSlice.vue'
import VideoEmbed from '@/components/VideoEmbed.vue'

export default {
  name: 'Project',
  components: {
    ProjectCard,
    TextSlice,
    VideoEmbed,
  },
  async asyncData({ $prismic, params, error }) {
    try {
      const result = await $prismic.api.getByUID('project', params.slug)
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
        title,
        description,
        titleImage,
        projectCard,
        ctaTitle,
        ctaLink,
        slices,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    return {
      titleTemplate: '%s | Work | ' + prismicDOM.RichText.asText(this.title),
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: `${this.baseTitle} | ${prismicDOM.RichText.asText(
            this.title
          )}`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.baseTitle} | ${prismicDOM.RichText.asText(
            this.title
          )}`,
        },
        {
          hid: 'description',
          name: 'description',
          content: `${prismicDOM.RichText.asText(this.description)}`,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: `${prismicDOM.RichText.asText(this.description)}`,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: `${this.titleImage.url}`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `${this.titleImage.url}`,
        },
        {
          hid: 'og:image:alt',
          name: 'og:image:alt',
          content: `${this.titleImage.alt}`,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: `${this.titleImage.alt}`,
        },
      ],
    }
  },
  computed: {
    ...mapState({
      baseTitle: (state) => state.baseTitle,
    }),
  },
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
    margin-top: 0px;
    margin-bottom: 20px;
  }

  .tag {
    margin-top: 5px;
    // margin-right: 10px
    font-size: 0.9em;
    text-transform: uppercase;
    font-weight: 700;
    color: $tag-color;
    width: auto !important;
    border-radius: 2px;
    @media only screen and (prefers-color-scheme: dark) {
      color: $tag-color-dark;
    }
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
