<script setup lang="ts">
import { onKeyDown } from '@vueuse/core'
import type { Image } from '~/types'
import { TMDB_IMAGE_BASE_ORIGINAL } from '~/constants/images'

let images = $ref<Image[] | null>(null)
let index = $ref(0)

const current = $computed(() => images?.[index])

provideImageModal((img, idx) => {
  images = img
  index = idx
})

function prev() {
  if (!images)
    return
  index = (index - 1 + images.length) % images.length
}

function next() {
  if (!images)
    return
  index = (index + 1) % images.length
}

useEventListener('keydown', (e) => {
  if (!images)
    return
  if (e.key === 'Escape')
    images = null
  else if (e.key === 'ArrowLeft')
    prev()
  else if (e.key === 'ArrowRight')
    next()
})
</script>

<template>
  <div v-if="images && current" fixed top-0 left-0 right-0 bottom-0 z-10 bg-black:90 p5>
    <button absolute top-1 right-1 z-100 p3 text-3xl n-link bg-black:60 rounded-full @click="images = null">
      <div i-carbon-close />
    </button>
    <NuxtImg
      :key="current.file_path"
      width="400"

      :src="`/tmdb${current.file_path}`"
      aria-hidden="true"
      max-w-full max-h-full object-contain
    />
    <div absolute left-0 top="1/2">
      <button py10 px4 bg-black:30 op10 hover:op100 @click="prev()">
        <div i-ph-caret-left-light text-3xl text-white />
      </button>
    </div>
    <div absolute right-0 top="1/2">
      <button py10 px4 bg-black:30 op10 hover:op100 @click="next()">
        <div i-ph-caret-right-light text-3xl text-white />
      </button>
    </div>
    <div absolute bottom-2 left-0 right-0 items-center>
      <div bg-black:50 px4 py2>
        {{ index + 1 }} / {{ images.length }}
      </div>
    </div>
  </div>
</template>
