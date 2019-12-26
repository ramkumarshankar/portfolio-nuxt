<template>
  <div ref="hero" class="hero-section">
    <canvas id="heroCanvas"></canvas>
    <div class="container">
      <h1 class="hero-headline">{{ headline }}</h1>
    </div>
  </div>
</template>

<script>
import HeroCanvas from "@/components/HeroCanvas";

export default {
  name: "Hero",
  props: ["headline"],
  data() {
    return {
      canvasAnimation: null
    };
  },
  mounted() {
    const heroCanvas = document.getElementById("heroCanvas");
    heroCanvas.width =
      heroCanvas.parentElement.clientWidth * window.devicePixelRatio;
    heroCanvas.height =
      heroCanvas.parentElement.clientHeight * window.devicePixelRatio;
    this.canvasAnimation = new HeroCanvas(heroCanvas);
    this.canvasAnimation.setup();
    console.log(this.$refs);
    this.$refs.hero.addEventListener('mousemove', evt => {
      this.canvasAnimation.onMouseMove(evt.clientX, evt.clientY)
    })
    this.$refs.hero.addEventListener('mouseout', evt => {
      this.canvasAnimation.onMouseOut()
    })
    this.canvasAnimation.draw();
  }
};
</script>

<style lang="stylus" scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  padding: 200px 0px;
  // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
  position: relative;
}

h1.hero-headline {
  font-family: $base-heading-font-family-serif;
  font-weight: 200;
  width: 100%;
  color: #FFF;

  @media screen and (max-width: 800px) {
    width: 100% !important;
  }
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -100;
}
</style>
