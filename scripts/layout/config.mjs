export const ELK_VERSION = '0.12.0'
export const LAYOUT_VERSION = 'layout-v1.0.0'
export const GENERATOR_VERSION = 'adhd-layout-generator-v1.0.0'
export const CONFIGURATION_VERSION = 'elk-layered-v1'
export const OVERRIDE_SET_VERSION = 'layout-overrides-v1'

export const LAYER_ORDER = Object.freeze({
  context: 0,
  regulation: 1,
  behaviour: 2,
  pattern: 3,
  'functional-domain': 4,
})

export const NODE_DIMENSIONS = Object.freeze({
  'clinical-anchor': Object.freeze({ width: 300, height: 104 }),
  context: Object.freeze({ width: 300, height: 120 }),
  regulation: Object.freeze({ width: 300, height: 120 }),
  behaviour: Object.freeze({ width: 320, height: 120 }),
  pattern: Object.freeze({ width: 320, height: 120 }),
  'functional-domain': Object.freeze({ width: 340, height: 120 }),
})

export const MAIN_LAYOUT_OPTIONS = Object.freeze({
  'elk.algorithm': 'layered',
  'elk.direction': 'DOWN',
  'elk.edgeRouting': 'ORTHOGONAL',
  'elk.partitioning.activate': 'true',
  'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES',
  'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
  'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
  'elk.spacing.nodeNode': '72',
  'elk.layered.spacing.nodeNodeBetweenLayers': '112',
  'elk.padding': '[top=32,left=32,bottom=32,right=32]',
})

export const ANCHOR_LAYOUT_OPTIONS = Object.freeze({
  'elk.algorithm': 'layered',
  'elk.direction': 'RIGHT',
  'elk.spacing.nodeNode': '72',
  'elk.padding': '[top=24,left=24,bottom=24,right=24]',
})

export const compareCanonicalId = (left, right) => left < right ? -1 : left > right ? 1 : 0

