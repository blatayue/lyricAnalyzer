import React, {Suspense} from 'react'
import {DotChart} from '../../src/Charts'
import {storiesOf} from '@storybook/react'
import {withKnobs, text, number} from '@storybook/addon-knobs'

export const Pop = storiesOf('Lyric Chart', module)

const margins = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 0,
}
storiesOf('Lyric Chart/Pop', module)
  .addDecorator(withKnobs)
  .add('Closer - Chainsmokers', () => (
    <Suspense fallback="loading...">
      <DotChart
        width={number('width', 1600)}
        height={number('height', 500)}
        query={text('query', 'closer')}
        margins={margins}
      />
    </Suspense>
  ))

storiesOf('Lyric Chart/Pop', module)
  .addDecorator(withKnobs)
  .add('Under Pressure - Queen', () => (
    <Suspense fallback="loading...">
      <DotChart
        width={number('width', 1600)}
        height={number('height', 500)}
        query={text('query', 'under pressure queen')}
        margins={margins}
      />
    </Suspense>
  ))

storiesOf('Lyric Chart/Pop', module)
  .addDecorator(withKnobs)
  .add('thank u, next - Ariana Grande', () => (
    <Suspense fallback="loading...">
      <DotChart
        width={number('width', 1600)}
        height={number('height', 500)}
        query={text('query', 'Thank u, next')}
        margins={margins}
      />
    </Suspense>
  ))
