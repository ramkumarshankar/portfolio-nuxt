<template>
  <footer :class="this.$route.name === 'thanks' ? 'fixed' : ''">
    <div class="footer-inner">
      <a href="https://www.buymeacoffee.com/ramkumarshankar" target="_blank" class="footer-button"><span style="margin-right: 8px;">☕️</span>Buy me a coffee</a>
      <ul class="icons-list">
        <li>
          <a :href="twitterLink">
            <fa :icon="['fab', 'twitter']" />
          </a>
        </li>
        <li>
          <a :href="facebookLink">
            <fa :icon="['fab', 'facebook']" />
          </a>
        </li>
        <li>
          <a :href="linkedinLink">
            <fa :icon="['fab', 'linkedin']" />
          </a>
        </li>
        <li>
          <a :href="dribbbleLink">
            <fa :icon="['fab', 'dribbble']" />
          </a>
        </li>
        <li>
          <a :href="githubLink">
            <fa :icon="['fab', 'github']" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      twitterLink: "https://twitter.com/ramkumarshankar",
      facebookLink: "http://www.facebook.com/687186453",
      githubLink: "https://github.com/ramkumarshankar",
      dribbbleLink: "http://www.dribbble.com/ramkumarshankar",
      linkedinLink: "https://www.linkedin.com/in/ramkumarshankar"
    };
  }
};
</script>

<style lang="stylus" scoped>
footer {
  background-color: #1B1B1B;

  &.fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  div.footer-inner {
    background-color: #1B1B1B;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    padding: 30px 6em;
    flex-wrap: wrap;

    @media screen and (max-width: 800px) {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      width: 100% !important;
    }
    ul.icons-list {
      padding:10px 0px;
      display: inline-block;
      list-style-type: none;

      li {
        display: inline;
        padding-right: 10px;

        a {
          text-decoration: none;
          color: #FFF;
        }

        a:hover {
          color: darken(#FFF, 30);
          transition: box-shadow 0.2s ease-out;
        }

        button {
          color: #FFF;
        }
      }
    }
  }
}

</style>
