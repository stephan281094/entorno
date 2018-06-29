#!/usr/bin/env node
const { promisify } = require('util')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackBaseConfig = require('../webpack.config.js')

// Turn fs.readFile into a promise.
const readFile = promisify(fs.readFile)
const cwd = path.resolve('.')

// Get Webpack compiler.
const getCompiler = async mode => {
  const projectsRegistry = await readFile('entorno.json', 'utf-8')
  const webpackConfig = {
    ...webpackBaseConfig,
    mode,
    output: {
      path: path.resolve(cwd, 'dist')
    },
    plugins: [
      ...webpackBaseConfig.plugins,
      new webpack.DefinePlugin({ projectsRegistry })
    ]
  }

  return webpack(webpackConfig)
}

// Commands.
const commands = {
  async build() {
    process.stdout.write('Building entorno... ')
    const compiler = await getCompiler('production')

    compiler.run((err, stats) => {
      if (err) throw err

      process.stdout.write('done\n')
    })
  },

  async dev() {
    const compiler = await getCompiler('development')
    const server = new WebpackDevServer(compiler, webpackBaseConfig.devServer)

    server.listen(8080, '127.0.0.1', () => {
      console.log('Starting server on http://localhost:8080')
    })
  }
}

const command = process.argv[2]
if (!command) {
  console.log(`Available commands: ${Object.keys(commands).join(', ')}`)
} else if (commands[command]) {
  try {
    commands[command]()
  } catch (err) {
    console.err(err)
    process.exit(1)
  }
} else {
  console.error(`Command "${command}" does not exist.`)
}
