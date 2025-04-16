import { basename, dirname, resolve } from 'path'
import { defineConfig, RslibConfig } from '@rslib/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules'
import { glob } from 'glob'
import { writeFile } from 'fs/promises'

export default defineConfig(async () => {
  const entryFiles = await glob('src/components/**/index.tsx')
  const entry = Object.fromEntries(
    entryFiles.map((file) => {
      const entryName = basename(dirname(file))
      return [entryName, `./${file}`]
    })
  )

  // 先更新 components 下的 index.ts 文件
  const indexContent = Object.keys(entry)
    .map(
      (entryName) => `export { default as ${entryName} } from './${entryName}'`
    )
    .join('\n')
  const indexPath = resolve(__dirname, '../src/components/index.ts')
  await writeFile(indexPath, indexContent)

  const distRoot = resolve(__dirname, '../dist/@t-design-ui/react')
  return {
    lib: [
      {
        dts: {
          distPath: resolve(distRoot, 'lib/types')
        },
        format: 'cjs',
        output: {
          distPath: {
            root: resolve(distRoot, 'lib')
          }
        }
      },
      {
        dts: {
          distPath: resolve(distRoot, 'es/types')
        },
        format: 'esm',
        output: {
          distPath: {
            root: resolve(distRoot, 'es')
          }
        }
      },
      {
        dts: {
          distPath: resolve(distRoot, 'dist/types')
        },
        format: 'umd',
        umdName: 'TDesignUI',
        output: {
          distPath: {
            root: resolve(distRoot, 'dist')
          }
        }
      }
    ],
    plugins: [pluginReact(), pluginSass(), pluginTypedCSSModules()],
    source: {
      tsconfigPath: resolve(__dirname, '../src/components/tsconfig.json'),
      entry: {
        index: resolve(__dirname, '../src/components/index.ts'),
        ...entry
      }
    },
    output: {
      filename: {
        js: (pathData) => {
          if (pathData.chunk?.name === 'index') {
            return '[name].js'
          }
          return '[name]/index.js'
        },
        css: (pathData) => {
          if (pathData.chunk?.name === 'index') {
            return '[name].css'
          }
          return '[name]/index.css'
        }
      },
      distPath: {
        root: distRoot
      },
      target: 'web',
      cleanDistPath: true,
      externals: [
        'react',
        'react-dom',
        'classnames',
        ...Object.keys(entry).map((key) => new RegExp(key))
      ]
    }
  } as RslibConfig
})
