import classNames from 'classnames'
import styles from './index.module.scss'
import { num_to_px } from '../../utils/num_to_px'
import { CSSProperties, HTMLAttributes, ReactNode, useMemo } from 'react'

export type Align = 'left' | 'center' | 'right'

export type TableHeader<T> = {
  [K in keyof T]: {
    /**
     * 字段名
     * @description 实际显示的当前列表头信息
     */
    fieldName: ReactNode
    /**
     * 字段属性
     * @description 它决定了当前列该根据Data中的哪个键进行值获取
     */
    fieldProp: K & string
    /**
     * 横向排列方式
     * @description 它决定了当前列的所有数据在横向上的排列方式
     */
    align?: Align
    /**
     * 列宽
     * @description 定义当前列的宽度
     */
    width?: CSSProperties['width']
    /**
     * 自定义表格
     */
    render?(value: T[K], record: T, index: number): ReactNode
  }
}[keyof T]

export interface TableProps<T> extends HTMLAttributes<HTMLDivElement> {
  bodyClassName?: string
  bodyStyle?: CSSProperties

  headerClassName?: string
  headerStyle?: CSSProperties

  wrapperClassName?: string
  wrapperStyle?: CSSProperties

  rowClassName?: string
  rowStyle?: CSSProperties

  /**
   * 是否显示边框
   */
  border?: boolean

  /**
   * 表头数据
   */
  headers: TableHeader<T>[]

  /**
   * 数据源
   */
  data: T[]

  /**
   * 每一行的ID
   */
  rowIndex?: keyof T
}

const Table = <T extends object>({
  data,
  headers,
  rowIndex,
  style = {},
  rowStyle = {},
  className = '',
  bodyStyle = {},
  headerStyle = {},
  wrapperStyle = {},
  rowClassName = '',
  bodyClassName = '',
  headerClassName = '',
  wrapperClassName = '',
  border = true,
  ...props
}: TableProps<T>) => {
  const gridTemplateColumns = useMemo(() => {
    return headers.reduce((header, nextHeader) => {
      return header + `minmax(0, ${num_to_px(nextHeader.width) ?? 'auto'}) `
    }, '')
  }, [headers])
  return (
    <div
      {...props}
      className={classNames(
        styles['t-table'],
        { [styles['border']]: border },
        className
      )}
      style={{
        ...style
      }}
    >
      <div
        className={classNames(styles['t-table__wrapper'], wrapperClassName)}
        style={{
          display: 'grid',
          height: '100%',
          gridTemplateColumns,
          ...wrapperStyle
        }}
      >
        <div
          className={classNames(styles['t-table__thead'], headerClassName)}
          style={{
            ...headerStyle
          }}
        >
          {headers.map(({ align, fieldProp, fieldName }) => (
            <div
              key={fieldProp}
              className={classNames(
                'flex align-center',
                styles['t-table__th'],
                { [styles['border']]: border }
              )}
              style={{
                textAlign: align
              }}
            >
              {fieldName}
            </div>
          ))}
        </div>
        <div
          className={classNames(styles['t-table__tbody'], bodyClassName)}
          style={{
            ...bodyStyle
          }}
        >
          {data.map((record, index) => (
            <div
              key={rowIndex ? `${record[rowIndex]}` : index}
              className={classNames(styles['t-table__tr'], rowClassName)}
              style={{
                ...rowStyle
              }}
            >
              {headers.map(
                ({ align, fieldProp, render = (text) => text }, index) => (
                  <div
                    className={classNames(styles['t-table__td'], {
                      [styles['border']]: border
                    })}
                    key={index}
                    style={{
                      textAlign: align
                    }}
                  >
                    {render(record[fieldProp], record, index) as ReactNode}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Table
