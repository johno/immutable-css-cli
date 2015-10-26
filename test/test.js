import test from 'ava'
import childProcess from 'child_process'

test('immutable-css-cli lints stylesheets', t => {
  t.plan(1)

  const cp = childProcess.execFile('../cli.js', ['fixtures/basscss.css', 'fixtures/basscss-mutations.css'], { cwd: __dirname })
  cp.on('close', code => t.is(code, 1))
})
