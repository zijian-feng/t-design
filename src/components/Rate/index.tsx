import Flex from '../Flex'
import { FC, useState, ReactNode } from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'

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
  /**
   * 是否允许半星
   * @default false
   */
  allowHalf?: boolean
  /**
   * 是否只读模式
   * @default false
   */
  readonly?: boolean
  /**
   * 自定义字符
   * 可以是字符串或React节点
   * @default null
   */
  character?:
    | ReactNode
    | ((props: { index: number; value: number }) => ReactNode)
  /**
   * 未选中时的颜色
   * @default #eee
   */
  inactiveColor?: string
  /**
   * 选中时的颜色
   * @default #fadb14
   */
  activeColor?: string
}

const Rate: FC<RateProps> = ({
  count = 5,
  value,
  defaultValue = 0,
  onChange,
  allowHalf = false,
  readonly = false,
  character = null,
  inactiveColor = '#eee',
  activeColor = '#fadb14'
}) => {
  const [internalCount] = useState(count)
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  const displayValue =
    hoverValue !== null ? hoverValue : (value ?? internalValue)

  const handleClick = (newValue: number) => {
    if (readonly) return

    if (value === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const handleMouseMove = (index: number, event: React.MouseEvent) => {
    if (readonly) return

    if (!allowHalf) {
      setHoverValue(index + 1)
      return
    }

    const starRect = event.currentTarget.getBoundingClientRect()
    const offsetX = event.clientX - starRect.left
    const isHalf = offsetX < starRect.width / 2

    setHoverValue(isHalf ? index + 0.5 : index + 1)
  }

  const handleMouseLeave = () => {
    setHoverValue(null)
  }

  const renderStar = (index: number) => {
    const isHovered =
      hoverValue !== null && hoverValue >= index + (allowHalf ? 0.5 : 1)

    return (
      <>
        {/* 背景星星 */}
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          className={classNames(styles.characterBase, {
            [styles.hovered]: isHovered,
            [styles.notHovered]: !isHovered
          })}
        >
          <path
            fill={inactiveColor}
            d="M12,1.73l3.76,7.82l8.41,1.23l-6.08,5.99l1.44,8.5L12,20.97l-7.53,4.3l1.44-8.5L-0.17,10.78l8.41-1.23L12,1.73z"
          />
        </svg>

        {/* 前景星星 */}
        {displayValue - index > 0 && (
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            className={classNames(styles.characterBase, {
              [styles.hovered]: isHovered,
              [styles.notHovered]: !isHovered
            })}
            style={{
              clipPath: displayValue - index < 1 ? 'inset(0 50% 0 0)' : 'none'
            }}
          >
            <path
              fill={activeColor}
              d="M12,1.73l3.76,7.82l8.41,1.23l-6.08,5.99l1.44,8.5L12,20.97l-7.53,4.3l1.44-8.5L-0.17,10.78l8.41-1.23L12,1.73z"
            />
          </svg>
        )}
      </>
    )
  }

  const renderCustomCharacter = (index: number) => {
    if (!character) return renderStar(index)

    const characterNode =
      typeof character === 'function'
        ? character({ index, value: displayValue })
        : character

    const isHovered =
      hoverValue !== null && hoverValue >= index + (allowHalf ? 0.5 : 1)
    const isPartial = displayValue - index > 0 && displayValue - index < 1

    return (
      <>
        {/* 背景层（未选中状态） */}
        <div
          className={classNames(styles.characterBase, {
            [styles.hovered]: isHovered,
            [styles.notHovered]: !isHovered
          })}
          style={{ color: inactiveColor }}
        >
          {characterNode}
        </div>

        {/* 前景层（选中状态） */}
        {displayValue - index > 0 && (
          <div
            className={classNames(
              styles.characterBase,
              styles.characterActive,
              {
                [styles.hovered]: isHovered,
                [styles.notHovered]: !isHovered
              }
            )}
            style={{
              color: activeColor
            }}
          >
            <div
              className={classNames(styles.clipContainer, {
                [styles.halfClip]: isPartial,
                [styles.fullClip]: !isPartial
              })}
            >
              {characterNode}
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <Flex
      className={classNames(styles.rateContainer, {
        [styles.readonly]: readonly,
        [styles.interactive]: !readonly
      })}
    >
      {Array.from({ length: internalCount }, (_, i) => (
        <div
          key={i}
          className={styles.itemWrapper}
          onMouseMove={readonly ? undefined : (e) => handleMouseMove(i, e)}
          onMouseLeave={readonly ? undefined : handleMouseLeave}
          onClick={
            readonly
              ? undefined
              : () => handleClick(hoverValue !== null ? hoverValue : i + 1)
          }
        >
          {renderCustomCharacter(i)}
        </div>
      ))}
    </Flex>
  )
}

export default Rate
