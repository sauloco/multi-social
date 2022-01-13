<template>
<div>not yet</div>
</template>

<script>
export default {
  props: {
    tweet: {
      type: Object,
      required: true,
      default: () => {},
    },
    user: {
      type: String,
      required: true,
    },
  }
}
</script>

<style lang="postcss" scoped>
blockquote::before {
  content: 'From Twitter';
  display: block;
  position: relative;
  top: 0px;
  left: -150px;
}
</style>