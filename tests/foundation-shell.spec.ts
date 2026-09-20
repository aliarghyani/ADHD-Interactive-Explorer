import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FoundationShell from '../app/components/FoundationShell.vue'

const NuxtLinkStub = defineComponent({
  props: {
    to: { type: String, required: true },
    hreflang: { type: String, required: true },
  },
  template: '<a :href="to" :hreflang="hreflang"><slot /></a>',
})

describe('FoundationShell', () => {
  it.each([
    { locale: 'en' as const, direction: 'ltr' as const, href: '/fa', hreflang: 'fa' },
    { locale: 'fa' as const, direction: 'rtl' as const, href: '/en', hreflang: 'en' },
  ])('renders the $locale locale shell', ({ locale, direction, href, hreflang }) => {
    const wrapper = mount(FoundationShell, {
      props: {
        locale,
        direction,
        kicker: 'Work package 01',
        title: 'Foundation ready',
        summary: 'Ready for the next bounded work package.',
        switchHref: href,
        switchLabel: 'Switch language',
      },
      global: {
        stubs: { NuxtLink: NuxtLinkStub },
      },
    })

    expect(wrapper.get('main').attributes()).toMatchObject({ dir: direction, 'data-locale': locale })
    expect(wrapper.get('h1').text()).toBe('Foundation ready')
    expect(wrapper.get('a').attributes()).toMatchObject({ href, hreflang })
  })
})
