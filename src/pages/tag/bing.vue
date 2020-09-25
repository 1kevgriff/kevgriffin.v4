<template>
  <p>Redirecting to home page</p>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: `Redirecting to updated article...`,
      meta: [
        {
          "http-equiv": "refresh",
          content: `0; URL=/`
        }
      ]
    };
  }
};
</script>