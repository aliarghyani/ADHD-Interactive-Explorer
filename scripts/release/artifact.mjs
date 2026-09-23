import { createHash } from 'node:crypto'
import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { expectedRoutes } from './routes.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const output = path.join(root, '.output/public')
const errors = []
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex')
const read = relative => readFile(path.join(root, relative))

async function files(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true })
  const result = []
  for (const entry of entries) {
    const relative = path.posix.join(prefix, entry.name)
    if (entry.isDirectory()) result.push(...await files(path.join(directory, entry.name), relative))
    else result.push(relative)
  }
  return result
}

try {
  if (!(await stat(output)).isDirectory()) throw new Error('Missing static output directory')
  const routes = await expectedRoutes(root)
  const artifactFiles = await files(output)
  for (const route of routes) {
    const relative = `${route.slice(1)}/index.html`
    if (!artifactFiles.includes(relative)) errors.push(`Missing route ${route}: ${relative}`)
  }
  const htmlFiles = artifactFiles.filter(file => file.endsWith('.html'))
  const jsFiles = artifactFiles.filter(file => /^_nuxt\/(?:[A-Za-z0-9_-]{8}|.+\.[A-Za-z0-9_-]{8})\.js$/.test(file))
  const cssFiles = artifactFiles.filter(file => /^_nuxt\/.+\.[A-Za-z0-9_-]{8}\.css$/.test(file))
  if (!jsFiles.length || !cssFiles.length) errors.push('Missing fingerprinted JavaScript or CSS')
  if (!artifactFiles.includes('200.html') || !artifactFiles.includes('404.html')) errors.push('Missing static fallback document')
  for (const file of artifactFiles) {
    if (/\.(?:map|ts|vue|spec\.[cm]?js)$/.test(file) || /(^|\/)(?:node_modules|tests|knowledge|\.env)(\/|$)/.test(file)) errors.push(`Unexpected artifact file: ${file}`)
  }
  const manifest = JSON.parse(await read('knowledge/source/manifest.json'))
  const layout = JSON.parse(await read('knowledge/layouts/production-layout.v1.json'))
  if (layout.knowledgeReleaseId !== manifest.knowledgeReleaseId) errors.push('Layout/knowledge release mismatch')
  const fingerprints = Object.fromEntries(await Promise.all([
    'knowledge/source/manifest.json',
    'knowledge/source/localization/en.json',
    'knowledge/source/localization/fa.json',
    'knowledge/layouts/production-layout.v1.json',
    'package.json',
    'pnpm-lock.yaml',
  ].map(async file => [file, sha256(await read(file))])))
  const outputFingerprints = Object.fromEntries(await Promise.all(artifactFiles
    .filter(file => file !== 'release-manifest.json')
    .sort()
    .map(async file => [file, sha256(await readFile(path.join(output, file)))])))
  if (errors.length) throw new Error(errors.join('\n'))
  const release = {
    releaseId: `${manifest.knowledgeReleaseId}-${sha256(Buffer.from(JSON.stringify({ fingerprints, outputFingerprints }))).slice(0, 12)}`,
    knowledgeReleaseId: manifest.knowledgeReleaseId,
    schemaVersion: manifest.schemaVersion,
    contentModelVersion: manifest.contentModelVersion,
    layoutVersion: layout.layoutVersion,
    routes: routes.length,
    htmlPages: htmlFiles.length,
    hashedJavaScript: jsFiles.length,
    hashedCss: cssFiles.length,
    fingerprints,
  }
  await writeFile(path.join(output, 'release-manifest.json'), `${JSON.stringify(release, null, 2)}\n`)
  console.log(JSON.stringify(release, null, 2))
} catch (error) {
  console.error(`Artifact verification failed: ${error.message}`)
  process.exitCode = 1
}
