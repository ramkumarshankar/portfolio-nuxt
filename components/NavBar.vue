<template>
  <header :class="navFixed ? 'fixed' : ''">
    <nuxt-link :class="navTheme" class="site-title" to="/">
      Ramkumar Shankar
    </nuxt-link>
    <nav>
      <ul>
        <li>
          <nuxt-link :class="navTheme" to="/work">Work</nuxt-link>
        </li>
        <!-- Temporarily hide writing link until posts are ready -->
        <!-- <li>
          <nuxt-link :class="navTheme" to="/writing">Writing</nuxt-link>
        </li> -->
        <li>
          <nuxt-link :class="navTheme" to="/about">About</nuxt-link>
        </li>
        <li>
          <nuxt-link
            :class="navTheme"
            class="secondary"
            to="/contact"
            tag="button"
            >Say hello</nuxt-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapState({
      navFixed: state => state.nav.fixed,
      navTheme: state => state.nav.theme
    })
  }
}
</script>

<style lang="stylus" scoped>
header {
  margin: auto;
  padding: 20px 6em;
  max-width: 1024px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  z-index: 100;

  &.fixed {
    position: absolute;
    left: 0;
    right: 0
  }

  // This breakpoint matches the container
  @media screen and (max-width: 800px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    width: 100% !important;
  }

  @media screen and (max-width: 700px) {
    display: grid;
    grid-template-rows: repeat(2,auto);
  }

  .light {
    @media only screen and (prefers-color-scheme: light) {
      color: #fff;
    }
  }

  a {
    text-decoration: none;
    color: $text-color;
    font-size: 1.125em;
    @media only screen and (prefers-color-scheme: dark) {
      color: $text-color-dark;
    }
  }

  .site-title {
    font-size: 1.414em;
    font-weight: 500;
    margin-bottom: 20px;
  }

  nav {
    margin-bottom: 20px;

    ul {
      display: inline-block;
      padding: 0px;
      list-style-type: none;

      li {
        display: inline;
        @media screen and (max-width: 480px) {
          display: block;
          margin-bottom: 10px;
        }

        &:not(:last-child) {
          padding-right: 30px;
        }
      }

      a {

        &.router-link-exact-active {
          box-shadow: inset 0px -2px 0 0 $button-color;
        }

        &:hover {
          box-shadow: inset 0px -2px 0 0 $button-color;
          transition: box-shadow 0.2s ease-out;
        }
      }

      button {
        font-size: 1.125em;
        color: $text-color;
        @media only screen and (prefers-color-scheme: dark) {
          color: $text-color-dark;
        }
      }
    }
  }
}
</style>
