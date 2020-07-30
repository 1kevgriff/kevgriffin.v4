---
title: Building Custom Vue.JS Plugins
date: 2020-07-22 00:30:00
permalink: building-custom-vue-plugins
categories:
  - Misc
excerpt: ""
---

_The article targets Vue.js 2.6 - if you're using another version, your results might vary._

As you build out more robust solutions, you will start to encounter scenarios where your thoughts will say "I feel like I'm repeating myself".

Or you'll start to write a component that needs to talk to an API. Later on, you'll write another component that needs to talk to the same API, but maybe a different endpoint.

To this extent, you should feel like it would be a good idea to abstract the API work into it's own "thing". And then that "thing" can be used wherever you need to talk to the API.

In Vue.js, there are a lot of ways to solve this problem. In particular, and how I solved it initially, was to use [Vuex](https://github.com/vuejs/vuex). And while I really like Vuex, and I appreciate the work that it does, I feel like it's overkill for a large number of applications out there.

For the next Vue.js project I worked on, I decided it would be better to take a simplier approach. This lead me down the road of building my own custom plugins for Vue.js.

## Anatomy of a Plugin

> Note: All my examples will be written in TypeScript. Vue.js is moving in that direction anyway, so embrace it!

Plugins can take one of two forms: function-based install or object-based install.

```typescript
export const ServicePlugin: PluginObject<OptionsObject> = {
  install(Vue: VueConstructor<Vue>, options: OptionsObject | undefined) {},
};
```

## Types of Plugins

### Plugins that extend Vue object (Global)

### Plugins that extend Vue instance (Local)

### Plugins that add Components

### Plugins that override behavior

