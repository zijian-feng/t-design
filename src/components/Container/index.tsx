import './index.scss'

import classNames from 'classnames'
import {
  Children,
  createElement,
  type FC,
  HTMLAttributes,
  isValidElement,
  type ReactNode,
  useEffect,
  useState
} from 'react'

export interface MainProps extends HTMLAttributes<HTMLElement> {
  tagName?: string
}

export type Direction = 'flex-row' | 'flex-column'

const getIndex = (children: ReactNode) => {
  return Children.toArray(children).findIndex((node) => {
    if (isValidElement(node)) {
      const componentName = (node.type as unknown as { name: string }).name
      return /[Header|Footer|Main|Aside]/.test(componentName)
    }
  })
}

const Container: FC<MainProps> = ({
  children,
  className = '',
  tagName = 'div',
  ...props
}) => {
  const [direction, setDirection] = useState<Direction>('flex-row')
  useEffect(() => {
    const index = getIndex(children)
    if (index !== -1) {
      setDirection('flex-column')
    }
  }, [children])

  return createElement(tagName, {
    ...props,
    children,
    className: classNames(
      't-container w-full h-full flex',
      direction,
      className
    )
  })
}

export default Container
