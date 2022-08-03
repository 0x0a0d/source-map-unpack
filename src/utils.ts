import { existsSync, readFileSync, statSync, writeFileSync } from 'fs'
import { SourceMapConsumer } from 'source-map'
import { sync as globSync } from 'glob'
import { dirname, resolve } from 'path'
import * as chalk from 'chalk'
import { sync } from 'mkdirp'

export const printErrorAndExit = (message: string) => {
  console.log(chalk.red(message))
}

export const scanJsMapFiles = (scanPath: string): string[] => {
  return globSync('**/*.js.map', {
    cwd: resolve(scanPath),
    realpath: true,
  })
}

export const resolveInputMapFiles = (inputPath: string): string[] => {
  if (!existsSync(inputPath)) {
    throw new Error(`Can't find map file(s) under : ${inputPath}`)
  }

  if (statSync(inputPath).isDirectory()) {
    return scanJsMapFiles(inputPath)
  }

  return [inputPath]
}

type UnpackResultItem = {path: string, content: string}
export const unpack = async(mapFilePath: string): Promise<UnpackResultItem[]> => {
  const mapFileContent = readFileSync(mapFilePath, 'utf8')

  const consumer: SourceMapConsumer = await new SourceMapConsumer(mapFileContent)
  return (consumer as any).sources.map((source: string) => {
    const filePath = source.startsWith('webpack://') ? source.slice('webpack://'.length) : source
    const content: string = consumer.sourceContentFor(source) as string
    return {
      path: filePath,
      content,
    }
  })
}

export const sourceMap = async(cmdInput: string, pathToProject: string) => {
  console.log(chalk.green(`Unpacking 🛍  your source maps 🗺`))
  const inputPath = resolve(cmdInput)
  const pathMapFiles = resolveInputMapFiles(inputPath)

  for (const pathMapFile of pathMapFiles) {
    const result = await unpack(resolve(inputPath, pathMapFile))
    result.forEach(value => {
      const filePath = resolve(pathToProject, value.path)
      sync(dirname(filePath))
      writeFileSync(filePath, value.content)
    })
  }
}
