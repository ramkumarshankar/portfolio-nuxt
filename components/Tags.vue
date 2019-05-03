<template>
  <div class="tags">
    <span class="tag" v-for="(tag, index) in displayedTags" v-bind:key="index">{{ tag }}</span>
  </div>
</template>

<script>
export default {
  name: "Tags",
  props: {
    tags: {
      type: Array,
      required: false
    }
  },
  computed: {
    displayedTags() {
      if (this.tags) {
        const displayedTags = this.tags;
        const index = displayedTags.indexOf("featured");
        if (index !== -1) {
          displayedTags.splice(index, 1);
        }
        return displayedTags;
      }
      return [];
    }
  }
};
</script>

<style lang="stylus" scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  .tag {
    padding: 5px 10px;
    margin-top: 5px;
    margin-right: 10px;
    font-size: 0.75em;
    text-transform: uppercase;
    font-weight: 500;
    background-color: #4A4A4A;
    color: #FFF;
    width: auto !important;
    border-radius: 2px;
  }
}

</style>
