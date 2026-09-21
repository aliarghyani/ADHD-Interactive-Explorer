import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppPageHeader from '../../../app/components/ui/AppPageHeader.vue'
import AppPanel from '../../../app/components/ui/AppPanel.vue'
import EvidenceBadge from '../../../app/components/ui/EvidenceBadge.vue'
import SafetyNotice from '../../../app/components/ui/SafetyNotice.vue'
import { systemMapRepository } from '../../../features/system-map/knowledge'
import { SafetyAccess } from '../../../safety'

const PassThroughCard = defineComponent({
  inheritAttrs: false,
  props: { as: { type: String, default: 'section' } },
  setup(props, { attrs, slots }) {
    return () => h(props.as, attrs, slots.default?.())
  },
})

const AlertStub = defineComponent({
  inheritAttrs: false,
  props: { description: { type: String, required: true } },
  setup(props, { attrs }) {
    return () => h('div', attrs, props.description)
  },
})

const BadgeStub = defineComponent({
  inheritAttrs: false,
  props: { label: { type: String, required: true } },
  setup(props, { attrs }) {
    return () => h('span', attrs, props.label)
  },
})

function sourceFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name)
    return entry.isDirectory() ? sourceFiles(path) : [path]
  }).filter((path) => /\.(ts|vue)$/.test(path))
}

describe('WP-07.5 shared UI semantics', () => {
  it('provides one reusable page-heading hierarchy without product-specific copy', () => {
    const wrapper = mount(AppPageHeader, {
      props: { kicker: 'Educational model', title: 'Explore concepts', summary: 'A calm introduction.' },
      slots: { actions: '<nav aria-label="Language">EN · FA</nav>' },
    })

    expect(wrapper.get('h1').text()).toBe('Explore concepts')
    expect(wrapper.get('.app-page-header__kicker').text()).toBe('Educational model')
    expect(wrapper.get('[aria-label="Language"]').text()).toContain('FA')
  })

  it('exposes stable product-level surface semantics over Nuxt UI Card', () => {
    const wrapper = mount(AppPanel, {
      props: { as: 'aside', tone: 'secondary', labelledby: 'panel-title' },
      slots: { default: '<h2 id="panel-title">Details</h2>' },
      global: { stubs: { UCard: PassThroughCard } },
    })

    expect(wrapper.element.tagName).toBe('ASIDE')
    expect(wrapper.attributes()).toMatchObject({ 'data-surface': 'secondary', 'aria-labelledby': 'panel-title' })
  })

  it.each(['en', 'fa'] as const)('renders authoritative %s safety copy without rewriting it', (locale) => {
    const safety = new SafetyAccess(systemMapRepository)
    const content = safety.getRequired('globalEducationalDisclaimer', locale)
    const text = content.localized.fields.text
    if (typeof text !== 'string') throw new TypeError('Expected authoritative safety text')
    const wrapper = mount(SafetyNotice, {
      props: { text, kind: 'global' },
      global: { stubs: { UAlert: AlertStub } },
    })

    expect(wrapper.text()).toBe(text)
    expect(wrapper.attributes('data-safety-kind')).toBe('global')
  })

  it.each(['Clinical', 'Strong', 'Moderate', 'Limited'])('keeps %s evidence qualitative and textual', (label) => {
    const wrapper = mount(EvidenceBadge, {
      props: { label },
      global: { stubs: { UBadge: BadgeStub } },
    })

    expect(wrapper.text()).toBe(label)
    expect(wrapper.attributes('data-evidence-level')).toBe(label)
    expect(wrapper.text()).not.toMatch(/%|score|confidence/i)
  })
})

describe('WP-07.5 integration boundaries', () => {
  it('pins the compatible Nuxt UI release without changing accepted Nuxt or i18n versions', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8')) as {
      dependencies: Record<string, string>
      devDependencies: Record<string, string>
    }
    const nuxtConfig = readFileSync('nuxt.config.ts', 'utf8')

    expect(packageJson.dependencies['@nuxt/ui']).toBe('4.11.1')
    expect(packageJson.dependencies.nuxt).toBe('4.5.2')
    expect(packageJson.devDependencies['@nuxtjs/i18n']).toBe('10.6.0')
    expect(nuxtConfig).toContain("'@nuxt/ui'")
    expect(nuxtConfig).toContain('fonts: false')
    expect(nuxtConfig).toContain('colorMode: false')
  })

  it('keeps scientific and domain layers independent from Nuxt UI', () => {
    const roots = ['visualization', 'features', 'domain', 'accessibility', 'safety']
    const offenders = roots.flatMap(sourceFiles).filter((path) => {
      const source = readFileSync(path, 'utf8')
      return source.includes('@nuxt/ui') || /<U(?:Button|Card|Badge|Alert|Tooltip)/.test(source)
    })

    expect(offenders).toEqual([])
  })

  it('keeps shared UI components free of ADHD domain data dependencies', () => {
    const offenders = sourceFiles('app/components/ui').filter((path) => {
      const source = readFileSync(path, 'utf8')
      return /from ['"].*(?:domain|knowledge|features\/system-map)/.test(source)
    })

    expect(offenders).toEqual([])
  })
})
