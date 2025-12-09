<template>
  <Layout>
    <div class="mx-auto my-16 container-inner">
      <h2 class="text-4xl font-bold leading-tight">{{ $page.post.title }}</h2>
      <div class="mb-4 text-xl text-gray-600">{{ $page.post.date }}</div>
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
    image
    tags {
      title
      path
    }
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    const baseUrl = "https://consultwithgriff.com";
    const postUrl = baseUrl + this.$page.post.path;
    const ogImage = this.$page.post.image
      ? baseUrl + this.$page.post.image
      : baseUrl + "/og/default.png";
    const description =
      this.$page.post.summary && this.$page.post.summary.trim() != ""
        ? this.$page.post.summary
        : this.$page.post.excerpt;

    return {
      title: this.$page.post.title,
      meta: [
        // Open Graph
        { property: "og:type", content: "article" },
        { property: "og:title", content: this.$page.post.title },
        { property: "og:description", content: description },
        { property: "og:url", content: postUrl },
        { property: "og:site_name", content: "Consult With Griff" },
        { property: "og:image", content: ogImage },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: this.$page.post.title },
        { name: "twitter:description", content: description },
        { name: "twitter:site", content: "@1kevgriff" },
        { name: "twitter:creator", content: "@1kevgriff" },
        { name: "twitter:image", content: ogImage },
        // General
        { name: "description", content: description },
      ],
      link: [
        {
          rel: "canonical",
          href: postUrl,
        },
      ],
    };
  },
};
</script>

<style src="../css/github-markdown.css" />

