import { FC } from 'react'
import Flex from '../Flex'
import IconStar from '@/icons/IconStar'

export interface RateProps {
  count?: number
  defaultValue?: number
}

const Rate: FC<RateProps> = ({ count = 5, defaultValue = 0 }) => {
  return (
    <Flex gap={4}>
      {new Array(count).fill('#eee').map((color, i) => (
        <IconStar color={defaultValue - i > 0 ? '#fadb14' : color} />
      ))}
    </Flex>
  )
}

export default Rate
