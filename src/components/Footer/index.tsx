import { FC } from 'react'
import type { Props } from '../type'
import classNames from 'classnames'

export interface FooterProps extends Props {
  height?: `${number}px` | `${number}rem` | `${number}em` | `${number}%`
}

const Footer: FC<FooterProps> = ({
  height = '60px',
  className = '',
  children,
  style = {}
}) => {
  return (
    <footer
      style={{ height, ...style }}
      className={classNames('t-footer', className)}
    >
      {children}
    </footer>
  )
}

export default Footer
