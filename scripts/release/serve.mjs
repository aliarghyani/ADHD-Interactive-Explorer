import { createServer } from 'node:http'
import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const artifact = path.resolve(process.env.RELEASE_ARTIFACT ?? path.join(root, '.output/public'))
const port = Number(process.env.PORT ?? 3000)
const cache = JSON.parse(await readFile(path.join(root, 'deployment/cache-policy.json'), 'utf8'))
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.ico': 'image/x-icon' }

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    if (pathname === '/') {
      response.writeHead(302, { Location: '/en', 'Cache-Control': cache.html })
      response.end()
      return
    }
    const relative = pathname.replace(/^\/+/, '')
    if (relative.split('/').includes('..') || relative.includes('\\')) throw new Error('Invalid path')
    let target = path.resolve(artifact, relative)
    if (!target.startsWith(`${artifact}${path.sep}`)) throw new Error('Invalid path')
    let fallback = false
    // Windows is case-insensitive; production static hosts commonly are not.
    // Enforce canonical casing so /beh1 cannot serve the /BEH1 artifact.
    let exact = true
    let parent = artifact
    for (const segment of relative.split('/').filter(Boolean)) {
      let children
      try { children = await readdir(parent) } catch { children = [] }
      if (!children.includes(segment)) {
        exact = false
        break
      }
      parent = path.join(parent, segment)
    }
    if (!exact) {
      target = path.join(artifact, '200.html')
      fallback = true
    }
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html')
    } catch {
      if (!fallback && path.extname(target) === '') {
        try {
          await stat(`${target}.html`)
          target = `${target}.html`
        } catch {
          target = path.join(artifact, '200.html')
          fallback = true
        }
      }
    }
    const body = await readFile(target)
    const extension = path.extname(target)
    const hashed = /^_nuxt\/(?:[A-Za-z0-9_-]{8}|[^/]+\.[A-Za-z0-9_-]{8})\.(?:js|css)$/.test(relative)
    const headers = {
      'Content-Type': mime[extension] ?? 'application/octet-stream',
      'Cache-Control': extension === '.html' || fallback ? cache.html : hashed ? cache.hashedAssets : cache.mutableAssets,
    }
    response.writeHead(fallback ? 404 : 200, headers)
    if (request.method === 'HEAD') response.end()
    else response.end(body)
  } catch {
    response.writeHead(404, { 'Cache-Control': cache.html })
    response.end('Not found')
  }
}).listen(port, '127.0.0.1', () => console.log(`Static artifact ${artifact} on http://127.0.0.1:${port}`))
