import { createContext } from 'react'

export interface ConfigProviderContextProps {
  /**
   * 组件前缀
   * @default 'trove'
   */
  prefixCls?: string
  /**
   * 组件尺寸
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
}

const ConfigProviderContext = createContext<ConfigProviderContextProps>({})

export default ConfigProviderContext
