import classNames from 'classnames'
import { CSSProperties, FC, HTMLAttributes } from 'react'

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  reverse?: boolean
  vertical?: boolean
  gap?: CSSProperties['gap']
  wrap?: CSSProperties['flexWrap']
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
}

const Flex: FC<FlexProps> = ({
  children,
  gap,
  wrap,
  align,
  justify,
  vertical,
  reverse,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classNames('flex')}
      style={{
        gap,
        flexWrap: wrap,
        alignItems: align,
        justifyContent: justify,
        flexDirection: vertical
          ? reverse
            ? 'column-reverse'
            : 'column'
          : reverse
            ? 'row-reverse'
            : 'row',
        ...props.style
      }}
    >
      {children}
    </div>
  )
}

export default Flex
