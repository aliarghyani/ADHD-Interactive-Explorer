const port = process.argv[2] ?? '9223'
const pages = await (await fetch(`http://localhost:${port}/json`)).json()
const page = pages.find((candidate) => candidate.type === 'page' && candidate.url.startsWith('http://localhost'))
if (!page) throw new Error('No local spike page is connected to Chrome DevTools')

const socket = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((resolve) => socket.addEventListener('open', resolve, { once: true }))
socket.send(JSON.stringify({
  id: 1,
  method: 'Runtime.evaluate',
  params: {
    expression: `JSON.stringify({
      innerWidth,
      devicePixelRatio,
      documentDirection: document.documentElement.dir,
      hydrationGraphCount: document.querySelectorAll('[data-testid="visual-graph"]').length,
      viewportWidth: document.querySelector('.graph-viewport')?.clientWidth,
      viewportHeight: document.querySelector('.graph-viewport')?.clientHeight,
      stageStyle: document.querySelector('.graph-stage')?.getAttribute('style'),
      stageRect: document.querySelector('.graph-stage')?.getBoundingClientRect().toJSON(),
      shellRect: document.querySelector('.visual-graph-shell')?.getBoundingClientRect().toJSON(),
      selectedNode: document.querySelector('[aria-pressed="true"]')?.getAttribute('data-node-id'),
      semanticSelection: document.querySelector('[data-testid="selected-summary"]')?.textContent,
      bodyScrollWidth: document.body.scrollWidth,
      consoleMarker: document.querySelector('#__nuxt') ? 'hydrated-dom-present' : 'missing-root'
    })`,
    returnByValue: true,
  },
}))

const result = await new Promise((resolve) => socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (message.id === 1) resolve(message.result.result.value)
}))
console.log(result)
socket.close()
