import { describe, expect, it } from 'vitest'
import { KnowledgeRepository } from '../../../domain'
import { DomainLocalization, switchLocaleInPath } from '../../../localization'
import { SafetyAccess } from '../../../safety'
import { productionKnowledge } from '../../unit/domain/fixture'

describe('locale switching across shared production services', () => {
  const repository = new KnowledgeRepository(productionKnowledge)
  const localization = new DomainLocalization(repository)
  const safety = new SafetyAccess(repository)

  it.each([
    { from: 'en', to: 'fa', path: '/en/map/BEH1' },
    { from: 'fa', to: 'en', path: '/fa/map/BEH1' },
  ] as const)('switches $from to $to while retaining BEH1', ({ to, path }) => {
    const switchedPath = switchLocaleInPath(path, to)
    const content = localization.getNode('BEH1', to)
    const safetyContent = safety.getRequired('behaviourCaution', to)

    expect(switchedPath).toBe(`/${to}/map/BEH1`)
    expect(content.node.id).toBe('BEH1')
    expect(content.targetId).toBe('BEH1')
    expect(safetyContent.localized.locale).toBe(to)
    expect(safetyContent.record.id).toBe(safetyContent.localized.targetId)
  })
})
