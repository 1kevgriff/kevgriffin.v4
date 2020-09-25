<template>
  <Layout>
    <h3>New site! Bad link!</h3>
    <p>
      Hey there! It looks like you hit an old link and I probably took it down.
      <a href="/">Click here to head back to the home page</a>
    </p>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: `New site! Bad link!`,
      tag: {
        title: "Redirect",
      },
      meta: [
        {
          name: "description",
          content: "This is temporary page because this link is no longer valid.  Sorry!",
        }
      ]
    };
  },
};
</script>