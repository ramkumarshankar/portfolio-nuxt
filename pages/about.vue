<template>
  <div class="about">
    <div class="container">
      <div class="page-heading-section">
        <h1>{{ $prismic.richTextAsPlain(title) }}</h1>
        <prismic-rich-text :field="highlight"/>
      </div>
      <section class="about-section">
        <prismic-rich-text :field="bodyText"/>
        <div class="page-heading-section">
          <prismic-rich-text :field="awardsHeading" />
        </div>
        <div class="awards-section">
          <div v-for="(award, index) in awards" :key="index" class="awards-row">
            <span>{{ $prismic.richTextAsPlain(award.award_name) }} / <span class="semibold">{{ $prismic.richTextAsPlain(award.award_work) }}</span></span>
            <span class="awards-org">{{ $prismic.richTextAsPlain(award.award_organisation) }}</span>
            <span class="awards-year">{{ $prismic.richTextAsPlain(award.award_year) }}</span>
          </div>
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
      const awards = document.body[0].items;
      const awardsHeading = document.body[0].primary.awards_heading;
      return {
        docId: docId,
        title: title,
        highlight: highlight,
        bodyText: bodyText,
        awardsHeading: awardsHeading,
        awards: awards
      };
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style lang="stylus" scoped>
div.about {
  section.about-section {
    margin-bottom: 80px;

    div.awards-section {
      display: grid;
      grid-template-columns: 1fr;

      div.awards-row {
        display: grid;
        grid-template-columns: 1fr 0.5fr 0.5fr;
        padding: 20px 0px;
        border-bottom: 1px solid #CCC;

        @media screen and (max-width: 600px) {
          grid-template-columns: 1fr !important;

          span.awards-org, span.awards-year {
            justify-self: start !important;
            color: $text-color-lighter;
          }
        }

        span.awards-org {
          justify-self: end;
        }

        span.awards-year {
          justify-self: end;
        }
      }
    }
  }
}

</style>
