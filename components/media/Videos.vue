<script setup lang="ts">
import type { Media } from '~/types'

defineProps<{
  item: Media
}>()
</script>

<template>
  <div px16 py4 gap6>
    <div op50>
      {{ item.videos?.results.length || 0 }} Videos
    </div>
    <div grid="~ cols-minmax-20rem" gap4>
      <VideoCard v-for="i of item.videos?.results" :key="i.id" :item="i" />
    </div>
  </div>
</template>
