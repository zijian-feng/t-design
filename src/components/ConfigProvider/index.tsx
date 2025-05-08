import { FC, ReactNode, useMemo } from 'react'
import ConfigProviderContext from './providers/context'
import type { ConfigProviderContextProps } from './providers/context'

export interface ConfigProviderProps extends ConfigProviderContextProps {
  children: ReactNode
}

const ConfigProvider: FC<ConfigProviderProps> = ({
  children,
  size = 'medium',
  prefixCls = 'trove'
}) => {
  const value = useMemo(
    () => ({
      size,
      prefixCls
    }),
    [size, prefixCls]
  )
  return <ConfigProviderContext.Provider value={value} children={children} />
}

export default ConfigProvider
