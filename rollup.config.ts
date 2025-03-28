import path from 'path'
import { fileURLToPath } from 'url'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const componentsDir = path.resolve(__dirname, 'src/components')
const componentEntries = fs
  .readdirSync(componentsDir)
  .filter((file) => fs.statSync(path.join(componentsDir, file)).isDirectory())
  .map((component) => {
    const input = path.join(componentsDir, component, 'index.tsx')
    return {
      input,
      output: [
        {
          dir: path.join('@t-design-ui/react/es', component),
          format: 'esm',
          sourcemap: true,
          chunkFileNames: '[name].js'
        }
        // {
        //   dir: path.join('@t-design-ui/react/lib', component),
        //   format: 'cjs',
        //   sourcemap: true,
        //   chunkFileNames: '[name].js'
        // },
        // {
        //   dir: path.join('@t-design-ui/react/dist', component),
        //   format: 'umd',
        //   sourcemap: true,
        //   chunkFileNames: '[name].js',
        //   name: `@t-design-ui/react.${component}`,
        //   globals: {
        //     react: 'React',
        //     'react-dom': 'ReactDOM'
        //   }
        // }
      ],
      external: ['react', 'react-dom'],
      plugins: [
        postcss(),
        resolve(),
        commonjs(),
        typescript({
          declaration: true,
          declarationDir: path.join(
            __dirname,
            '@t-design-ui/react/es',
            component,
            'types'
          ),
          tsconfig: path.resolve(__dirname, 'tsconfig.json')
        }),
        babel({
          exclude: 'node_modules/**',
          babelHelpers: 'bundled',
          extensions: ['.ts', '.js', '.tsx', '.scss']
        }),
        dynamicImportVars(),
        terser()
      ]
    }
  })

// 原入口文件配置
const originalEntry = {
  input: path.resolve(__dirname, './src/components/index.ts'),
  output: [
    {
      dir: '@t-design-ui/react/es',
      format: 'esm',
      sourcemap: true,
      chunkFileNames: '[name].js'
    }
    // {
    //   dir: '@t-design-ui/react/lib',
    //   format: 'cjs',
    //   sourcemap: true,
    //   chunkFileNames: '[name].js'
    // },
    // {
    //   dir: '@t-design-ui/react/dist',
    //   format: 'umd',
    //   sourcemap: true,
    //   chunkFileNames: '[name].js',
    //   name: '@t-design-ui/react',
    //   globals: {
    //     react: 'React',
    //     'react-dom': 'ReactDOM'
    //   }
    // }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    postcss(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      declaration: true,
      declarationDir: path.join(__dirname, '@t-design-ui/react/es/types')
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      extensions: ['.ts', '.js', '.tsx', '.scss']
    }),
    dynamicImportVars(),
    terser()
  ]
}

export default [originalEntry, ...componentEntries]
