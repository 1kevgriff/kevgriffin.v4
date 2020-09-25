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
      title: `Redirecting to home page...`,
      tag: {
        title: "Redirect",
      },
    };
  },
};
</script>