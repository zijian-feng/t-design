import Flex from '../Flex'
import { FC, useState, ReactNode } from 'react'

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
  character?: ReactNode | ((props: { index: number, value: number }) => ReactNode)
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

  const displayValue = hoverValue !== null ? hoverValue : (value ?? internalValue)

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

  // 渲染自定义字符或默认星星
  const renderCharacter = (index: number) => {
    if (character) {
      if (typeof character === 'function') {
        return character({ index, value: displayValue })
      }
      return character
    }

    // 默认星星SVG
    return (
      <>
        {/* 背景星星 */}
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          style={{ 
            position: 'absolute',
            transition: 'transform 0.2s ease',
            transform: hoverValue !== null && hoverValue >= index + (allowHalf ? 0.5 : 1) ? 'scale(1.2)' : 'scale(1)'
          }}
        >
          <path
            fill={inactiveColor}
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

        {/* 前景星星 */}
        {displayValue - index > 0 && (
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            style={{ 
              position: 'absolute',
              clipPath: displayValue - index < 1 ? 'inset(0 50% 0 0)' : 'none',
              transition: 'transform 0.2s ease',
              transform: hoverValue !== null && hoverValue >= index + (allowHalf ? 0.5 : 1) ? 'scale(1.2)' : 'scale(1)'
            }}
          >
            <path
              fill={activeColor}
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
        )}
      </>
    )
  }

  const renderCustomCharacter = (index: number) => {
    // 如果是默認星星，使用之前的渲染方法
    if (!character) return renderCharacter(index)
    
    const characterNode = typeof character === 'function' 
      ? character({ index, value: displayValue }) 
      : character
    
    return (
      <>
        {/* 背景層（未選中狀態） */}
        <div style={{ 
          position: 'absolute',
          color: inactiveColor,
          fontSize: '24px',
          lineHeight: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          transition: 'transform 0.2s ease',
          transform: hoverValue !== null && hoverValue >= index + (allowHalf ? 0.5 : 1) ? 'scale(1.2)' : 'scale(1)'
        }}>
          {characterNode}
        </div>
        
        {/* 前景層（選中狀態） */}
        {displayValue - index > 0 && (
          <div style={{ 
            position: 'absolute',
            color: activeColor,
            fontSize: '24px',
            lineHeight: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            transition: 'transform 0.2s ease',
            transform: hoverValue !== null && hoverValue >= index + (allowHalf ? 0.5 : 1) ? 'scale(1.2)' : 'scale(1)'
          }}>
            {/* 創建包含字符的容器，並用半值裁剪 */}
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              clipPath: displayValue - index < 1 ? 'inset(0 50% 0 0)' : 'none'
            }}>
              {characterNode}
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <Flex gap={4} className={readonly ? "cursor-default" : "cursor-pointer"}>
      {Array.from({ length: internalCount }, (_, i) => (
        <div 
          key={i} 
          style={{ position: 'relative', width: '24px', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onMouseMove={readonly ? undefined : (e) => handleMouseMove(i, e)}
          onMouseLeave={readonly ? undefined : handleMouseLeave}
          onClick={readonly ? undefined : () => handleClick(hoverValue !== null ? hoverValue : i + 1)}
        >
          {renderCustomCharacter(i)}
        </div>
      ))}
    </Flex>
  )
}

export default Rate