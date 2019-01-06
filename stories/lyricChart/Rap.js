import React, {Suspense} from 'react'
import {DotChart} from '../../src/Charts'
import {storiesOf} from '@storybook/react'
import {withKnobs, text, number} from '@storybook/addon-knobs'

export const Rap = storiesOf('Lyric Chart', module)

const margins = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 0,
}

storiesOf('Lyric Chart/Rap', module)
  .add('Rap God - Eminem', () => (
    <Suspense fallback="loading...">
      <DotChart
        width={number('width', 1600)}
        height={number('height', 500)}
        query={text('query', 'rap god')}
        margins={margins}
      />
    </Suspense>
  ))
  .addDecorator(withKnobs)
