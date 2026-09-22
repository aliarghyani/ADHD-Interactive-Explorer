import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { SafetyAccess } from '../../../safety'
import { systemMapRepository } from '../../../features/system-map/knowledge'
import { createHomeContent } from '../../../features/home/home-content'
import { getHomeSafetyText } from '../../../features/home/home-safety.server'
import en from '../../../i18n/locales/en.json'
import fa from '../../../i18n/locales/fa.json'

function translate(messages: object): (key: string) => string {
  return (key) => {
    let value: unknown = messages
    for (const segment of key.split('.')) value = (value as Record<string, unknown>)[segment]
    if (typeof value !== 'string') throw new TypeError(`Missing test translation: ${key}`)
    return value
  }
}

function sourceFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name)
    return entry.isDirectory() ? sourceFiles(path) : [path]
  }).filter((path) => /\.(ts|vue|json)$/.test(path))
}

function keyPaths(value: unknown, prefix = ''): string[] {
  if (!value || typeof value !== 'object') return [prefix]
  return Object.entries(value).flatMap(([key, child]) => keyPaths(child, prefix ? `${prefix}.${key}` : key))
}

describe('WP-07.6 Home integration boundaries', () => {
  it.each(['en', 'fa'] as const)('uses the authoritative mandatory %s safety content', (locale) => {
    const authoritative = new SafetyAccess(systemMapRepository)
      .getRequired('globalEducationalDisclaimer', locale)
      .localized.fields.text

    expect(getHomeSafetyText(locale)).toBe(authoritative)
  })

  it('keeps English and Persian production copy structurally complete', () => {
    expect(keyPaths(en).sort()).toEqual(keyPaths(fa).sort())
    expect(keyPaths(en)).toContain('home.entries.presentations.description')
    expect(keyPaths(en)).toContain('home.model.feedback.description')
  })

  it.each([
    ['en', en],
    ['fa', fa],
  ] as const)('exposes only implemented destinations as links for %s', (locale, messages) => {
    const content = createHomeContent(translate(messages), locale)
    const available = content.navigation.filter((item) => item.available)
    const unavailable = content.navigation.filter((item) => !item.available)

    expect(available.map((item) => item.href)).toEqual([`/${locale}`, `/${locale}/map`, `/${locale}/behaviours`, `/${locale}/context`])
    expect(unavailable).toHaveLength(3)
    expect(unavailable.every((item) => item.href === undefined)).toBe(true)
    expect(content.entryPoints.filter((item) => item.available).map((item) => item.href)).toEqual([`/${locale}/map`, `/${locale}/behaviours`, `/${locale}/context`])
  })

  it('keeps graph, layout, ELK, and detailed evidence dependencies out of Home client code', () => {
    const clientSources = [
      'app/app.vue',
      'app/pages/index.vue',
      'app/components/AppShell.vue',
      'app/components/home/HomeExperience.vue',
      'features/home/home-content.ts',
    ].map((path) => readFileSync(path, 'utf8')).join('\n')

    expect(clientSources).not.toMatch(/VisualGraph|LayoutArtifact|elkjs|production-layout|features\/system-map|evidence\.json|sources\.json/)
    expect(readFileSync('features/home/home-safety.server.ts', 'utf8')).toContain('knowledge/source/safety/safety.json')
    expect(readFileSync('app/pages/index.vue', 'utf8')).toContain('import.meta.server')
  })

  it('mounts one route-aware product shell and removes the older map-local navigation', () => {
    const appRoot = readFileSync('app/app.vue', 'utf8')
    const homePage = readFileSync('app/pages/index.vue', 'utf8')
    const mapPage = readFileSync('app/pages/[locale]/map/[[nodeId]].vue', 'utf8')

    expect(appRoot.match(/<AppShell/g)).toHaveLength(1)
    expect(homePage).not.toContain('<AppShell')
    expect(mapPage).not.toContain('system-locale-switcher')
    expect(readFileSync('app/components/AppShell.vue', 'utf8')).toContain('aria-current')
  })

  it('removes internal delivery language from all production Home surfaces', () => {
    const productionSources = [
      ...sourceFiles('app/components/home'),
      ...sourceFiles('features/home'),
      'app/components/AppShell.vue',
      'app/pages/index.vue',
      'i18n/locales/en.json',
      'i18n/locales/fa.json',
    ].map((path) => readFileSync(path, 'utf8')).join('\n')

    expect(productionSources).not.toMatch(/Foundation ready|Work package|delivery pipeline|bounded work package/i)
  })
})
