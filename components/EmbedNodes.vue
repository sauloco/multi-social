<template>
  <div>
    <div v-for="(node, index) in nodes" :key="`${node.type}-${node.id}`" class="embed-node">
      <embed-twitter
        v-if="node.type === 'twitter'"
        :tweet="node"
        :user="handles.twitter"
        :with-label="index === 0 || nodes[index-1].type !== node.type"
      />

      <embed-instagram
        v-else-if="node.type === 'instagram'"
        :node="node"
        :with-label="index === 0 || nodes[index-1].type !== node.type"
      />

      <embed-youtube
        v-else-if="node.type === 'youtube'"
        :node="node"
        :with-label="index === 0 || nodes[index-1].type !== node.type"
      />
    </div>
  </div>
</template>

<script>
import EmbedInstagram from '~/components/EmbedInstagram.vue'
import EmbedTwitter from '~/components/EmbedTwitter.vue'
import EmbedYoutube from '~/components/EmbedYoutube.vue'

export default {
  name: 'EmbedNodes',
  components: {
    EmbedInstagram,
    EmbedTwitter,
    EmbedYoutube,
  },
  props: {
    nodes: {
      type: Array,
      required: true,
      default: () => [],
    },
    handles: {
      type: Object,
      required: true,
      default: () => {},
    }
  },
}
</script>

<style lang="postcss" scoped>
.embed-node {
  margin-bottom: 1rem;
}
</style>