import { $fetch } from 'ohmyfetch'
import { getQuery } from 'ufo'

const TMDB_API_URL = 'https://api.themoviedb.org/3'

export default defineEventHandler(async (event) => {
  // eslint-disable-next-line no-console
  console.log('Fetching TMDB API', event.req.url)
  event.res.setHeader('Access-Control-Allow-Origin', '*')
  const config = useRuntimeConfig()
  const apiRes = await $fetch(event.context.params.path, {
    baseURL: TMDB_API_URL,
    params: {
      api_key: config.tmdb.apiKey,
      language: 'en-US',
      ...getQuery(event.req.url!),
    },
  })
  return apiRes
})
