import React from 'react'
import PropTypes from 'prop-types'

import {AxisLeft, AxisBottom} from '@vx/axis' // unused
import {LinearGradient} from '@vx/gradient'
import {scaleLinear} from '@vx/scale'

import {Labels} from './ChartLabels'
import {Line, Points} from './Chartings'

export const Visualization = ({
  primary_artist,
  header_image_url,
  title_with_featured,
  palette, // TODO: Order and standardize positions
  lyricCount,
  fullUniqueLyricCount,
  dataArray,
  margins,
  width,
  height,
}) => {
  // set dimensions
  const xMax = lyricCount
  const yMax = fullUniqueLyricCount
  // accessors
  const x = d => d.x
  const y = d => d.y
  // scalars
  const xScale = scaleLinear({
    domain: [0, xMax],
    range: [margins.left, width],
    clamp: true,
  })
  const yScale = scaleLinear({
    domain: [0, yMax],
    range: [height, margins.top],
    clamp: true,
  })
  // Props
  const labelProps = {margins, width, title_with_featured, primary_artist}
  const dataProps = {dataArray, xScale, yScale, x, y, palette}
  return (
    <>
      <svg width={width} height={height}>
        <LinearGradient from={palette[3]} to={palette[3]} id="gradient" />
        <rect
          x={margins.left}
          y={0}
          width={width + margins.left}
          height={height + margins.bottom}
          rx={5}
          fill={'url(#gradient)'}
        />
        <Labels {...labelProps} />
        <Points {...dataProps} />
        <Line {...dataProps} />
      </svg>
    </>
  )
}

Visualization.propTypes = {
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
  ).isRequired, // points

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
