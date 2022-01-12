<template>
  <iframe
    width="560"
    height="315"
    :src="`https://www.youtube.com/embed/${node.id}?controls=0`"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>

<script>
export default {
  props: {
    node: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>
<style lang="postcss" scoped>
iframe::before {
  content: 'From Instagram';
  display: block;
  position: relative;
  top: 0px;
  left: -150px;
}
</style>