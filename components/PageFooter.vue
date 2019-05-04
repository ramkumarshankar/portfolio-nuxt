<template>
  <footer :class="this.$route.name === 'thanks' ? 'fixed' : ''">
    <div class="footer-inner">
      <ul class="social-icons-list">
        <li>
          <a class="socicon-twitter" v-bind:href="twitterLink"></a>
        </li>
        <li>
          <a class="socicon-facebook" v-bind:href="facebookLink"></a>
        </li>
        <li>
          <a class="socicon-linkedin" v-bind:href="linkedinLink"></a>
        </li>
        <li>
          <a class="socicon-dribbble" v-bind:href="dribbbleLink"></a>
        </li>
        <li>
          <a class="socicon-github" v-bind:href="githubLink"></a>
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
    // width: 100%;
  }

  div.footer-inner {
    background-color: #1B1B1B;
    max-width: 960px;
    margin: auto;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    z-index: 100;

    @media screen and (max-width: 1024px) {
      width: 760px !important;
    }

    @media screen and (max-width: 800px) {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      width: 100% !important;
    }
    ul.social-icons-list {
      display: inline-block;
      list-style-type: none;
      padding: 30px 0px;

      li {
        display: inline;
        padding-left: 10px;

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
