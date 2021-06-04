<template>
  <Layout>
    <div class="mx-auto my-16 container-inner">
      <h2 class="mb-8 text-4xl font-bold border-b">
        Tag: {{ $page.tag.title }}
      </h2>

      <div
        v-for="post in $page.tag.belongsTo.edges"
        :key="post.node.id"
        class="mb-12 border-b border-gray-400 post"
      >
        <h2 class="text-3xl font-bold">
          <g-link :to="post.node.path" class="text-copy-primary">{{
            post.node.title
          }}</g-link>
        </h2>
        <div class="mb-4 text-copy-secondary">
          <span>{{ post.node.date }}</span>
          <span> &middot; </span>
          <span>{{ post.node.timeToRead }} min read</span>
        </div>

        <div class="mb-4 text-lg">
          {{ post.node.summary }}
        </div>

        <div class="mb-8">
          <g-link :to="post.node.path" class="font-bold uppercase"
            >Read More</g-link
          >
        </div>
      </div>

      <pagination-posts
        v-if="$page.tag.belongsTo.pageInfo.totalPages > 1"
        :base="`/article-tags/${$page.tag.title}`"
        :totalPages="$page.tag.belongsTo.pageInfo.totalPages"
        :currentPage="$page.tag.belongsTo.pageInfo.currentPage"
      />
    </div>
  </Layout>
</template>

<page-query>
query Tag ($id: ID!, $page: Int) {
  tag: tag (id: $id) {
    title
    path
    belongsTo (page: $page, perPage: 3) @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          ...on Post {
            title
            timeToRead
    	      date (format: "MMMM D, YYYY")
            path
            summary
            tags {
              title
            }
          }
        }
      }
    }
  }
}
</page-query>

<script>
import PaginationPosts from "../components/PaginationPosts";

export default {
  metaInfo() {
    return {
      title: "Tag: " + this.$page.tag.title,
      meta: [
        {
          name: "description",
          content: "Kevin W. Griffin | Developer, Training, Entrepreneur",
        },
      ],
      link: [
        {
          rel: "canonical",
          href: "https://consultwithgriff.com" + this.$page.tag.path,
        },
      ],
    };
  },
  components: {
    PaginationPosts,
  },
};
</script>
