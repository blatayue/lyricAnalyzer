/** @format */

import useFetch from 'fetch-suspense'
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {LinearGradient} from '@vx/gradient'
import {AxisLeft, AxisBottom} from '@vx/axis'
import {Group} from '@vx/group'
import {scaleLinear} from '@vx/scale'
import {LinePath, Circle} from '@vx/shape'
import {curveMonotoneX} from '@vx/curve'
import {Text} from '@vx/text'

const LyricComponent = props => {
  const {
    primary_artist,
    header_image_url,
    title_with_featured,
    palette,
    lyricCount,
    fullUniqueLyricCount,
    dataArray,
    margins,
  } = props

  const width = props.width
  const height = props.height

  const xMax = lyricCount
  const yMax = fullUniqueLyricCount

  const x = d => d.x
  const y = d => d.y

  const xScale = scaleLinear({
    domain: [0, xMax],
    range: [margins.left, width],
    clamp: true,
  })
  const yScale = scaleLinear({
    domain: [0, yMax],
    range: [height * 0.4, margins.top],
    clamp: true,
  })

  return (
    <>
      <svg width={width} height={height}>
        <LinearGradient from={palette[2]} to={palette[4]} id="gradient" />
        <rect
          x={margins.right}
          y={margins.top}
          width={width + margins.left}
          height={height + margins.bottom}
          rx={5}
          fill={'url(#gradient)'}
        />
        <Text
          x={width / 2}
          y={margins.top / 4}
          width={width}
          verticalAnchor="start"
          textAnchor="middle"
        >
          {title_with_featured}
        </Text>
        <Group>
          {dataArray.map((point, i) => {
            const cx = xScale(x(point))
            const cy = yScale(y(point))
            const r = 0.5
            return (
              <Circle
                key={`point-${point.x}-${i}`}
                className="dot"
                cx={cx}
                cy={cy}
                r={r}
                fill={palette[0]}
              />
            )
          })}
          <LinePath
            data={dataArray}
            x={d => xScale(x(d))}
            y={d => yScale(y(d)) + 30} // generate num
            stroke={palette[0]}
            strokeWidth={1}
            curve={curveMonotoneX}
            transform={`rotate(4,${width / 2},${height / 2})`} // generate with trig
          />
        </Group>
      </svg>
    </>
  )
}

LyricComponent.propTypes = {
  primary_artist: PropTypes.shape({name: PropTypes.string}).isRequired,
  header_image_url: PropTypes.string.isRequired,
  title_with_featured: PropTypes.string.isRequired,
  palette: PropTypes.arrayOf(PropTypes.string).isRequired,
  lyricCount: PropTypes.number.isRequired, // xMax
  fullUniqueLyricCount: PropTypes.number.isRequired, // yMax
  dataArray: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  ).isRequired,
  fullLyrics: PropTypes.arrayOf(PropTypes.string).isRequired,
  fullUniqueLyrics: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margins: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
}

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
const apiEndpoint =
  'https://docker-koa-nextjs-graphql-yndmmjqxhm.now.sh/?query='

export const DotChart = ({width, height, margins, query}) => {
  const data = useFetch(apiEndpoint + encodeURIComponent(schema(query)), {
    method: 'GET',
    cors: true,
  })
  const objData = JSON.parse(data)
  return (
    <LyricComponent
      {...objData.data.searchGenius.response.hits[0].result}
      width={width}
      height={height}
      margins={margins}
    />
  )
}
