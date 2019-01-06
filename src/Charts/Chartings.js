import React from 'react'

import {LinePath, Circle} from '@vx/shape'
import {Group} from '@vx/group'
import {curveMonotoneX} from '@vx/curve'

export const Points = ({dataArray, xScale, yScale, x, y, palette}) => (
  <Group id="points">
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
  </Group>
)

export const Line = ({dataArray, xScale, yScale, x, y, palette}) => (
  <Group id="line">
    <LinePath
      data={dataArray}
      x={d => xScale(x(d))}
      y={d => yScale(y(d))}
      stroke={palette[0]}
      strokeWidth={1}
      curve={curveMonotoneX}
    />
  </Group>
)
