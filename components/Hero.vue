<template>
  <div class="hero-section">
    <canvas id="heroCanvas"></canvas>
    <div class="container">
      <h1 class="page-headline">{{ headline }}</h1>
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
    this.canvasAnimation.draw();
  }
};
</script>

<style lang="stylus" scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  padding: 150px 0px 150px 0px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
  position: relative;
}

h1.page-headline {
  width: 70%;
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
