import Flex from '../Flex'
import { FC, useCallback, useMemo, useState } from 'react'

export interface RateProps {
  /**
   * star 总数
   * @default 5
   */
  count?: number
  /**
   * 被点亮的star数。（可控）
   */
  value?: number
  /**
   * 被点亮的star数。（不可控）
   */
  defaultValue?: number
  /**
   * 当被点亮的star数被修改时的触发器
   * @param value 点亮的star数
   * @returns
   */
  onChange?: (value: number) => void
}

const Rate: FC<RateProps> = ({
  count = 5,
  value,
  defaultValue = 0,
  onChange
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue)

  const handleClick = (newValue: number) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const stars = useMemo(
    () => new Array(count < 1 ? 1 : count).fill('#eee'),
    [count]
  )

  const fillColor = useCallback(
    (i: number, color: string) =>
      (value ?? internalValue) - i > 0 ? '#fadb14' : color,
    [value, internalValue]
  )

  return (
    <Flex gap={4}>
      {stars.map((color, i) => (
        <svg
          key={i}
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          className="cursor-pointer"
          onClick={handleClick.bind(this, i + 1)}
        >
          <path
            fill={fillColor(i, color)}
            d="
              M12 17.27
              l4.15 2.51
              c.76.46 1.69-.22 1.49-1.08
              l-1.1-4.72 3.67-3.18
              c.67-.58.31-1.68-.57-1.75
              l-4.83-.41-1.89-4.46
              c-.34-.81-1.5-.81-1.84 0
              L9.19 8.63
              l-4.83.41
              c-.88.07-1.24 1.17-.57 1.75
              l3.67 3.18-1.1 4.72
              c-.2.86.73 1.54 1.49 1.08
              l4.15-2.51
              z
            "
          />
        </svg>
      ))}
    </Flex>
  )
}

export default Rate
