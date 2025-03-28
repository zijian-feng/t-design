import './index.scss'

import { type FC } from 'react'
import type { Props } from '../type'
import classNames from 'classnames'

export interface AsideProps extends Props {
  width?: `${number}px` | `${number}rem` | `${number}em` | `${number}%`
}

const Aside: FC<AsideProps> = ({
  children,
  style = {},
  className = '',
  width = '280px'
}) => {
  return (
    <aside
      style={{ width, ...style }}
      className={classNames('t-aside h-full', className)}
    >
      {children}
    </aside>
  )
}

export default Aside
