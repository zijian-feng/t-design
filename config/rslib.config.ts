import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules'
import { defineConfig, RslibConfig } from '@rslib/core'
import { writeFile } from 'fs/promises'
import { glob } from 'glob'
import { basename, dirname, resolve } from 'path'

export default defineConfig(async () => {
  const entryFiles = await glob(
    resolve(__dirname, '../src/components/**/index.tsx')
  )
  const entry = Object.fromEntries(
    entryFiles.map((file) => {
      const entryName = basename(dirname(file))
      return [entryName, file]
    })
  )

  // 先更新 components 下的 index.ts 文件
  const indexContent = Object.keys(entry)
    .map((entryName) => `import ${entryName} from './${entryName}'`)
    .join('\n')
    .concat('\n')
    .concat("import './index.scss'")
    .concat('\n')
    .concat('\n\n')
    .concat(
      `export {\n  ${Object.keys(entry).join(', \n  ')}\n}
      `
    )
    .concat('\n')
  const indexPath = resolve(__dirname, '../src/components/index.ts')
  await writeFile(indexPath, indexContent)

  const distRoot = resolve(__dirname, '../dist/@trove-ui/react')
  return {
    lib: [
      {
        dts: true,
        format: 'cjs',
        output: {
          distPath: {
            root: resolve(distRoot, 'lib')
          }
        }
      },
      {
        dts: true,
        format: 'esm',
        output: {
          distPath: {
            root: resolve(distRoot, 'es')
          }
        }
      },
      {
        dts: true,
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
        index: indexPath,
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
        ({ request }, callback) => {
          const rules = Object.keys(entry).map(
            (key) => new RegExp(`^./${key}$`)
          )
          const isValid =
            request && rules.findIndex((rule) => rule.test(request)) !== -1
          if (isValid) {
            console.log(request)
            callback(undefined, true)
          }
          callback()
        }
      ]
    }
  } as RslibConfig
})
