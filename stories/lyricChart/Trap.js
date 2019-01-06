import React, {Suspense} from 'react'
import {DotChart} from '../../src/Charts'
import {storiesOf} from '@storybook/react'
import {withKnobs, text, number} from '@storybook/addon-knobs'

export const Trap = storiesOf('Lyric Chart', module)

const margins = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 0,
}
storiesOf('Lyric Chart/Trap', module)
  .addDecorator(withKnobs)
  .add('HUMBLE - Kendrick Lamar', () => (
    <Suspense fallback="loading...">
      <DotChart
        width={number('width', 1600)}
        height={number('height', 500)}
        query={text('query', 'humble')}
        margins={margins}
      />
    </Suspense>
  ))

storiesOf('Lyric Chart/Trap', module)
  .addDecorator(withKnobs)
  .add('Panda - Desiigner', () => (
    <Suspense fallback="loading...">
      <DotChart
        width={number('width', 1600)}
        height={number('height', 500)}
        query={text('query', 'panda')}
        margins={margins}
      />
    </Suspense>
  ))
