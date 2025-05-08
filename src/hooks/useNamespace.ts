import { useContext } from 'react'
import ConfigProviderContext from '@/components/ConfigProvider/providers/context.ts'

/**
 * 生成类名
 * @param name
 */
export const useNamespace = (name: string) => {
  const { prefixCls } = useContext(ConfigProviderContext)
  const cls = `${prefixCls}-${name}`

  /**
   * 命名断言
   * @param name
   * @param state
   */
  const is = (name: string, state?: boolean) => {
    return name && (state || state === undefined) ? `is-${name}` : ''
  }

  /**
   * 拼接类名
   * @param cls
   */
  const join = (...cls: string[]) => {
    return cls.join(' ')
  }

  /**
   * 根据条件决定使用的类名，条件成立使用a类名，条件不成立使用b类名
   */
  const or = (condition: boolean, a: string, b: string) => {
    return condition ? a : b
  }

  return {
    is,
    or,
    cls,
    join
  }
}
