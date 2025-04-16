import './index.scss'

import { HTMLAttributes, type FC } from 'react'
import classNames from 'classnames'

export interface AsideProps extends HTMLAttributes<HTMLElement> {
  width?: `${number}px` | `${number}rem` | `${number}em` | `${number}%`
}

const Aside: FC<AsideProps> = ({
  children,
  style = {},
  className = '',
  width = '280px',
  ...props
}) => {
  return (
    <aside
      {...props}
      style={{ width, ...style }}
      className={classNames('t-aside h-full', className)}
    >
      {children}
    </aside>
  )
}

export default Aside
