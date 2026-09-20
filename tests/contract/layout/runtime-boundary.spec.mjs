import fs from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const runtimeRoots = ['app', 'domain', 'server']

describe('runtime ELK boundary', () => {
  it('keeps elkjs imports out of application and domain runtime code', async () => {
    const violations = []
    for (const relativeRoot of runtimeRoots) {
      const root = path.join(process.cwd(), relativeRoot)
      try {
        for (const file of await walk(root)) {
          const source = await fs.readFile(file, 'utf8')
          if (/from\s+['"]elkjs|require\(['"]elkjs/.test(source)) violations.push(path.relative(process.cwd(), file))
        }
      } catch (error) {
        if (error.code !== 'ENOENT') throw error
      }
    }
    expect(violations).toEqual([])
  })
})

async function walk(directory) {
  const files = []
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await walk(target))
    else if (/\.(?:[cm]?[jt]s|vue)$/.test(entry.name)) files.push(target)
  }
  return files
}
