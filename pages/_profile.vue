<template>
  <div class="container">
    <h1 class="title">MultiSocial @{{ profile }}</h1>
    <embed-nodes :nodes="nodes" :handles="handles" />
    <analytics-panel :info="nodes" class="fixed-panel right container" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import  { services, getHandles } from '~/services/'
import EmbedNodes from '~/components/EmbedNodes.vue'
import AnalyticsPanel from '~/components/AnalyticsPanel.vue'

export default Vue.extend({
  name: 'ProfilePage',
  components: {
    EmbedNodes,
    AnalyticsPanel,
  },
  async asyncData({ params, query }) {
    const { profile } = params
    
    const { handles } = await getHandles(profile, query);
    
    const nodes = []

    for (const [service, data] of Object.entries(handles)) {
      const serviceHandler = services[service];
      if (serviceHandler) {
        const result = await serviceHandler(data)
        nodes.push(...result)
      }
    }

    return { nodes: nodes.sort((a, b) => b.timestamp - a.timestamp), profile, handles }
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