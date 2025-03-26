import { resolve } from 'path'
import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'

export default defineConfig({
  html: {
    title: 'T Design',
  },
  plugins: [pluginReact(), pluginSass()],
  source: {
    entry: {
      index: resolve(__dirname, '../src/main.tsx'),
    },
  },
})
