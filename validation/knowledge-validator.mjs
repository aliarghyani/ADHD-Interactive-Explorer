import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

const sourceFiles = {
  manifest: 'manifest.json', nodes: 'graph/nodes.json', edges: 'graph/edges.json', behaviours: 'behaviours/behaviours.json',
  pathways: 'behaviours/pathways.json', alternatives: 'behaviours/alternatives.json', contexts: 'context/contexts.json',
  mappings: 'context/mappings.json', feedbackLoops: 'context/feedback-loops.json', patterns: 'patterns/patterns.json', rules: 'patterns/rules.json',
  domains: 'functional-domains/domains.json', functionalExamples: 'functional-domains/examples.json', presentations: 'presentations/presentations.json',
  evidence: 'evidence/evidence.json', sources: 'evidence/sources.json', safety: 'safety/safety.json', en: 'localization/en.json', fa: 'localization/fa.json',
}

export async function loadKnowledgeBundle(root = process.cwd()) {
  const base = join(root, 'knowledge', 'source')
  return Object.fromEntries(await Promise.all(Object.entries(sourceFiles).map(async ([key, file]) => [key, JSON.parse(await readFile(join(base, file), 'utf8'))])))
}

const addError = (errors, phase, code, message) => errors.push({ phase, code, message })
const duplicates = (items) => [...new Set(items.filter((item, index) => items.indexOf(item) !== index))]
const exists = (set, values) => values.every((value) => set.has(value))

async function schemaErrors(bundle, root) {
  const errors = []
  const ajv = new Ajv2020({ allErrors: true, strict: false })
  addFormats(ajv)
  const schemaRoot = join(root, 'knowledge', 'schemas')
  const manifestSchema = JSON.parse(await readFile(join(schemaRoot, 'manifest.schema.json'), 'utf8'))
  const entitySchema = JSON.parse(await readFile(join(schemaRoot, 'entities.schema.json'), 'utf8'))
  const localizationSchema = JSON.parse(await readFile(join(schemaRoot, 'localization.schema.json'), 'utf8'))
  ajv.addSchema(entitySchema)
  const validateManifest = ajv.compile(manifestSchema)
  if (!validateManifest(bundle.manifest)) addError(errors, 'schema', 'SCHEMA_MANIFEST', ajv.errorsText(validateManifest.errors))
  for (const locale of ['en', 'fa']) {
    const validate = ajv.compile(localizationSchema)
    if (!validate(bundle[locale])) addError(errors, 'schema', 'SCHEMA_LOCALIZATION', `${locale}: ${ajv.errorsText(validate.errors)}`)
  }
  const mappings = [
    ['nodes', bundle.nodes.nodes, 'ConceptNode'], ['edges', bundle.edges.edges, 'RelationshipEdge'], ['behaviours', bundle.behaviours.behaviours, 'BehaviourEntry'],
    ['pathways', bundle.pathways.pathways, 'EducationalPathway'], ['mappings', bundle.mappings.mappings, 'ContextMapping'], ['rules', bundle.rules.rules, 'PatternRule'],
    ['functionalExamples', bundle.functionalExamples.functionalExamples, 'FunctionalExample'], ['alternatives', bundle.alternatives.alternatives, 'AlternativeExplanation'],
    ['feedbackLoops', bundle.feedbackLoops.feedbackLoops, 'FeedbackLoop'], ['presentations', bundle.presentations.presentations, 'PresentationEducation'],
    ['evidence', bundle.evidence.evidence, 'EvidenceMetadata'], ['sources', bundle.sources.sources, 'SourceReference'], ['safety', bundle.safety.safety, 'SafetyCopy'],
  ]
  for (const [name, items, definition] of mappings) {
    const validate = ajv.getSchema(`https://adhd-explorer.local/schemas/entities.schema.json#/$defs/${definition}`)
    for (const item of items) if (!validate(item)) addError(errors, 'schema', 'SCHEMA_ENTITY', `${name}/${item.id}: ${ajv.errorsText(validate.errors)}`)
  }
  return errors
}

function domainErrors(bundle) {
  const errors = []
  const nodes = bundle.nodes.nodes
  const edges = bundle.edges.edges
  const nodeIds = new Set(nodes.map((node) => node.id))
  const edgeIds = new Set(edges.map((edge) => edge.id))
  if (nodes.length !== 30) addError(errors, 'domain', 'NODE_COUNT', `Expected 30 nodes; found ${nodes.length}`)
  if (duplicates(nodes.map((node) => node.id)).length) addError(errors, 'domain', 'DUPLICATE_NODE_ID', 'Canonical node IDs must be unique')
  if (edges.length !== 49) addError(errors, 'domain', 'EDGE_COUNT', `Expected 49 edges; found ${edges.length}`)
  if (duplicates(edges.map((edge) => edge.id)).length) addError(errors, 'domain', 'DUPLICATE_EDGE_ID', 'Canonical edge IDs must be unique')
  const families = { CA: 2, CTX: 8, REG: 7, BEH: 7, PAT: 2, FUN: 4 }
  for (const [prefix, count] of Object.entries(families)) if (nodes.filter((node) => new RegExp(`^${prefix}\\d+$`).test(node.id)).length !== count) addError(errors, 'domain', 'CANONICAL_ID_FAMILY', `${prefix} family mismatch`)
  for (const edge of edges) {
    if (!nodeIds.has(edge.sourceId)) addError(errors, 'domain', 'UNKNOWN_EDGE_SOURCE', edge.id)
    if (!nodeIds.has(edge.targetId)) addError(errors, 'domain', 'UNKNOWN_EDGE_TARGET', edge.id)
    if (!['MODULATES', 'CONTRIBUTES_TO', 'FEEDBACK_WITH'].includes(edge.relationshipType)) addError(errors, 'domain', 'UNSUPPORTED_RELATIONSHIP', edge.id)
    if (edge.sourceId.startsWith('CA') && ['MODULATES', 'CONTRIBUTES_TO'].includes(edge.relationshipType)) addError(errors, 'domain', 'CLINICAL_ANCHOR_MECHANISTIC_EDGE', edge.id)
  }
  const expected = bundle.manifest.releaseExpectations
  const registries = { nodes, edges, pathways: bundle.pathways.pathways, mappings: bundle.mappings.mappings, functionalExamples: bundle.functionalExamples.functionalExamples, alternatives: bundle.alternatives.alternatives, feedbackLoops: bundle.feedbackLoops.feedbackLoops, presentations: bundle.presentations.presentations, sources: bundle.sources.sources, evidence: bundle.evidence.evidence }
  for (const [name, count] of Object.entries(expected)) if (registries[name]?.length !== count) addError(errors, 'domain', 'RELEASE_REGISTRY_COUNT', `${name}: expected ${count}, found ${registries[name]?.length}`)
  for (const path of bundle.pathways.pathways) {
    if (!exists(nodeIds, [path.behaviourId, ...path.orderedNodeIds])) addError(errors, 'domain', 'PATHWAY_NODE_REFERENCE', path.id)
    if (!exists(edgeIds, path.edgeIds)) addError(errors, 'domain', 'PATHWAY_EDGE_REFERENCE', path.id)
  }
  for (const mapping of bundle.mappings.mappings) if (!exists(nodeIds, [mapping.contextId, mapping.behaviourId, mapping.regulationId])) addError(errors, 'domain', 'MAPPING_NODE_REFERENCE', mapping.id)
  for (const example of bundle.functionalExamples.functionalExamples) if (!exists(nodeIds, [example.behaviourId, example.domainId]) || (example.edgeId && !edgeIds.has(example.edgeId))) addError(errors, 'domain', 'FUNCTIONAL_REFERENCE', example.id)
  for (const loop of bundle.feedbackLoops.feedbackLoops) if (!exists(nodeIds, loop.nodeIds) || !exists(edgeIds, loop.edgeIds)) addError(errors, 'domain', 'LOOP_REFERENCE', loop.id)
  for (const presentation of bundle.presentations.presentations) {
    if (!presentation.clinicalAnchorIds.length || presentation.clinicalAnchorIds.some((id) => !/^CA[12]$/.test(id))) addError(errors, 'domain', 'PRESENTATION_CONCEPT_REFERENCE', presentation.id)
    const forbidden = ['behaviourIds', 'selectedBehaviourIds', 'sessionState', 'regulationIds', 'pathwayIds', 'patternIds']
    if (forbidden.some((field) => Object.hasOwn(presentation, field))) addError(errors, 'domain', 'PRESENTATION_BEHAVIOUR_STATE', presentation.id)
  }
  return errors
}

function evidenceErrors(bundle) {
  const errors = []
  const evidenceIds = new Set(bundle.evidence.evidence.map((item) => item.id))
  const sourceIds = new Set(bundle.sources.sources.map((item) => item.id))
  const validLevels = new Set(['Clinical', 'Strong', 'Moderate', 'Limited'])
  for (const item of bundle.evidence.evidence) {
    if (!validLevels.has(item.level)) addError(errors, 'evidence', 'INVALID_EVIDENCE_LEVEL', item.id)
    if (!exists(sourceIds, item.sourceIds)) addError(errors, 'evidence', 'UNRESOLVED_SOURCE_REFERENCE', item.id)
    if (!item.lastReviewed || !item.reviewVersion || !item.limitations?.every(Boolean)) addError(errors, 'evidence', 'INCOMPLETE_EVIDENCE_METADATA', item.id)
  }
  const evidenceLinked = [...bundle.nodes.nodes, ...bundle.edges.edges, ...bundle.pathways.pathways, ...bundle.mappings.mappings, ...bundle.rules.rules, ...bundle.alternatives.alternatives, ...bundle.feedbackLoops.feedbackLoops]
  for (const item of evidenceLinked) if (!exists(evidenceIds, item.evidenceIds ?? [])) addError(errors, 'evidence', 'UNRESOLVED_EVIDENCE_REFERENCE', item.id)
  for (const edge of bundle.edges.edges) if (!edge.evidenceIds.length) addError(errors, 'evidence', 'MISSING_EDGE_EVIDENCE', edge.id)
  for (const presentation of bundle.presentations.presentations) if (!exists(sourceIds, presentation.sourceIds)) addError(errors, 'evidence', 'UNRESOLVED_PRESENTATION_SOURCE', presentation.id)
  return errors
}

function localizationErrors(bundle) {
  const errors = []
  const required = new Map()
  const add = (items, fields) => items.forEach((item) => required.set(item.id, fields))
  add(bundle.nodes.nodes, ['label']); add(bundle.behaviours.behaviours, ['text']); add(bundle.pathways.pathways, ['explanation', 'scientificCaution'])
  add(bundle.mappings.mappings, ['explanation']); add(bundle.rules.rules, ['conceptualThreshold', 'singleEventCaution', 'examples'])
  add(bundle.functionalExamples.functionalExamples, ['example']); add(bundle.alternatives.alternatives, ['label', 'explanation', 'safeWording'])
  add(bundle.feedbackLoops.feedbackLoops, ['title', 'orderedSteps', 'explanation', 'caution']); add(bundle.presentations.presentations, ['label', 'description']); add(bundle.safety.safety, ['text'])
  for (const locale of ['en', 'fa']) {
    const records = new Map(bundle[locale].records.map((record) => [record.targetId, record.fields]))
    for (const [id, fields] of required) {
      const localized = records.get(id)
      if (!localized) { addError(errors, 'localization', `MISSING_${locale.toUpperCase()}_LOCALIZATION`, id); continue }
      if (fields.some((field) => !localized[field] || (Array.isArray(localized[field]) && !localized[field].length))) addError(errors, 'localization', `INCOMPLETE_${locale.toUpperCase()}_LOCALIZATION`, id)
    }
  }
  return errors
}

function safetyErrors(bundle) {
  const errors = []
  const required = ['SAFETY_GLOBAL_EDUCATIONAL_DISCLAIMER', 'SAFETY_GRAPH_DISCLAIMER', 'SAFETY_BEHAVIOUR_EXPLORER', 'SAFETY_ALTERNATIVE_EXPLANATION', 'SAFETY_RECURRING_PATTERN', 'SAFETY_FUNCTIONAL_IMPACT', 'SAFETY_PRESENTATION_CAUTION', 'SAFETY_GROUP_LEVEL_EVIDENCE']
  const ids = new Set(bundle.safety.safety.map((item) => item.id))
  for (const id of required) if (!ids.has(id)) addError(errors, 'safety', 'MISSING_MANDATORY_SAFETY', id)
  return errors
}

function versionErrors(bundle) {
  const errors = []
  if (bundle.manifest.schemaVersion !== '1.0.0') addError(errors, 'versions', 'INCOMPATIBLE_SCHEMA_VERSION', bundle.manifest.schemaVersion)
  if (bundle.manifest.contentModelVersion !== '1.0.0') addError(errors, 'versions', 'INCOMPATIBLE_CONTENT_MODEL_VERSION', bundle.manifest.contentModelVersion)
  return errors
}

function prohibitedErrors(bundle) {
  const errors = []
  const prohibited = new Set([
    'score', 'probability', 'symptomScore', 'symptomWeight', 'adhdLikelihood', 'riskOfADHD', 'diagnosticConfidence',
    'diagnosisResult', 'severityScore', 'severityValue', 'screeningThreshold', 'thresholdContribution', 'diagnosticWeight',
    'presentationPrediction', 'mechanismProbability', 'predictedPerformance', 'userClinicalState', 'symptomProfile',
    'adhdProfile', 'contextProfile', 'behaviourHistory', 'symptomHistory', 'inferredPresentation', 'medicalState',
    'diagnosticState', 'matchedBehaviourIds', 'userCriteria', 'diagnosticScore', 'screeningResult', 'userDiagnosis',
    'treatmentRecommendation', 'personalizedMedicalAdvice',
  ])
  const walk = (value, path = '$') => {
    if (Array.isArray(value)) return value.forEach((item, index) => walk(item, `${path}[${index}]`))
    if (!value || typeof value !== 'object') return
    for (const [key, child] of Object.entries(value)) {
      if (prohibited.has(key)) addError(errors, 'domain', 'PROHIBITED_FIELD', `${path}.${key}`)
      walk(child, `${path}.${key}`)
    }
  }
  walk(bundle)
  return errors
}

export async function validateKnowledgeBundle(bundle, { root = process.cwd(), phases } = {}) {
  const selected = new Set(phases ?? ['schema', 'domain', 'evidence', 'localization', 'safety', 'versions'])
  const errors = []
  if (selected.has('schema')) errors.push(...await schemaErrors(bundle, root))
  if (selected.has('domain')) errors.push(...domainErrors(bundle), ...prohibitedErrors(bundle))
  if (selected.has('evidence')) errors.push(...evidenceErrors(bundle))
  if (selected.has('localization')) errors.push(...localizationErrors(bundle))
  if (selected.has('safety')) errors.push(...safetyErrors(bundle))
  if (selected.has('versions')) errors.push(...versionErrors(bundle))
  return errors
}
