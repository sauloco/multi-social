<template>
  <blockquote class="twitter-tweet">
    <p lang="es" dir="ltr">
      {{ tweet.text }}
    </p>
    <a
      :href="`https://twitter.com/${user}/status/${tweet.id}`"
      >January 11, 2022</a
    >
  </blockquote>
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