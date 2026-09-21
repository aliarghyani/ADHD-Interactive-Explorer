import { computed, ref, type ComputedRef, type Ref } from 'vue'
import type { CanonicalNodeId, KnowledgeRepository, Locale } from '../../domain'
import type { DomainLocalization } from '../../localization'
import type { SafetyAccess } from '../../safety'
import type { LayoutArtifact } from '../../visualization/system-map/layout'
import { semanticModelToSelectedNodeDetail, type SelectedNodeDetail } from './detail'
import {
  allFilterableLayers,
  buildGraphReadModel,
  type FilterableLayer,
  type GraphReadModel,
} from './graph-read-model'
import { buildSemanticRelationshipModel, type SemanticRelationshipModel } from './semantic-browser'

export interface SystemMapExperienceOptions {
  readonly repository: KnowledgeRepository
  readonly localization: DomainLocalization
  readonly safety: SafetyAccess
  readonly layout: LayoutArtifact
  readonly locale: Ref<Locale>
  readonly requestedNodeId: Ref<string | null>
  readonly navigate: (path: string) => Promise<unknown> | unknown
}

export interface SystemMapExperience {
  readonly selectedNodeId: ComputedRef<CanonicalNodeId | null>
  readonly invalidNodeId: ComputedRef<boolean>
  readonly visibleLayers: Ref<ReadonlySet<FilterableLayer>>
  readonly graph: ComputedRef<GraphReadModel>
  readonly detail: ComputedRef<SelectedNodeDetail | null>
  readonly semantic: ComputedRef<SemanticRelationshipModel | null>
  readonly graphSafetyText: ComputedRef<string>
  readonly globalSafetyText: ComputedRef<string>
  readonly layout: LayoutArtifact
  routeFor(nodeId?: CanonicalNodeId | null, targetLocale?: Locale): string
  selectNode(nodeId: CanonicalNodeId): Promise<unknown>
  clearSelection(): Promise<unknown>
  setLayerVisible(layer: FilterableLayer, visible: boolean): void
}

function localizedText(fields: Readonly<Record<string, string | readonly string[]>>, id: string): string {
  const text = fields.text
  if (typeof text !== 'string') throw new TypeError(`Safety copy must contain text: ${id}`)
  return text
}

/** Coordinates route state, filters, safety, localization, detail, and graph projection. */
export function useSystemMapExperience(options: SystemMapExperienceOptions): SystemMapExperience {
  const canonicalIds = new Set(options.repository.nodes.map((node) => node.id))
  const visibleLayers = ref<ReadonlySet<FilterableLayer>>(new Set(allFilterableLayers))
  const selectedNodeId = computed<CanonicalNodeId | null>(() => {
    const requested = options.requestedNodeId.value
    return requested && canonicalIds.has(requested as CanonicalNodeId) ? requested as CanonicalNodeId : null
  })
  const invalidNodeId = computed(() => Boolean(options.requestedNodeId.value && !selectedNodeId.value))
  const graph = computed(() => buildGraphReadModel({
    repository: options.repository,
    localization: options.localization,
    locale: options.locale.value,
    selectedNodeId: selectedNodeId.value,
    visibleLayers: visibleLayers.value,
  }))
  const semantic = computed(() => selectedNodeId.value
    ? buildSemanticRelationshipModel(options.repository, options.localization, selectedNodeId.value, options.locale.value)
    : null)
  const detail = computed(() => semantic.value ? semanticModelToSelectedNodeDetail(semantic.value) : null)
  const graphSafetyText = computed(() => {
    const content = options.safety.getRequired('graphDisclaimer', options.locale.value)
    return localizedText(content.localized.fields, content.record.id)
  })
  const globalSafetyText = computed(() => {
    const content = options.safety.getRequired('globalEducationalDisclaimer', options.locale.value)
    return localizedText(content.localized.fields, content.record.id)
  })

  function routeFor(nodeId: CanonicalNodeId | null = selectedNodeId.value, targetLocale = options.locale.value): string {
    return `/${targetLocale}/map${nodeId ? `/${nodeId}` : ''}`
  }

  function selectNode(nodeId: CanonicalNodeId): Promise<unknown> {
    return Promise.resolve(options.navigate(routeFor(nodeId)))
  }

  function clearSelection(): Promise<unknown> {
    return Promise.resolve(options.navigate(routeFor(null)))
  }

  function setLayerVisible(layer: FilterableLayer, visible: boolean): void {
    const next = new Set(visibleLayers.value)
    if (visible) next.add(layer)
    else next.delete(layer)
    visibleLayers.value = next
  }

  return {
    selectedNodeId,
    invalidNodeId,
    visibleLayers,
    graph,
    detail,
    semantic,
    graphSafetyText,
    globalSafetyText,
    layout: options.layout,
    routeFor,
    selectNode,
    clearSelection,
    setLayerVisible,
  }
}
