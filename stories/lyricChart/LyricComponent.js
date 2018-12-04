import {} from 'ramda'
import getColors from 'get-image-colors'
import {analyzeWithGenius} from './analyzeLyrics';

import {Group} from '@vx/group'
import {LinePath} from '@vx/shape'
import {curveMonotoneX} from '@vx/curve'

export const LyricComponent = ({songTitle, width, height}) => {
    const songData = analyzeWithGenius(songTitle)
    const colors = getColors(songData.image) // cross-origin, may need helper funcs

    return (
        <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill="#242424" rx={14} />
      </svg>
    )
}