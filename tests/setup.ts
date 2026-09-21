import { defineComponent, h } from 'vue'
import { config } from '@vue/test-utils'

const passThrough = (fallbackTag: string) => defineComponent({
  inheritAttrs: false,
  props: { as: { type: String, default: fallbackTag } },
  setup(props, { attrs, slots }) {
    return () => h(props.as, attrs, slots.default?.())
  },
})

config.global.stubs = {
  UAlert: defineComponent({
    inheritAttrs: false,
    props: { description: { type: String, default: '' } },
    setup(props, { attrs }) {
      return () => h('div', attrs, props.description)
    },
  }),
  UBadge: defineComponent({
    inheritAttrs: false,
    props: { label: { type: String, default: '' } },
    setup(props, { attrs, slots }) {
      return () => h('span', attrs, slots.default?.() ?? props.label)
    },
  }),
  UButton: passThrough('button'),
  UCard: passThrough('section'),
  UTooltip: passThrough('span'),
}
