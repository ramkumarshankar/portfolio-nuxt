<template>
  <div class="tile">
    <prismic-link :field="link">
      <div class="image-container">
        <prismic-image :field="image"/>
        <div class="overlay">
          <div>View Project</div>
        </div>
      </div>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <!-- <Tags :tags="this.$route.name === 'index' ? tags : null"/> -->
    </prismic-link>
  </div>
</template>

<script>
// import Tags from "@/components/Tags";

export default {
  name: "ProjectTile",
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    description: {
      type: String,
      required: true,
      default: '',
    },
    link: {
      type: Object,
      required: true,
      default: () => {},
    },
    image: {
      type: Object,
      required: true,
      default: () => {},
    },
    tags: {
      type: Array,
      required: true,
      default: () => [],
    }
  }
};
</script>

<style lang="stylus" scoped>
.tile {
  a {
    text-decoration: none;

    div.image-container {
      overflow: hidden;
      position: relative;
      margin-bottom: 10px;
      border-radius: 2px;
      border: $image-border-style;

      &::after {
        content: "";
        display: block;
        padding-bottom: 100%;
      }

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.3s ease-in;
      }
    }
  }

  &:hover {
    a > div.image-container > img {
      transform: scale(1.05)
    }

    a > div.image-container > div.overlay {
      opacity: 1;
      transform: scaleY(1);
    }
  }
}

h2 {
  font-weight: 700;
  margin-bottom: 5px;
}

p {
  margin-bottom: 5px;
}

div.overlay {
  opacity: 0;
  transform-origin: 50% 0%;
  transform: scaleY(0);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  transition: all 0.2s ease-in;

  div {
    margin-right: 10px;
    background: #DA4167;
    padding: 10px 20px;
    color: #FFF;
  }
}
</style>
