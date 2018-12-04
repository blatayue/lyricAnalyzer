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
        <div></div>
    )
}