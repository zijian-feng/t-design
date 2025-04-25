const {
  promises: { copyFile, rm }
} = require('fs')
const path = require('path')
const { glob } = require('glob')
const { resolve } = require('path')

async function main() {
  try {
    // 获取所有组件的类型文件s
    const getTypeFiles = async () => {
      const files = []
      for await (const format of ['lib', 'es', 'dist']) {
        files.push(
          ...(await glob(
            resolve(
              __dirname,
              `../dist/@trove-ui/react/${format}/components/**/*.d.{ts,mts}`
            )
          ))
        )
      }
      return files
    }
    const typeFiles = await getTypeFiles()
    // 处理每个类型文件
    for (const file of typeFiles) {
      await copyFile(file, file.replace('/components', ''))
    }
  } catch (error) {
    console.error('Error reorganizing type files:', error)
  }
}

main().then((message) => {
  console.log('Type definition files have been reorganized successfully.')
})
