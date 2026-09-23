import { KnowledgeRepository, type KnowledgeBundle, type Locale } from '../../domain'
import en from '../../knowledge/source/localization/en.json'
import fa from '../../knowledge/source/localization/fa.json'
import manifest from '../../knowledge/source/manifest.json'
import safety from '../../knowledge/source/safety/safety.json'
import { SafetyAccess } from '../../safety'

const supportingKnowledge = {
  manifest,
  nodes: { nodes: [] }, edges: { edges: [] }, behaviours: { behaviours: [] },
  pathways: { pathways: [] }, alternatives: { alternatives: [] }, contexts: { contextIds: [] },
  mappings: { mappings: [] }, feedbackLoops: { feedbackLoops: [] }, patterns: { patternIds: [] },
  rules: { rules: [] }, domains: { domainIds: [] }, functionalExamples: { functionalExamples: [] },
  presentations: { presentations: [] }, evidence: { evidence: [] }, sources: { sources: [] },
  safety, en, fa,
} as unknown as KnowledgeBundle

const repository = new KnowledgeRepository(supportingKnowledge)
const safetyAccess = new SafetyAccess(repository)

function safetyText(purpose: 'globalEducationalDisclaimer' | 'groupLevelEvidenceCaution', locale: Locale): string {
  const text = safetyAccess.getRequired(purpose, locale).localized.fields.text
  if (typeof text !== 'string' || text.trim().length === 0) throw new Error(`Missing required safety text: ${purpose}/${locale}`)
  return text
}

/** Minimal prerender-only projection: manifest plus centralized mandatory safety records. */
export function getSupportingKnowledge(locale: Locale) {
  return Object.freeze({
    globalDisclaimer: safetyText('globalEducationalDisclaimer', locale),
    groupLevelCaution: safetyText('groupLevelEvidenceCaution', locale),
    knowledgeReleaseId: repository.manifest.knowledgeReleaseId,
    evidenceReviewVersion: repository.manifest.evidenceReviewVersion,
  })
}
