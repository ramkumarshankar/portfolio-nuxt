<template>
  <div class="video-container" v-html="htmlContent">
  </div>
</template>

<script>
export default {
  name: "VideoEmbed",
  props: ["htmlContent"]
};
</script>

<style lang="stylus">
div.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;

  iframe, object, embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
