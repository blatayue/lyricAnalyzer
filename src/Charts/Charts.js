import React from 'react'
import useFetch from 'fetch-suspense'
import {Visualization} from './Visualization'

export const DotChart = ({width, height, margins, query}) => {
  const data = useFetch(apiEndpoint + encodeURIComponent(schema(query)), {
    method: 'GET',
    cors: true,
  })
  return (
    <Visualization
      {...data.data.searchGenius.response.hits[0].result} // first result
      width={width}
      height={height}
      margins={margins}
    />
  )
}

const apiEndpoint =
  'https://docker-koa-nextjs-graphql-yndmmjqxhm.now.sh/?query='

const schema = query => {
  return `{
  searchGenius(query: \"${query}\") {
    response {
      hits(limit: 1) {
        result {
          primary_artist {
            name
          }
          header_image_url
          title_with_featured
          palette
          lyricCount
          fullUniqueLyricCount
          fullUniqueLyrics
          fullLyrics
          dataArray {
            x
            y
          }
        }
      }
    }
  }
}
`
}
