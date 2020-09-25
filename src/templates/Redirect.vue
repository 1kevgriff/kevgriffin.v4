<template>
  <p>
    Redirecting to home page... If this link isn't working, try
    <a href="/">clicking here</a>
  </p>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: `Redirecting to home page...`,
      tag: {
        title: "Redirect",
      },
      meta: [
        {
          "http-equiv": "refresh",
          content: `0; URL=/`,
        },
      ],
    };
  },
};
</script>