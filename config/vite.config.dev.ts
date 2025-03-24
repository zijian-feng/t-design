import { mergeConfig } from 'vite'
import defaultConfig from './vite.config.default'

export default mergeConfig(defaultConfig, {
  server: {
    host: true,
    open: true
  }
})
