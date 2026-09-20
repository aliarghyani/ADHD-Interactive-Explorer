import { describe, expect, it } from 'vitest'
import { KnowledgeRepository } from '../../../domain'
import {
  DomainLocalization,
  documentAttributesForLocale,
  geometryForLocale,
  switchLocaleInPath,
} from '../../../localization'
import { productionKnowledge } from '../domain/fixture'

const repository = new KnowledgeRepository(productionKnowledge)
const localization = new DomainLocalization(repository)

describe('shared localization contract', () => {
  it('maps locale to document language and direction', () => {
    expect(documentAttributesForLocale('en')).toEqual({ lang: 'en', dir: 'ltr' })
    expect(documentAttributesForLocale('fa')).toEqual({ lang: 'fa', dir: 'rtl' })
  })

  it('switches only the explicit locale route segment', () => {
    expect(switchLocaleInPath('/en/map/BEH1?layer=behaviour#detail', 'fa'))
      .toBe('/fa/map/BEH1?layer=behaviour#detail')
    expect(switchLocaleInPath('/fa/map/BEH1', 'en')).toBe('/en/map/BEH1')
    expect(() => switchLocaleInPath('/map/BEH1', 'fa')).toThrow('supported locale')
  })

  it('changes localized display fields without changing canonical identity', () => {
    const english = localization.getNode('BEH1', 'en')
    const persian = localization.getNode('BEH1', 'fa')

    expect(english.targetId).toBe('BEH1')
    expect(persian.targetId).toBe('BEH1')
    expect(english.node).toBe(persian.node)
    expect(english.fields.label).not.toBe(persian.fields.label)
  })

  it('never creates locale-specific geometry', () => {
    const artifact = { nodes: [{ id: 'BEH1', x: 10, y: 20 }], edges: [{ source: 'BEH1', target: 'REG1' }] }
    expect(geometryForLocale(artifact, 'en')).toBe(artifact)
    expect(geometryForLocale(artifact, 'fa')).toBe(artifact)
  })
})
