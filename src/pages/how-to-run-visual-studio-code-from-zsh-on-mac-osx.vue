<template>
  <p>Redirecting to updated article</p>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: `Redirecting to updated article...`,
      meta: [
        {
          "http-equiv": "refresh",
          content: `0; URL=how-to-run-visual-studio-code-from-mac-osx`
        }
      ],
      link: [
        {
          rel: "canonical",
          href: `https://consultwithgriff.com/how-to-run-visual-studio-code-from-mac-osx`
        }
      ]
    };
  }
};
</script>