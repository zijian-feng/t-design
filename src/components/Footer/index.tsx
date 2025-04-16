import { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  height?: `${number}px` | `${number}rem` | `${number}em` | `${number}%`
}

const Footer: FC<FooterProps> = ({
  height = '60px',
  className = '',
  children,
  style = {},
  ...props
}) => {
  return (
    <footer
      {...props}
      style={{ height, ...style }}
      className={classNames('t-footer', className)}
    >
      {children}
    </footer>
  )
}

export default Footer
