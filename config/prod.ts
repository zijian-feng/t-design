import defaultConfig from './default'
import { mergeRsbuildConfig } from '@rsbuild/core'

export default mergeRsbuildConfig(defaultConfig, {
  mode: 'production'
})
