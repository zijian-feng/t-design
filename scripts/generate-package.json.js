const {
  promises: { writeFile }
} = require('fs')
const { resolve } = require('path')

async function main() {
  const versionArg = process.argv.find((arg) => arg.startsWith('--version='))
  const version = versionArg ? versionArg.split('=')[1] : '0.1.0'
  let packageJsonPath = resolve(
    __dirname,
    '../dist/@trove-ui/react/package.json'
  )
  // 判断此操作是否为构建前的操作
  const isReady = process.argv.includes('--ready')
  if (isReady) {
    packageJsonPath = resolve(__dirname, '../src/components/package.json')
  }

  console.log('packageJsonPath >>> ', packageJsonPath)

  const packageJson = {
    name: '@trove-ui/react',
    version,
    description: 'A React component library for T Design UI',
    main: 'lib/index.js',
    module: 'es/index.js',
    typings: 'es/index.d.ts',
    keywords: [],
    author: 'fengzijian <fengzijian@happycloudsign.com>',
    license: 'ISC',
    packageManager: 'pnpm@10.6.5',
    dependencies: {
      react: '^19.0.0',
      'react-dom': '^19.0.0',
      classnames: '^2.5.1'
    },
    exports: {
      '.': {
        browser: {
          default: './es/index.mjs'
        },
        node: {
          default: './lib/index.js'
        }
      }
    }
  }
  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

main().then(() => {
  console.log('package.json generated successfully')
})
