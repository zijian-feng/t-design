import { FC, useState } from 'react'
import Flex from '../Flex'
import IconStar from '@/icons/IconStar'

export interface RateProps {
  count?: number
  defaultValue?: number
  value?: number
  onChange?: (value: number) => void
}

const Rate: FC<RateProps> = ({
  count = 5,
  value,
  defaultValue = 5,
  onChange
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = value !== undefined ? value : internalValue

  const handleClick = (newValue: number) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  return (
    <Flex gap={4}>
      {new Array(count).fill('#eee').map((color, i) => (
        <IconStar
          key={i}
          color={currentValue - i > 0 ? '#fadb14' : color}
          onClick={() => handleClick(i + 1)}
        />
      ))}
    </Flex>
  )
}

export default Rate
