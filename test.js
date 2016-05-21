/*eslint arrow-parens: [2, "as-needed"]*/
'use strict'
import test from 'ava'
import fn from './'

test('millette', async t => {
  const result = await fn('millette')
  t.truthy(result.streaks[0].commits.length > 50)
})

test('no commits', async t => {
  const result = await fn('ubik23')
  t.is(result.streaks.length, 0)
})

test('bad username', async t => await t.throws(fn('millette666'), 'Response code 404 (Not Found)'))
