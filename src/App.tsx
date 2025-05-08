import './App.scss'
import { useState } from 'react'
import ConfigProvider from '@/components/ConfigProvider'
import UrlInputField from './components/Input/sample/UrlInputField'
const App = () => {
  const [size] = useState<'small' | 'medium' | 'large'>('large')
  const [prefixCls] = useState('t')
  return (
    <ConfigProvider size={size} prefixCls={prefixCls}>
      <UrlInputField />
    </ConfigProvider>
  )
}

export default App
