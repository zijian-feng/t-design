import { resolve } from 'path'
import defaultConfig from './default'
import { mergeRsbuildConfig } from '@rsbuild/core'

export default mergeRsbuildConfig(defaultConfig, {
  mode: 'development',
  server: {
    open: true,
    port: 7800
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src')
    }
  }
})
