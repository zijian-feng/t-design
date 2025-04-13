import fs from 'fs'
import { cp } from 'fs/promises'
import path, { resolve } from 'path'
import { sassPlugin } from 'esbuild-sass-plugin'
import { defineConfig, Format, Options } from 'tsup'

// 动态生成 entry 配置
function generateEntry() {
  const entry: { [key: string]: string } = {}
  // 扫描组件目录
  const componentsDir = path.join(__dirname)
  const componentFolders = fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter(
      (dirent) =>
        dirent.isDirectory() &&
        !['node_modules', '@t-design-ui'].includes(dirent.name)
    )
    .map((dirent) => dirent.name)
  // 获取组件入口
  componentFolders.forEach((folder) => {
    const indexFilePath = path.join(componentsDir, folder, 'index.tsx')
    if (fs.existsSync(indexFilePath)) {
      entry[folder.toLowerCase()] = indexFilePath
    }
  })
  return entry
}

const getOptions = (
  format: Format,
  entry: Options['entry'],
  dirName?: string
): Options => {
  const setDirByFormat = {
    cjs: 'lib',
    esm: 'es',
    iife: 'iife'
  }
  let outDir = `@t-design-ui/react/${setDirByFormat[format]}`

  if (dirName) {
    outDir += `/${dirName}`
  }
  return {
    entry,
    outDir,
    format,
    dts: true,
    clean: true,
    // minify: true,
    esbuildPlugins: [sassPlugin()],
    external: ['react', 'react-dom', 'classnames']
  }
}

const entrys = generateEntry()
const entrysKey = Object.keys(entrys)
const cjsOptions = entrysKey.map((name) => {
  return getOptions('cjs', [entrys[name]], name)
})
const esmOptions = entrysKey.map((name) => {
  return getOptions('esm', [entrys[name]], name)
})
const onSuccess = async () => {
  await cp(
    resolve(__dirname, 'package.json'),
    resolve(__dirname, '@t-design-ui/react/package.json')
  )
}
const cjsEntryOptions = {
  ...getOptions('cjs', [resolve(__dirname, 'index.ts')]),
  external: [/Aside|Button|Container|Footer|Header|Layout]/]
} as Options
const esmEntryOptions = {
  ...getOptions('esm', [resolve(__dirname, 'index.ts')]),
  external: [/Aside|Button|Container|Footer|Header|Layout/],
  onSuccess
} as Options
export default defineConfig([
  ...cjsOptions,
  ...esmOptions,
  cjsEntryOptions,
  esmEntryOptions
])
