import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-analyzer'

const UMD_NAME = 'ReturnStyle'

export default [
  ...createOptions({
    directory: 'es2015'
  , target: 'ES2015'
  })
, ...createOptions({
    directory: 'es2018'
  , target: 'ES2018'
  })
]

function createOptions({ directory, target }) {
  const commonPlugins = [
  , typescript({ target })
  ]

  return [
    {
      input: 'src/index.ts'
    , output: createOutput('index')
    , plugins: [
        ...commonPlugins
      , analyze({ summaryOnly: true })
      ]
    }
  , {
      input: 'src/index.ts'
    , output: createMinification('index')
    , plugins: [
        ...commonPlugins
      , terser()
      ]
    }
  ]

  function createOutput(name) {
    return [
      {
        file: `dist/${directory}/${name}.mjs`
      , format: 'es'
      , sourcemap: true
      }
    , {
        file: `dist/${directory}/${name}.umd.js`
      , format: 'umd'
      , name: UMD_NAME
      , sourcemap: true
      }
    ]
  }

  function createMinification(name) {
    return [
      {
        file: `dist/${directory}/${name}.min.mjs`
      , format: 'es'
      , sourcemap: true
      }
    , {
        file: `dist/${directory}/${name}.umd.min.js`
      , format: 'umd'
      , name: UMD_NAME
      , sourcemap: true
      }
    ]
  }
}
