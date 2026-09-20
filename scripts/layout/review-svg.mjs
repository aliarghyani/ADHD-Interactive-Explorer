const categoryColors = Object.freeze({
  'clinical-anchor': '#f5d0a9',
  context: '#cfe8ff',
  regulation: '#d9f2e6',
  behaviour: '#fff0b8',
  pattern: '#eadcff',
  'functional-domain': '#ffd9df',
})

export function generateReviewSvg(artifact, source) {
  const nodes = new Map(source.nodes.map((node) => [node.id, node]))
  const edges = new Map(source.edges.map((edge) => [edge.id, edge]))
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<svg xmlns="http://www.w3.org/2000/svg" width="${artifact.graphBounds.width}" height="${artifact.graphBounds.height}" viewBox="0 0 ${artifact.graphBounds.width} ${artifact.graphBounds.height}" role="img" aria-labelledby="title desc">`,
    '<title id="title">LAYOUT REVIEW TOOL - NOT PRODUCTION UI</title>',
    '<desc id="desc">Static authoring review of the full canonical graph geometry.</desc>',
    '<rect width="100%" height="100%" fill="#fafafa"/>',
    '<g fill="none" stroke-width="3">',
  ]
  for (const geometry of artifact.edgeGeometry) {
    const edge = edges.get(geometry.id)
    const points = [geometry.start, ...geometry.bendPoints, geometry.end].map(({ x, y }) => `${x},${y}`).join(' ')
    const feedback = edge?.relationshipType === 'FEEDBACK_WITH'
    lines.push(`<polyline points="${points}" stroke="${feedback ? '#c2415d' : '#64748b'}"${feedback ? ' stroke-dasharray="12 8"' : ''}><title>${escapeXml(geometry.id)}</title></polyline>`)
  }
  lines.push('</g>', '<g font-family="system-ui, sans-serif" text-anchor="middle">')
  for (const geometry of artifact.nodeGeometry) {
    const node = nodes.get(geometry.id)
    const centerX = geometry.x + geometry.width / 2
    const centerY = geometry.y + geometry.height / 2
    lines.push(`<rect x="${geometry.x}" y="${geometry.y}" width="${geometry.width}" height="${geometry.height}" rx="14" fill="${categoryColors[node?.category] ?? '#fff'}" stroke="#334155" stroke-width="2"/>`)
    lines.push(`<text x="${centerX}" y="${centerY - 6}" font-size="19" font-weight="700">${escapeXml(geometry.id)}</text>`)
    lines.push(`<text x="${centerX}" y="${centerY + 22}" font-size="16">${escapeXml(node?.canonicalName ?? '')}</text>`)
  }
  lines.push('</g>', '<text x="24" y="32" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="#9f1239">LAYOUT REVIEW TOOL - NOT PRODUCTION UI</text>', '</svg>', '')
  return lines.join('\n')
}

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

