import React, {Suspense} from 'react'
import {DotChart} from '../../src/Charts'
import {storiesOf} from '@storybook/react'
import {withKnobs, text, number} from '@storybook/addon-knobs'

export const EDM = storiesOf('Lyric Chart', module)

const margins = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 0,
}
storiesOf('Lyric Chart/EDM', module)
  .addDecorator(withKnobs)
  .add('Tristam - Frame of Mind', () => (
    <Suspense fallback="loading...">
      <DotChart
        width={number('width', 1600)}
        height={number('height', 500)}
        query={text('query', 'frame of mind')}
        margins={margins}
      />
    </Suspense>
  ))

storiesOf('Lyric Chart/EDM', module)
  .addDecorator(withKnobs)
  .add('Nevada - Vicetone', () => (
    <Suspense fallback="loading...">
      <DotChart
        width={number('width', 1600)}
        height={number('height', 500)}
        query={text('query', 'nevada vicetone')}
        margins={margins}
      />
    </Suspense>
  ))

storiesOf('Lyric Chart/EDM', module)
  .addDecorator(withKnobs)
  .add('Coffins - Pegboard Nerds x MisterWives', () => (
    <Suspense fallback="loading...">
      <DotChart
        width={number('width', 1600)}
        height={number('height', 500)}
        query={text('query', 'coffins Pegboard Nerds x MisterWives')}
        margins={margins}
      />
    </Suspense>
  ))

storiesOf('Lyric Chart/EDM', module)
  .addDecorator(withKnobs)
  .add('Valkyrie - Varien', () => (
    <Suspense fallback="loading...">
      <DotChart
        width={number('width', 1600)}
        height={number('height', 500)}
        query={text('query', 'Varien - Valkyrie')}
        margins={margins}
      />
    </Suspense>
  ))

storiesOf('Lyric Chart/EDM', module)
  .addDecorator(withKnobs)
  .add('I Remember - Tristam', () => (
    <Suspense fallback="loading...">
      <DotChart
        width={number('width', 1600)}
        height={number('height', 500)}
        query={text('query', 'Tristam I Remember')}
        margins={margins}
      />
    </Suspense>
  ))
