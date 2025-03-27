import { ReactNode } from 'react'
import classNames from 'classnames'

export interface HeaderProps {
  children?: ReactNode
  className?: string
  height?: `${number}px` | `${number}rem` | `${number}em` | `${number}%`
}

const Header = (props: HeaderProps) => {
  const { height = '60px', className = '', children } = props
  return (
    <header style={{ height }} className={classNames('t-header', className)}>
      {children}
    </header>
  )
}

export default Header
