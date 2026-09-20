import type {
  CanonicalNodeId,
  ContentId,
  KnowledgeRepository,
  Locale,
  LocalizedContent,
  LocalizedNode,
} from '../domain'

/** Thin production boundary over validated canonical localization records. */
export class DomainLocalization {
  constructor(private readonly repository: KnowledgeRepository) {}

  getContent(contentId: ContentId, locale: Locale): LocalizedContent {
    return this.repository.getLocalizedContent(contentId, locale)
  }

  getNode(nodeId: CanonicalNodeId, locale: Locale): LocalizedNode {
    return this.repository.getLocalizedNode(nodeId, locale)
  }
}
