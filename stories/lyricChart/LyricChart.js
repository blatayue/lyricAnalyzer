/** @format */

import React, { Suspense } from 'react'
import { DotChart } from '../../src/Charts/LyricComponent'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number } from '@storybook/addon-knobs'
export const LyricChart = storiesOf('lyric chart', module)
LyricChart.addDecorator(withKnobs)
LyricChart.add(
  'default',
  () => <Suspense fallback="loading...">
<DotChart width={ number('width', 1600) } height={ number('height', 300) } query={ text('query', 'Rolling Dice (Ft. Ella Vos') } margins={ { top: 50, right: 50, bottom: 50, left: 50 } } />
        </Suspense>
)
