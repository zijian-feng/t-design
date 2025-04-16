import { HTMLAttributes, type FC } from 'react'
import classNames from 'classnames'

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  height?: `${number}px` | `${number}rem` | `${number}em` | `${number}%`
}

const Header: FC<HeaderProps> = ({
  height = '60px',
  className = '',
  children,
  style = {},
  ...props
}) => {
  return (
    <header
      {...props}
      style={{ height, ...style }}
      className={classNames('t-header', className)}
    >
      {children}
    </header>
  )
}

export default Header
