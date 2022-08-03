#!/usr/bin/env node
import * as chalk from 'chalk'
import * as minimist from 'minimist'
import { join } from 'path'
import { printErrorAndExit, sourceMap } from './utils'
import { existsSync } from 'fs'

const argv = minimist(process.argv.slice(2))
const projectNameInput = argv._[0]
const mapInput = argv._[1]

if (!projectNameInput || !mapInput) {
  console.log()
  console.log(
    chalk.white('Usage: unpack'),
    chalk.green('<project-directory> <path-to-map-file>'),
  )
  console.log(
    chalk.white('Or: unpack'),
    chalk.green('<project-directory> <path-to-directory-of-map-files>'),
  )
  console.log()
  console.log(
    chalk.blue(
      '*Note:   Minified file should be placed under path specified in .map file.',
    ),
  )
  console.log()
  process.exit()
}

const pathToProject = join(process.cwd(), projectNameInput)

if (existsSync(pathToProject)) {
  printErrorAndExit(`Project folder already exists at: ${pathToProject}`)
}

sourceMap(mapInput, pathToProject).then(() => {
  console.log(chalk.green('🎉  All done! Enjoy exploring your code 💻'))
}).catch(err => {
  console.log(chalk.red('Oops! Something is wrong with the source map'))
  console.log(
    chalk.red(
      'Make sure .min.js is correctly placed under the path specified in .map file',
    ),
  )
  console.error(err)
  process.exit(1)
})
