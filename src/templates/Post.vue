<template>
  <Layout>
    <div class="container-inner mx-auto my-16">
      <h1 class="text-4xl font-bold leading-tight">{{ $page.post.title }}</h1>
      <div class="text-xl text-gray-600 mb-4">{{ $page.post.date }}</div>
      <div class="flex mb-8 text-sm">
        <g-link
          :to="tag.path"
          v-for="tag in $page.post.tags"
          :key="tag.id"
          class="bg-gray-300 rounded-full px-4 py-2 mr-4 hover:bg-green-300"
        >{{ tag.title }}</g-link>
      </div>
      <div class="markdown-body mb-8" v-html="$page.post.content" />
      <div class="mb-8">
        <g-link to="/articles" class="font-bold uppercase">Back to Article Listing</g-link>
      </div>
      <div class="mb-8">
        <vue-disqus shortname="kevgriff" :identifier="$page.post.permalink"></vue-disqus>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    title
    date (format: "MMMM D, Y")
    summary
    content
    tags {
      title
      path
    }
  }
}
</page-query>

<script>
import kevin_rocks from "../kevin_rockon.png";
export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        { name: "twitter:card", content: "summary" },
        { name: "twitter:description", content: this.$page.post.summary },
        { name: "twitter:title", content: this.$page.post.title },
        { name: "twitter:site", content: "@1kevgriff" },
        { name: "twitter:image", content: kevin_rocks },
        { name: "twitter:creator", content: "@1kevgriff" },
        { name: "description", content: this.$page.post.summary }
      ]
    };
  }
};
</script>

<style src="../css/github-markdown.css" />

