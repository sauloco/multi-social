<template>
  <div class="container">
    <h1 class="title">MultiSocial @{{ user.username }}</h1>
    <embed-nodes :nodes="nodes" :user="user" />
    <analytics-panel :info="nodes" class="fixed-panel right container" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import profile from '~/data/profile.json'
import EmbedNodes from '~/components/EmbedNodes.vue'
import AnalyticsPanel from '~/components/AnalyticsPanel.vue'

const USERNAME = 'nasa'
const CHANNEL_ID = 'UCLA_DiR1FfKNvjuUpBHmylQ'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    EmbedNodes,
    AnalyticsPanel,
  },
  async asyncData() {
    const youtube = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3/',
    })
    const ytUrl = `search?order=date&part=snippet&channelId=${CHANNEL_ID}&maxResults=100&key=${process.env.YOUTUBE_API_KEY}`

    const {
      data: { items: videos },
    } = await youtube.get(ytUrl)

    const twitter = axios.create({
      baseURL: 'https://api.twitter.com/2/',
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    })

    const {
      data: { data: user },
    } = await twitter.get(`users/by/username/${USERNAME}`)

    const {
      data: { data: tweets },
    } = await twitter.get(
      `/users/${user.id}/tweets?max_results=20&tweet.fields=created_at`
    )

    const nodes = [
      ...profile.graphql.user.edge_owner_to_timeline_media.edges.map(
        // @ts-ignore
        (edge) => ({
          ...edge.node,
          type: 'instagram',
          timestamp: edge.node.taken_at_timestamp,
          date: new Date(
            edge.node.taken_at_timestamp * 1000
          ).toLocaleDateString(),
        })
      ),
      // @ts-ignore
      ...tweets.map((node) => ({
        ...node,
        type: 'twitter',
        timestamp: new Date(node.created_at).getTime() / 1000,
        date: new Date(node.created_at).toLocaleDateString(),
      })),
      // @ts-ignore
      ...videos.map((node) => ({
        ...node.id,
        type: 'youtube',
        id: node.id.videoId,
        timestamp: new Date(node.snippet.publishTime).getTime() / 1000,
        date: new Date(node.snippet.publishTime).toLocaleDateString(),
      })),
    ].sort((a, b) => b.timestamp - a.timestamp)

    // console.log(nodes);

    return { nodes, user }
  },
})
</script>

<style lang="postcss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
}
.fixed-panel {
  position: fixed;
  top: 3.25rem;
  z-index: 1;
  background-color: ghostwhite;
  border: 1px gainsboro solid;
  max-width: 30%;
  border-radius: 0.5rem;
}
.right {
  right: 2rem;
}
h1.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
h2.title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
</style>