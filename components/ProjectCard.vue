<template>
  <div :class="projectCard.length > 0 ? 'dark': 'transparent' " class="project-card">
    <prismic-image :field="titleImage" class="title-image"/>
    <div v-if="projectCard.length > 0" class="project-card-details">
      <div v-for="(block, index) in projectCard" :key="index" class="card-block">
        <span class="card-header">{{ $prismic.richTextAsPlain(block.card_field_title) }}</span>
        <span>{{ $prismic.richTextAsPlain(block.card_field_text) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    titleImage: {
      type: Object,
      required: true,
      default: () => {}
    },
    projectCard: {
      type: Array,
      required: false,
      default: () => []
    }
  }
};
</script>

<style lang="stylus" scoped>
.transparent {
  background: transparent;
}

.dark {
  background: #1b1b1b;
}

.project-card {
  border-radius: 2px;
  border: $image-border-style;

  img {
    width: 100%;
    object-fit: cover;
    border-bottom: solid 1px white;
  }

  .project-card-details {
    display: grid;
    padding: 30px;
    grid-gap: 20px;
    grid-template-columns: repeat(2, 0.5fr);

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr !important;
    }

    .card-block {
      span {
        display: block;
        color: white;
        width: auto !important;
      }

      span.card-header {
        font-size: 0.75em;
        color: #9B9B9B;
        text-transform: uppercase;
        font-weight: 700;
      }
    }
  }
}
</style>
