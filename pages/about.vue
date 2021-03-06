<template>
  <div class="about">
    <div class="container">
      <div class="page-heading-section">
        <h1>{{ $prismic.asText(title) }}</h1>
        <prismic-rich-text :field="highlight" />
      </div>
      <section class="about-section">
        <prismic-rich-text :field="bodyText" />
        <div class="page-heading-section">
          <prismic-rich-text :field="awardsHeading" />
        </div>
        <div class="awards-section">
          <div v-for="(award, index) in awards" :key="index" class="awards-row">
            <span
              >{{ $prismic.asText(award.award_name) }} /
              <span class="semibold">{{
                $prismic.asText(award.award_work)
              }}</span></span
            >
            <span class="awards-org">{{
              $prismic.asText(award.award_organisation)
            }}</span>
            <span class="awards-year">{{
              $prismic.asText(award.award_year)
            }}</span>
          </div>
        </div>
        <div class="page-heading-section">
          <prismic-rich-text :field="speakingHeading" />
        </div>
        <div class="speaking-section">
          <div
            v-for="(entry, index) in speakingEvents"
            :key="index"
            class="speaking-row"
          >
            <span>{{ $prismic.asText(entry.speaking_topic) }}</span>
            <span class="speaking-event">{{
              $prismic.asText(entry.speaking_event)
            }}</span>
            <span class="speaking-year">{{
              $prismic.asText(entry.speaking_year)
            }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'About',
  async asyncData({ $prismic, error }) {
    try {
      const result = await $prismic.api.getSingle('aboutpage')
      const document = result.data
      const docId = result.id
      const title = document.title
      const highlight = document.highlight
      const bodyText = document.text
      const awards = document.body[0].items
      const awardsHeading = document.body[0].primary.awards_heading
      const speakingEvents = document.body[1].items
      const speakingHeading = document.body[1].primary.speaking_heading
      return {
        docId,
        title,
        highlight,
        bodyText,
        awardsHeading,
        awards,
        speakingEvents,
        speakingHeading,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    return {
      titleTemplate: '%s | About',
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: `${this.baseTitle} | About`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.baseTitle} | About`,
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
div.about {
  section.about-section {
    margin-bottom: 80px;

    div.awards-section, div.speaking-section {
      display: grid;
      grid-template-columns: 1fr;

      div.awards-row, div.speaking-row {
        display: grid;
        grid-template-columns: 1fr 0.5fr 0.5fr;
        padding: 20px 0px;
        border-bottom: 1px solid #CCC;

        @media screen and (max-width: 600px) {
          grid-template-columns: 1fr !important;

          span.awards-org, span.awards-year, span.speaking-event, span.speaking-year {
            justify-self: start !important;
            color: $text-color-lighter;
          }
        }

        span.awards-org, span.awards-year, span.speaking-event, span.speaking-year {
          justify-self: end;
          text-align: right;
        }
      }
    }
  }
}
</style>
