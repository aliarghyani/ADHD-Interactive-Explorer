import { spawnSync } from 'node:child_process'

const [major, minor] = process.versions.node.split('.').map(Number)
if (major !== 22 || minor < 19) {
  console.error(`Release requires Node >=22.19.0 <23; current ${process.version}`)
  process.exit(1)
}

const pnpmCli = process.env.npm_execpath
if (!pnpmCli) {
  console.error('Run the release gate through pnpm so it can pin child commands to the validated Node runtime')
  process.exit(1)
}
const steps = [
  ['install', '--frozen-lockfile'],
  ['knowledge:validate'],
  ['test:contract'],
  ['test:domain'],
  ['layout:validate'],
  ['test:layout'],
  ['test'],
  ['typecheck'],
  ['lint'],
  ['build'],
  ['generate'],
  ['release:artifact'],
  ['exec', 'playwright', 'test', 'tests/e2e/wp14-functional.spec.ts', 'tests/e2e/wp15-deployment.spec.ts', '--project=chromium', '--workers=1'],
]
for (const [name, ...args] of steps) {
  const commandArgs = name === 'install' || name === 'exec' ? [name, ...args] : ['run', name, ...args]
  console.log(`\n$ pnpm ${commandArgs.join(' ')}`)
  const result = spawnSync(process.execPath, [pnpmCli, ...commandArgs], {
    stdio: 'inherit',
    env: { ...process.env, PLAYWRIGHT_STATIC_ARTIFACT: '1' },
  })
  if (result.status !== 0) process.exit(result.status ?? 1)
}
