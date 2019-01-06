import React from 'react'
import {Text} from '@vx/text'
import {Group} from '@vx/group'

export const Labels = ({
  margins,
  width,
  title_with_featured,
  primary_artist,
}) => (
  <Group id="labels">
    <Text
      x={width / 2}
      y={margins.top / 4}
      width={width}
      verticalAnchor="start"
      textAnchor="middle"
    >
      {title_with_featured}
    </Text>
    <Text
      x={width / 2}
      y={margins.top * 0.6}
      width={width}
      verticalAnchor="start"
      textAnchor="middle"
    >
      {primary_artist.name}
    </Text>
  </Group>
)
