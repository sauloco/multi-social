<template>
  <div>
    <h2 class="title">Cross-Platform Analytics</h2>
    <div>From {{ edgeDates[0] }} to {{ edgeDates[1] }}</div>
    <div>Tweets: {{ twitterCount }}</div>
    <div>Posts: {{ instagramCount }}</div>
    <div>Videos: {{ youtubeCount }}</div>
    <div>Summary: {{ totalPosts }}</div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  computed: {
    twitterCount() {
      return this.info.filter(node => node.type === 'twitter').length
    },
    youtubeCount() {
      return this.info.filter(node => node.type === 'youtube').length
    },
    instagramCount() {
      return this.info.filter(node => node.type === 'instagram').length
    },
    totalPosts() {
      return this.info.length
    },
    edgeDates() {
      return [this.info[0]?.date, this.info[this.info.length - 1]?.date]
    }
  },
}
</script>