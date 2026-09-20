import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const domainRoot = join(process.cwd(), 'domain')
const sourceFiles = (await readdir(domainRoot)).filter((file) => file.endsWith('.ts'))
const sources = await Promise.all(sourceFiles.map((file) => readFile(join(domainRoot, file), 'utf8')))

describe('production domain boundary', () => {
  it('does not import framework, renderer, layout, or spike infrastructure', () => {
    const imports = sources.flatMap((source) => [...source.matchAll(/(?:from\s+|import\s*)['"]([^'"]+)['"]/g)].map((match) => match[1]))
    expect(imports).not.toContain('vue')
    expect(imports).not.toContain('nuxt')
    expect(imports).not.toContain('elkjs')
    expect(imports.some((path) => /app\/domain|spike|renderer|layout/.test(path))).toBe(false)
  })

  it('contains no prohibited assessment or profiling API', () => {
    const joined = sources.join('\n')
    const prohibited = [
      'calculateADHD', 'scoreBehaviours', 'calculateSeverity', 'inferPresentation', 'matchPresentation',
      'rankDiagnosis', 'estimateADHDLikelihood', 'buildUserProfile', 'buildSymptomProfile', 'predictFunctionalImpact',
    ]
    for (const name of prohibited) expect(joined).not.toMatch(new RegExp(`\\b${name}\\s*\\(`))
  })
})
