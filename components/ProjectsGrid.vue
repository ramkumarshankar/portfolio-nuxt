<template>
  <transition-group name="projectlist" class="projects" tag="div">
    <project-tile
      v-for="(item, index) in projects"
      :key="'project-item-' + index"
      :featured="index === 0"
      :title="$prismic.richTextAsPlain(item.title)"
      :description="$prismic.richTextAsPlain(item.short_description)"
      :image="item.image"
      :link="item.link"
      :tags="item.tags"
    />
  </transition-group>
</template>

<script>
import ProjectTile from "@/components/ProjectTile.vue";

export default {
  name: "ProjectGrid",
  components: {
    ProjectTile
  },
  props: {
    projects: {
      type: Array,
      required: true,
      default: () => []
    }
  }
};
</script>

<style lang="stylus" scoped>
.projects {
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  column-gap: 20px;
  grid-column-gap: 20px;
  row-gap: 30px;
  grid-row-gap: 30px;
  margin-bottom: 30px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr !important;
  }
  .featured {
    grid-column-start: 1;
    grid-column-end: 3;

    @media screen and (max-width: 600px) {
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }
}


.projectlist-enter-active {
  transition: all 0.3s 0.2s;
}

.projectlist-leave-active {
  transition: all 0.2s;
}

.projectlist-enter, .projectlist-leave-to {
  opacity: 0;
  transform: scale3d(0.8, 0.8, 0.8);
}

.projectlist-move {
  transition: transform 0.5s;
}
</style>
