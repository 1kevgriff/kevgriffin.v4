// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import VueScrollTo from 'vue-scrollto';
import VueFuse from 'vue-fuse';
import VueDisqus from 'vue-disqus';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

import VueAppInsights from 'vue-application-insights';

config.autoAddCss = false;
library.add(faSearch);

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
  Vue.component('font-awesome', FontAwesomeIcon);

  Vue.use(VueAppInsights, {
    id: 'e6df3725-9377-4cc0-b067-44110ce1eace'
  });

  Vue.use(VueScrollTo, {
    duration: 500,
    easing: "ease",
  });

  Vue.use(VueFuse);
  Vue.use(VueDisqus);

  head.meta.push({
    name: 'keywords',
    content: 'Gridsome,Vue,Tailwind,Tailwind CSS,JavaScript,HTML,CSS,Vue.js,VueJS,.NET,ASP.NET,ASP.NET Core,.NET Core,Microsoft Azure,Azure'
  });

  head.meta.push({
    name: 'description',
    content: 'Kevin W. Griffin | Developer, Training, Entrepreneur'
  });

  head.meta.push({
    name: 'author',
    content: 'Kevin W. Griffin'
  });

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:400,700'
  });
}


