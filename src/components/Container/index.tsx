import classNames from 'classnames'
import { createElement, ReactNode } from 'react'

export interface MainProps {
  children?: ReactNode
  tagName?: string
  className?: string
}

const Container = (props: MainProps) => {
  const { children, tagName = 'div', className = '' } = props
  return createElement(tagName, {
    children,
    className: classNames('t-container flex flex-column', className)
  })
}

export default Container
