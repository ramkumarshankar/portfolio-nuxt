<template>
  <section ref="hero" class="hero-section">
    <canvas id="heroCanvas"></canvas>
    <div class="container">
      <h1 class="hero-headline">{{ headline }}</h1>
    </div>
  </section>
</template>

<script>
import HeroCanvas from '@/components/HeroCanvas'

export default {
  name: 'Hero',
  props: {
    headline: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      canvasAnimation: null,
    }
  },
  mounted() {
    const heroCanvas = document.getElementById('heroCanvas')
    heroCanvas.width =
      heroCanvas.parentElement.clientWidth * window.devicePixelRatio
    heroCanvas.height =
      heroCanvas.parentElement.clientHeight * window.devicePixelRatio
    this.canvasAnimation = new HeroCanvas(heroCanvas)
    this.canvasAnimation.setup()
    this.$refs.hero.addEventListener('mousemove', (evt) => {
      this.canvasAnimation.onMouseMove(evt.clientX, evt.clientY)
    })
    this.$refs.hero.addEventListener('mouseout', (evt) => {
      this.canvasAnimation.onMouseOut()
    })
    this.canvasAnimation.draw()
  },
}
</script>

<style lang="stylus" scoped>
section.hero-section {
  display: flex;
  flex-direction: column;
  // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
  position: relative;
  background: #0f2027;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
}

h1.hero-headline {
  font-family: $base-heading-font-family-serif;
  font-weight: 200;
  margin-top: 200px;
  margin-bottom: 200px;
  width: 100%;
  color: #FFF;
  position: relative;
  z-index: 10;

  @media screen and (max-width: 800px) {
    width: 100% !important;
  }

  @media screen and (max-width: 480px) {
    margin-top: 300px;
    margin-bottom: 100px;
  }
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // z-index: -100;
}
</style>
