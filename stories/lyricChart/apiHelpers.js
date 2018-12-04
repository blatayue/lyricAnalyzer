import axios from 'axios'
import cheerio from 'cheerio'
import { path, evolve, prop } from 'ramda'
import querystring from 'querystring'
// require('dotenv').config() // doesn't work with storybook - doing manually

// const makeLastFMRequest = () => ({
//   uri: "https://ws.audioscrobbler.com/2.0/?",
//   qs: track => ({method: "track.search", track, api_key: lastfmApiKey, format: "json"})
// })

// const apiSeeds = () => ({
//   lyricQuery: async({name, artist}) => axios.get(makeApiSeedsRequest.uri({name, artist}) + querystring.stringify(makeApiSeedsRequest.qs))
// })

const searchGenius = async query => axios.get('https://api.genius.com/search', {
  params: {
  q: query,
  access_token: process.env.STORYBOOK_geniusApiKey
  }
})
.then(response => (
  {
    path: path(['data', 'response', 'hits', 0, 'result', 'path'])(response),
    title: path(['data', 'response', 'hits', 0, 'result', 'title'])(response),
    image: path(['data', 'response', 'hits', 0, 'result', 'song_art_image_thumbnail_url'])(response)
  }
))
export const getGeniusLyrics = async query => {
  const songData = await searchGenius(query)
  const { path, title, image } = songData
  
  const body = await (axios.get(`https://cors.io/?https://genius.com${path}`)).then(prop('data'))
  const lyricText = cheerio.load(body)('p', '.lyrics')
    .text()
    .replace(/.*(\[.*\])/gm, '') // brackets
    .replace(/\n(\n)/, '') // newlines
    .replace(/\n/gm, ' ') // newlines?
    .replace(/[!"#$%&()*+,\-./:;<=>?@[\]\^_`{|}~]/g, "") // woo symbols/punctuation
    .trim() //remove whitespace
  return {
    lyrics: lyricText,
    title,
    image
  }
}
