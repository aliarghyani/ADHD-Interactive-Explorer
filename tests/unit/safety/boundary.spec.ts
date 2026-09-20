import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

function sourceFiles(root: string): string[] {
  return readdirSync(root).flatMap((entry) => {
    const path = join(root, entry)
    return statSync(path).isDirectory() ? sourceFiles(path) : [path]
  }).filter((path) => /\.(?:ts|vue)$/.test(path))
}

describe('WP-05 dependency boundaries', () => {
  it('does not depend on graph rendering, spike data, explorers, or ELK', () => {
    const files = [...sourceFiles('localization'), ...sourceFiles('safety')]
    const source = files.map((path) => readFileSync(path, 'utf8')).join('\n')

    expect(source).not.toMatch(/elkjs|VisualGraph|GraphReadModel|spike-data|feature[s/]\w*explorer/i)
  })

  it('does not add Pinia', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8')) as {
      dependencies?: Record<string, string>
      devDependencies?: Record<string, string>
    }
    expect(packageJson.dependencies?.pinia).toBeUndefined()
    expect(packageJson.devDependencies?.pinia).toBeUndefined()
  })

  it('does not access browser storage from shared module initialization', () => {
    const files = [...sourceFiles('localization'), ...sourceFiles('safety')]
    const source = files.map((path) => readFileSync(path, 'utf8')).join('\n')
    expect(source).not.toMatch(/localStorage|sessionStorage/)
  })
})
