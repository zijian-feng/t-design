const {
  promises: { writeFile }
} = require('fs')
const { resolve } = require('path')

async function main() {
  const config = {
    compilerOptions: {
      target: 'ESNext',
      jsx: 'react-jsx',
      module: 'NodeNext',
      moduleResolution: 'nodenext',
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      strict: true,
      skipLibCheck: true,
      noEmit: false,
      declaration: true,
      emitDeclarationOnly: true
    }
  }
  await writeFile(
    resolve(__dirname, '../src/components/tsconfig.json'),
    JSON.stringify(config, null, 2)
  )
}

main().then(() => {
  console.log('tsconfig.json generated successfully')
})
