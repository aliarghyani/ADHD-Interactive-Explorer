import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SemanticRelationshipBrowser from '../../../app/components/system-map/SemanticRelationshipBrowser.vue'
import { systemMapCopy } from '../../../features/system-map/copy'
import { systemMapRepository } from '../../../features/system-map/knowledge'
import { buildSemanticRelationshipModel } from '../../../features/system-map/semantic-browser'
import { DomainLocalization } from '../../../localization'

const localization = new DomainLocalization(systemMapRepository)

describe('SemanticRelationshipBrowser', () => {
  it('provides a useful non-diagnostic empty state and clinical separation', () => {
    const wrapper = mount(SemanticRelationshipBrowser, {
      props: { model: null, locale: 'en', copy: systemMapCopy.en },
    })

    expect(wrapper.text()).toContain(systemMapCopy.en.selectPrompt)
    expect(wrapper.text()).toContain('CA1 and CA2 are formal clinical domains')
    expect(wrapper.findAll('.system-semantic-relationship')).toHaveLength(0)
  })

  it.each(['en', 'fa'] as const)('renders localized %s relationship groups from domain queries', (locale) => {
    const model = buildSemanticRelationshipModel(systemMapRepository, localization, 'BEH1', locale)
    const wrapper = mount(SemanticRelationshipBrowser, {
      props: { model, locale, copy: systemMapCopy[locale] },
    })

    expect(wrapper.get('[data-testid="semantic-selected-summary"]').text()).toContain(model.label)
    expect(wrapper.get('[data-relationship-group="upstream"]').findAll('li')).toHaveLength(model.upstream.length)
    expect(wrapper.get('[data-relationship-group="downstream"]').findAll('li')).toHaveLength(model.downstream.length)
    expect(wrapper.get('[data-relationship-group="feedback"]').findAll('li')).toHaveLength(model.feedback.length)
    expect(wrapper.text()).toContain(systemMapCopy[locale].clinicalSeparation)
  })

  it('emits canonical selection and explicit graph-focus requests separately', async () => {
    const model = buildSemanticRelationshipModel(systemMapRepository, localization, 'BEH1', 'en')
    const wrapper = mount(SemanticRelationshipBrowser, {
      props: { model, locale: 'en', copy: systemMapCopy.en },
    })
    const related = model.upstream[0] ?? model.downstream[0] ?? model.feedback[0]
    expect(related).toBeDefined()

    await wrapper.findAll('.system-semantic-relationship')[0]!.trigger('click')
    expect(wrapper.emitted('nodeSelected')).toEqual([[related!.nodeId]])
    expect(wrapper.emitted('showInGraph')).toBeUndefined()

    await wrapper.get('.system-show-in-graph').trigger('click')
    expect(wrapper.emitted('showInGraph')).toHaveLength(1)
  })
})
