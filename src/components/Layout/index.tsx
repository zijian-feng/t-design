import classNames from 'classnames'
import { ReactNode } from 'react'

export interface LayoutProps {
  children?: ReactNode
  className?: string
}

const Layout = (props: LayoutProps) => {
  const { children } = props
  console.log(children)
  return (
    <div className={classNames('t-layout flex', classNames)}>{children}</div>
  )
}

export default Layout
