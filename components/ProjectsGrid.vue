<template>
  <transition-group name="projectlist" class="projects" tag="div" mode="out-in">
    <project-tile
      v-for="(item, index) in projects"
      :key="'project-item-' + index"
      :title="$prismic.asText(item.title)"
      :description="$prismic.asText(item.short_description)"
      :image="item.image"
      :slug="item.uid"
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
  grid-template-columns: repeat(3, 1fr);
  column-gap: 50px;
  grid-column-gap: 50px;
  row-gap: 50px;
  grid-row-gap: 50px;
  margin-bottom: 30px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr !important;
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
