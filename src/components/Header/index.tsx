import { type FC } from 'react'
import type { Props } from '../type'
import classNames from 'classnames'

export interface HeaderProps extends Props {
  height?: `${number}px` | `${number}rem` | `${number}em` | `${number}%`
}

const Header: FC<HeaderProps> = ({
  height = '60px',
  className = '',
  children
}) => {
  return (
    <header style={{ height }} className={classNames('t-header', className)}>
      {children}
    </header>
  )
}

export default Header
