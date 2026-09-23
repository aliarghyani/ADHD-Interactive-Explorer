import { readFile } from 'node:fs/promises'
import path from 'node:path'

async function json(root, relative) {
  return JSON.parse(await readFile(path.join(root, 'knowledge/source', relative), 'utf8'))
}

export async function expectedRoutes(root) {
  const [nodes, behaviours, contexts, presentations, evidence] = await Promise.all([
    json(root, 'graph/nodes.json'),
    json(root, 'behaviours/behaviours.json'),
    json(root, 'context/contexts.json'),
    json(root, 'presentations/presentations.json'),
    json(root, 'evidence/evidence.json'),
  ])
  const routes = new Set()
  for (const locale of ['en', 'fa']) {
    routes.add(`/${locale}`)
    for (const section of ['map', 'behaviours', 'context', 'presentations', 'evidence']) routes.add(`/${locale}/${section}`)
    for (const section of ['methodology', 'about']) routes.add(`/${locale}/${section}`)
    for (const node of nodes.nodes) routes.add(`/${locale}/map/${node.id}`)
    for (const behaviour of behaviours.behaviours) routes.add(`/${locale}/behaviours/${behaviour.behaviourId}`)
    for (const id of contexts.contextIds) routes.add(`/${locale}/context/${id}`)
    for (const item of presentations.presentations.filter(item => item.status === 'current-formal')) routes.add(`/${locale}/presentations/${item.id}`)
    for (const item of evidence.evidence) routes.add(`/${locale}/evidence/${item.id}`)
  }
  return [...routes].sort()
}
