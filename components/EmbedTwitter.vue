<template>
  <blockquote class="twitter-tweet">
    <p lang="es" dir="ltr">
      {{ tweet.text }}
    </p>
    &mdash; {{ user.name }} (@{{ user.username }})
    <a
      :href="`https://twitter.com/${user.username}/status/${tweet.id}`"
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
      type: Object,
      required: true,
      default: () => {},
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