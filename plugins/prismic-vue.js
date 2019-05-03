import Vue from 'vue'
import PrismicVue from 'prismic-vue'
import linkResolver from './link-resolver';
import htmlSerializer from './html-serializer';

// Add this before the new Vue instance
Vue.use(PrismicVue, {
  linkResolver,
  htmlSerializer
});

Vue.use(PrismicVue)
