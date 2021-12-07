<template>
  <Layout>
    <div class="mx-auto my-16 container-inner">
      <h2 class="text-4xl font-bold leading-tight">{{ $page.post.title }}</h2>
      <div class="mb-4 text-xl text-gray-600">{{ $page.post.date }}</div>
      <div class="flex mb-8 text-sm">
        <g-link
          :to="tag.path"
          v-for="tag in $page.post.tags"
          :key="tag.id"
          class="px-4 py-2 mr-4 bg-gray-300 rounded-full hover:bg-green-300"
          >{{ tag.title }}</g-link
        >
      </div>
      <div class="mb-8 markdown-body" v-html="$page.post.content" />
      <div class="mb-8">
        <g-link to="/articles" class="font-bold uppercase"
          >Back to Article Listing</g-link
        >
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    title
    date (format: "MMMM D, Y")
    path
    summary
    content
    excerpt
    timeToRead
    tags {
      title
      path
    }
  }
}
</page-query>

<script>
import kevin_rocks from "../../static/kevin_rockon.jpg";
export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        { name: "twitter:card", content: "summary" },
        { name: "twitter:description", content: this.$page.post.summary },
        { name: "twitter:title", content: this.$page.post.title },
        { name: "twitter:site", content: "@1kevgriff" },
        {
          name: "twitter:image",
          content:
            "https://previewify.app/i/769?url=https://consultwithgriff.com" +
            this.$page.post.path,
        },
        { name: "twitter:creator", content: "@1kevgriff" },
        {
          name: "og:image",
          content:
            "https://previewify.app/i/769?url=https://consultwithgriff.com" +
            this.$page.post.path,
        },
        { name: "previewify:title", content: this.$page.post.title },
        {
          name: "previewify:reading_time",
          content: this.$page.post.timeToRead + " min read",
        },
        { name: "previewify:category", content: "Articles" },
        {
          name: "previewify:image",
          content: "https://consultwithgriff.com" + kevin_rocks,
        },
        {
          name: "description",
          content:
            this.$page.post.summary && this.$page.post.summary.trim() != ""
              ? this.$page.post.summary
              : this.$page.post.excerpt,
        },
      ],
      link: [
        {
          rel: "canonical",
          href: "https://consultwithgriff.com" + this.$page.post.path,
        },
      ],
    };
  },
};
</script>

<style src="../css/github-markdown.css" />

