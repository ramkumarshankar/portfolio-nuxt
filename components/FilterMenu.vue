<template>
  <div class="filterMenu">
    <ul>
      <li v-for="(item, index) in tags" v-bind:key="index">
        <a
          v-bind:class="[index === activeIndex ? 'active' : '']"
          v-on:click="updateSelection(index, item)"
        >{{ item }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FilterMenu",
  props: {
    activeIndexFromParent: {
      type: Number,
      default: 0
    },
    tags: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      filterItems: [],
      activeIndex: null
    };
  },
  methods: {
    updateSelection(index, item) {
      this.activeIndex = index;
      this.$emit("filterChanged", item);
    }
  },
  created () {
    this.activeIndex = 0;
  }
};
</script>

<style lang="stylus" scoped>
@import '../styles/main.styl';

div.filterMenu {
  margin-bottom: 50px;
  ul {
    padding: 0;
    li {
      display: inline-block;
      margin-right: 20px;
      margin-bottom: 10px;
      text-transform: uppercase;
      font-weight: 700;

      a {
        cursor: pointer;
        padding-bottom: 5px;
        color: #9b9b9b;

        &.active {
          color: $link-color;
          box-shadow: inset 0px -2px 0 0 $link-color;
          transition: box-shadow 0.2s ease-out;
        }

        &:hover {
          color: $link-color;
          box-shadow: inset 0px -2px 0 0 $link-color;
          transition: box-shadow 0.2s ease-out;
        }
      }
    }
  }
}

</style>
