const port = process.argv[2] ?? '9224'
const pages = await (await fetch(`http://localhost:${port}/json`)).json()
const page = pages.find((candidate) => candidate.type === 'page' && candidate.url.startsWith('http://localhost'))
if (!page) throw new Error('No local spike page is connected to Chrome DevTools')

const socket = new WebSocket(page.webSocketDebuggerUrl)
const findings = []
let nextId = 1
await new Promise((resolve) => socket.addEventListener('open', resolve, { once: true }))

socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (message.method === 'Runtime.exceptionThrown') findings.push({ type: 'exception', text: message.params.exceptionDetails.text })
  if (message.method === 'Runtime.consoleAPICalled' && ['warning', 'error'].includes(message.params.type)) {
    findings.push({ type: message.params.type, text: message.params.args.map((arg) => arg.value ?? arg.description).join(' ') })
  }
  if (message.method === 'Log.entryAdded' && ['warning', 'error'].includes(message.params.entry.level)) {
    findings.push({ type: message.params.entry.level, text: message.params.entry.text, url: message.params.entry.url })
  }
})

for (const method of ['Runtime.enable', 'Log.enable', 'Page.enable']) {
  socket.send(JSON.stringify({ id: nextId++, method }))
}
socket.send(JSON.stringify({ id: nextId, method: 'Page.reload', params: { ignoreCache: true } }))

await new Promise((resolve) => {
  const timeout = setTimeout(resolve, 3500)
  socket.addEventListener('message', (event) => {
    if (JSON.parse(event.data).method === 'Page.loadEventFired') {
      setTimeout(() => { clearTimeout(timeout); resolve() }, 800)
    }
  })
})

console.log(JSON.stringify(findings, null, 2))
socket.close()
