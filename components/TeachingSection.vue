<template>
  <div class="teaching-block">
    <h2>{{ title }}</h2>
    <prismic-rich-text :field="body"/>
  </div>
</template>

<script>
export default {
  name: "TeachingSection",
  props: ["title", "body"]
};
</script>

<style lang="stylus" scoped>
div.teaching-block {
  margin-top: 30px;
  border-bottom: solid 1px #DDD;
  padding-bottom: 15px;
  
  h3 {
    margin-bottom: 20px;
  }
}

</style>
