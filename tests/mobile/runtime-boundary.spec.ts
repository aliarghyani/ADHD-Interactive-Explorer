import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

function sourceFiles(root: string): string[] {
  return readdirSync(root).flatMap((entry) => {
    const path = join(root, entry)
    return statSync(path).isDirectory() ? sourceFiles(path) : [path]
  }).filter((path) => /\.(?:ts|vue)$/.test(path))
}

describe('WP-12 mobile runtime boundary', () => {
  it('does not depend on desktop graph, layout, viewport, or prohibited product state', () => {
    const root = join(process.cwd(), 'features', 'system-map', 'mobile')
    const componentRoot = join(process.cwd(), 'app', 'components', 'system-map', 'mobile')
    const source = [...sourceFiles(root), ...sourceFiles(componentRoot)]
      .map((path) => readFileSync(path, 'utf8'))
      .join('\n')

    expect(source).not.toMatch(/VisualGraph|LayoutArtifact|elkjs|nodeGeometry|edgeGeometry|viewportTransform|\bpan\b|\bzoom\b/)
    expect(source).not.toMatch(/diagnosisResult|recommendedPath|bestPath|centrality|mobileSelectedNodeId|\bprofile\b|\bprobability\b|\blikelihood\b|\bscore\b/)
  })

  it('keeps desktop renderer and layout behind the async desktop component', () => {
    const page = readFileSync(join(process.cwd(), 'app', 'pages', '[locale]', 'map', '[[nodeId]].vue'), 'utf8')
    expect(page).toContain('defineAsyncComponent')
    expect(page).toContain("window.matchMedia('(min-width: 48rem)')")
    expect(page).toContain('v-if="desktopMediaMatches"')
    expect(page).not.toMatch(/from ['"].*visualization\/system-map\/layout/)
    expect(page).not.toMatch(/VisualGraph\.client/)
    expect(page).not.toMatch(/window\.innerWidth/)
  })
})
