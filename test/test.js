import test from 'ava'
import childProcess from 'child_process'

test('immutable-css-cli lints stylesheets', t => {
  const cp = childProcess.execFile('../cli.js', ['fixtures/basscss.css', 'fixtures/basscss-mutations.css'], { cwd: __dirname })
  cp.on('close', code => {
    t.is(code, 1)
    t.end()
  })
})

test('immutable-css-cli --strict lints stylesheets strictly', t => {
  const cp = childProcess.execFile('../cli.js', ['fixtures/basscss.css', 'fixtures/basscss-mutations.css', '--strict'], { cwd: __dirname })
  cp.on('close', code => {
    t.is(code, 1)
    t.end()
  })
})
