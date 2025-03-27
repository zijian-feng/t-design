import { resolve } from 'path'
import defaultConfig from './default'
import { mergeRsbuildConfig } from '@rsbuild/core'

export default mergeRsbuildConfig(defaultConfig, {
  mode: 'development',
  dev: {
    hmr: true
  },
  server: {
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src')
    }
  }
})
