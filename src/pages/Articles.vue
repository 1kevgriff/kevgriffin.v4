<template>
  <Layout>
    <div class="py-16 mx-auto container-inner">
      <div
        v-for="post in $page.posts.edges"
        :key="post.id"
        class="mb-12 border-b border-gray-400 post"
      >
        <h2 class="text-3xl font-bold">
          <g-link :to="post.node.path" class="text-copy-primary">{{
            post.node.title
          }}</g-link>
        </h2>
        <div class="mb-4 text-copy-secondary">
          <span>{{ post.node.date }}</span>
          <span>&nbsp;&middot;&nbsp;</span>
          <span>{{ post.node.timeToRead }} min read</span>
        </div>

        <div class="mb-4 text-lg">
          {{ post.node.excerpt }}
        </div>

        <div class="mb-8">
          <g-link :to="post.node.path" class="font-bold uppercase"
            >Read More</g-link
          >
        </div>
      </div>
      <!-- end post -->

      <pagination-posts
        v-if="$page.posts.pageInfo.totalPages > 1"
        base="/articles"
        :totalPages="$page.posts.pageInfo.totalPages"
        :currentPage="$page.posts.pageInfo.currentPage"
      />
    </div>
  </Layout>
</template>

<page-query>
query Posts ($page: Int) {
  posts: allPost (sortBy: "date", order: DESC, perPage: 10, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        date (format: "MMMM D, Y")
        summary
        excerpt
        timeToRead
        path
      }
    }
  }
}
</page-query>

<script>
import PaginationPosts from "../components/PaginationPosts";

export default {
  metaInfo: {
    title: "Articles",
    description: "Kevin W. Griffin | Developer, Training, Entrepreneur",
    link: [
      {
        rel: "canonical",
        href: "https://consultwithgriff.com" + this.$page.post.path,
      },
    ],
  },
  components: {
    PaginationPosts,
  },
};
</script>

