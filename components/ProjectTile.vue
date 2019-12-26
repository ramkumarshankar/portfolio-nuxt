<template>
  <div class="tile" :class="featured ? 'featured' : ''">
    <prismic-link :field="link">
      <div class="image-container">
        <prismic-image :field="image"/>
        <div class="overlay">
          <div>View Project</div>
        </div>
      </div>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <Tags :tags="this.$route.name === 'index' ? tags : null"/>
    </prismic-link>
  </div>
</template>

<script>
import Tags from "@/components/Tags";

export default {
  name: "ProjectTile",
  components: {
    Tags
  },
  props: {
    title: String,
    description: String,
    link: Object,
    image: Object,
    tags: Array,
    featured: Boolean
  }
};
</script>

<style lang="stylus" scoped>
.tile {
  a {
    text-decoration: none;
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

  &:not(:first-child) {
    > a > div.image-container {
      border: #ccc 0.5px solid;
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
      }
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

// Featured project and common styles
div.image-container {
  overflow: hidden;
  position: relative;
  margin-bottom: 10px;
  border-radius: 2px;

  img {
    width: 100%;
    object-fit: cover;
    transition: all 0.3s ease-in;
  }

  // On small screens, featured project looks the same as other tiles
  @media screen and (max-width: 600px) {
    border: #ccc 0.5px solid;
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
