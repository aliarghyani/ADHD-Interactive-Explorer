import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const root = process.cwd()
const packPath = join(root, 'artifacts', 'ADHD_Interactive_Explorer_Production_Knowledge_Pack_v1.0.md')
const outputRoot = join(root, 'knowledge', 'source')
const text = await readFile(packPath, 'utf8')

const section = (start, end) => {
  const from = text.indexOf(start)
  const to = end ? text.indexOf(end, from + start.length) : text.length
  if (from < 0 || to < 0) throw new Error(`Missing pack section: ${start}`)
  return text.slice(from, to)
}
const clean = (value = '') => value.trim().replace(/^`|`$/g, '')
const ids = (value = '', prefix = '') => [...value.matchAll(/\b([A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*)\b/g)].map((m) => m[1]).filter((id) => !prefix || id.startsWith(prefix))
const table = (block) => {
  const lines = block.split(/\r?\n/).filter((line) => line.startsWith('|'))
  if (lines.length < 3) throw new Error('Expected markdown table')
  const cells = (line) => line.slice(1, -1).split('|').map((cell) => cell.trim())
  const headers = cells(lines[0])
  return lines.slice(2).map(cells).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])))
}
const records = (block, prefix) => {
  const matches = [...block.matchAll(new RegExp('^### `(' + prefix + '[A-Z0-9_]+)`([^\\n]*)$', 'gm'))]
  return matches.map((match, index) => ({
    id: match[1],
    heading: match[2].replace(/^\s*[—-]\s*/, '').trim(),
    body: block.slice(match.index + match[0].length, matches[index + 1]?.index ?? block.length),
  }))
}
const bullet = (body, label) => body.match(new RegExp(`^- \\*\\*${label.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}:\\*\\*\\s*(.*)$`, 'm'))?.[1]?.trim() ?? ''
const paragraph = (body, label) => body.match(new RegExp(`\\*\\*${label.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\*\\*\\s*\\r?\\n+([^\\r\\n]+)`))?.[1]?.trim() ?? ''
const bilingualHeading = (heading) => {
  const parts = heading.split(' / ')
  const split = parts.findIndex((part) => /[\u0600-\u06ff]/u.test(part))
  return split < 0 ? { en: heading, fa: '' } : { en: parts.slice(0, split).join(' / '), fa: parts.slice(split).join(' / ') }
}
const writeJson = async (relativePath, value) => {
  const target = join(outputRoot, relativePath)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

const manifestRows = table(section('## 1. Release Manifest', '## 2. Gap Resolution Register'))
const manifestValues = Object.fromEntries(manifestRows.map((row) => [clean(row.Field).replace('Supported languages', 'languages').replace('Publication status', 'publicationStatus'), clean(row.Value)]))
const expectedCounts = {
  nodes: 30, edges: 49, pathways: 22, mappings: 24, functionalExamples: 28,
  alternatives: 13, feedbackLoops: 2, presentations: 4, sources: 17, evidence: 23,
}
const manifest = { ...manifestValues, languages: ['en', 'fa'], releaseExpectations: expectedCounts }

const nodeRows = table(section('## 3. Canonical Node Registry', '## 4. Stable Edge Registry'))
const nodes = nodeRows.map((row) => ({
  id: clean(row.ID), category: row.Category.toLowerCase().replaceAll(' ', '-'), canonicalName: row['Canonical name'],
  definition: row.Definition, evidenceStatus: row['Frozen evidence/status'], evidenceIds: ids(row.EvidenceMetadata, 'EVID_'),
}))
const edgeRows = table(section('## 4. Stable Edge Registry', '## 5. Behaviour Entry Library'))
const edgeEvidenceRows = table(section('## 15. Edge-to-Evidence Mapping', '## 16. Safety Registry'))
const edgeEvidence = new Map(edgeEvidenceRows.map((row) => [clean(row['Edge ID']), row]))
const edges = edgeRows.map((row) => {
  const evidence = edgeEvidence.get(clean(row['Stable edge ID']))
  return {
    id: clean(row['Stable edge ID']), sourceId: clean(row.Source), targetId: clean(row.Target),
    relationshipType: clean(row['Relationship type']), meaning: row['Frozen meaning'],
    evidenceIds: ids(evidence?.['EvidenceMetadata IDs'], 'EVID_'),
    supportClassification: clean(evidence?.Support), limitation: evidence?.['Caution / qualification'] ?? '',
  }
})

const behaviourRows = table(section('## 5. Behaviour Entry Library', '## 6. Educational Pathways'))
const behaviours = behaviourRows.map((row) => ({ id: clean(row['Statement ID']), behaviourId: clean(row.Behaviour), publicationStatus: clean(row['Publication status']), contentId: clean(row['Statement ID']) }))
const pathwayRecords = records(section('## 6. Educational Pathways', '## 7. Context Mappings'), 'PATH_')
const pathways = pathwayRecords.map(({ id, body }) => ({
  id, behaviourId: clean(bullet(body, 'Behaviour')), orderedNodeIds: ids(bullet(body, 'Ordered nodes')),
  edgeIds: ids(bullet(body, 'Canonical edges'), 'EDGE_'), evidenceIds: ids(bullet(body, 'EvidenceMetadata'), 'EVID_'),
  mvpStatus: bullet(body, 'MVP status'), contentId: id,
}))
const mappingRows = table(section('## 7. Context Mappings', '## 8. Pattern Rules'))
const mappings = mappingRows.map((row) => ({
  id: clean(row.ID), contextId: clean(row.Context), behaviourId: clean(row.Behaviour), regulationId: clean(row.Regulation),
  qualitativeRole: row['Qualitative role'], evidenceIds: ids(row.EvidenceMetadata, 'EVID_'), contentId: clean(row.ID),
}))
const ruleRecords = records(section('## 8. Pattern Rules', '## 9. Functional Examples'), 'RULE_')
const rules = ruleRecords.map(({ id, heading, body }) => ({
  id, patternId: heading.match(/PAT\d+/)?.[0] ?? '', sourceBehaviourIds: ids(bullet(body, 'Source Behaviour IDs'), 'BEH'),
  repetitionRequirement: bullet(body, 'Repetition requirement'), evidenceIds: ids(bullet(body, 'EvidenceMetadata'), 'EVID_'), contentId: id,
}))
const functionalRows = table(section('## 9. Functional Examples', '## 10. Alternative Explanations'))
const functionalExamples = functionalRows.map((row) => ({
  id: clean(row.ID), behaviourId: clean(row.Behaviour), domainId: clean(row.Domain),
  edgeId: ids(row['Canonical edge'], 'EDGE_')[0] ?? null, relationshipStatus: row['Relationship status'], contentId: clean(row.ID),
}))
const alternativeRecords = records(section('## 10. Alternative Explanations', '## 11. Feedback Loops'), 'ALT_')
const alternatives = alternativeRecords.map(({ id, body }) => ({
  id, relevantBehaviourIds: ids(bullet(body, 'Relevant Behaviour IDs'), 'BEH'), evidenceIds: ids(bullet(body, 'EvidenceMetadata'), 'EVID_'),
  caution: bullet(body, 'Caution'), contentId: id,
}))
const loopRecords = records(section('## 11. Feedback Loops', '## 12. Presentation Education'), 'LOOP_')
const feedbackLoops = loopRecords.map(({ id, body }) => ({
  id, nodeIds: ids(bullet(body, 'Canonical node references')), edgeIds: ids(bullet(body, 'Canonical relationship references'), 'EDGE_'),
  evidenceIds: ids(bullet(body, 'Evidence / epistemic status'), 'EVID_'), interruptionPoints: bullet(body, 'Optional educational interruption points'), contentId: id,
}))
const presentationRows = table(section('## 12. Presentation Education', '## 13. SourceReference Registry'))
const presentations = presentationRows.map((row) => ({
  id: clean(row.ID), clinicalAnchorIds: ids(row['Clinical Anchors'], 'CA'), status: clean(row.Status),
  sourceIds: ids(row['SourceReference IDs'], 'SRC_'), safetyId: clean(row['Safety copy']), contentId: clean(row.ID),
}))
const sourceRecords = records(section('## 13. SourceReference Registry', '## 14. EvidenceMetadata Registry'), 'SRC_')
const sources = sourceRecords.map(({ id, body }) => ({
  id, sourceType: clean(bullet(body, 'sourceType')), title: bullet(body, 'title'), authorsOrOrganization: bullet(body, 'authors/organization'),
  year: Number(bullet(body, 'year')), publicationType: bullet(body, 'publicationType'), journalOrSeries: bullet(body, 'journal/series'),
  citationText: bullet(body, 'citationText'), relevanceNote: bullet(body, 'relevanceNote'), url: clean(bullet(body, 'URL')), doi: clean(bullet(body, 'DOI')) || undefined,
}))
const evidenceRows = table(section('## 14. EvidenceMetadata Registry', '## 15. Edge-to-Evidence Mapping'))
const evidence = evidenceRows.map((row) => ({
  id: clean(row['Evidence ID']), level: clean(row.Level), epistemicStatus: row['Epistemic status'], constructStatus: row['Construct status'],
  languageStrategy: row['Language strategy'], summary: row.Summary, limitations: [row.Limitations], sourceIds: ids(row['SourceReference IDs'], 'SRC_'),
  lastReviewed: clean(row['Last reviewed']), reviewVersion: clean(row['Review version']),
}))
const safetyRows = table(section('## 16. Safety Registry', '## 17. Localization Completeness Matrix'))
const safety = safetyRows.map((row) => ({ id: clean(row['Stable safety ID']), context: row.Context, displayRequirement: row['Display requirement'], contentId: clean(row['Stable safety ID']) }))

const en = []
const fa = []
const localized = (targetId, enFields, faFields) => { en.push({ targetId, fields: enFields }); fa.push({ targetId, fields: faFields }) }
nodeRows.forEach((row) => localized(clean(row.ID), { label: row['Canonical name'] }, { label: row['Persian label'] }))
behaviourRows.forEach((row) => localized(clean(row['Statement ID']), { text: row['English — derived equivalent'] }, { text: row['Persian — approved'] }))
pathwayRecords.forEach(({ id, body }) => localized(id, { explanation: bullet(body, 'EN'), scientificCaution: bullet(body, 'Scientific caution EN') }, { explanation: bullet(body, 'FA'), scientificCaution: bullet(body, 'Scientific caution FA') }))
mappingRows.forEach((row) => localized(clean(row.ID), { explanation: row['English explanation'] }, { explanation: row['Persian explanation'] }))
ruleRecords.forEach(({ id, body }) => localized(id,
  { conceptualThreshold: bullet(body, 'Conceptual threshold — EN'), singleEventCaution: bullet(body, 'Single-event caution — EN'), examples: bullet(body, 'Examples — EN') },
  { conceptualThreshold: bullet(body, 'Conceptual threshold — FA'), singleEventCaution: bullet(body, 'Single-event caution — FA'), examples: bullet(body, 'Examples — FA') }))
functionalRows.forEach((row) => localized(clean(row.ID), { example: row['English example'] }, { example: row['Persian example'] }))
alternativeRecords.forEach(({ id, heading, body }) => { const title = bilingualHeading(heading); localized(id, { label: title.en, explanation: bullet(body, 'Explanation EN'), safeWording: bullet(body, 'Safe wording EN') }, { label: title.fa, explanation: bullet(body, 'Explanation FA'), safeWording: bullet(body, 'Safe wording FA') }) })
loopRecords.forEach(({ id, heading, body }) => { const title = bilingualHeading(heading); localized(id,
  { title: title.en, orderedSteps: paragraph(body, 'Ordered conceptual steps — EN'), explanation: bullet(body, 'Explanation EN'), caution: bullet(body, 'Caution EN') },
  { title: title.fa, orderedSteps: paragraph(body, 'Ordered conceptual steps — FA'), explanation: bullet(body, 'Explanation FA'), caution: bullet(body, 'Caution FA') }) })
presentationRows.forEach((row) => localized(clean(row.ID), { label: row['Canonical English label'], description: row['Description EN'] }, { label: row['Persian label'], description: row['Description FA'] }))
safetyRows.forEach((row) => localized(clean(row['Stable safety ID']), { text: row.English }, { text: row.Persian }))

const outputs = {
  'manifest.json': manifest, 'graph/nodes.json': { nodes }, 'graph/edges.json': { edges },
  'behaviours/behaviours.json': { behaviours }, 'behaviours/pathways.json': { pathways }, 'behaviours/alternatives.json': { alternatives },
  'context/contexts.json': { contextIds: nodes.filter((n) => n.id.startsWith('CTX')).map((n) => n.id) }, 'context/mappings.json': { mappings }, 'context/feedback-loops.json': { feedbackLoops },
  'patterns/patterns.json': { patternIds: nodes.filter((n) => n.id.startsWith('PAT')).map((n) => n.id) }, 'patterns/rules.json': { rules },
  'functional-domains/domains.json': { domainIds: nodes.filter((n) => n.id.startsWith('FUN')).map((n) => n.id) }, 'functional-domains/examples.json': { functionalExamples },
  'presentations/presentations.json': { presentations }, 'evidence/evidence.json': { evidence }, 'evidence/sources.json': { sources },
  'safety/safety.json': { safety }, 'localization/en.json': { locale: 'en', records: en }, 'localization/fa.json': { locale: 'fa', records: fa },
}
for (const [name, value] of Object.entries(outputs)) await writeJson(name, value)
console.log(`Ingested ${nodes.length} nodes, ${edges.length} edges, and ${Object.keys(outputs).length} production files.`)
