<script setup lang="ts">
import type { MediaType } from '~/types'

definePageMeta({
  key: route => route.fullPath,
  middleware: 'type',
})

const route = useRoute()
const type = $computed(() => route.params.type as MediaType || 'movie')
const id = $computed(() => route.params.id as string)

const [item, recommendations] = await Promise.all([
  getMedia(type, id),
  getRecommendations(type, id),
])

useHead({
  title: item.name || item.title,
})
</script>

<template>
  <div>
    <MediaHero :item="item" />
    <MediaDetails :item="item" :type="type" />
    <CarouselBase v-if="recommendations?.results.length">
      <template #title>
        More like this
      </template>
      <MediaCard
        v-for="i of recommendations.results"
        :key="i.id"
        :item="i"
        :type="type"
        flex-1 w-60
      />
    </CarouselBase>
    <TheFooter />
  </div>
</template>
