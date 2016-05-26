/*eslint arrow-parens: [2, "as-needed"]*/
'use strict'
import test from 'ava'
import fn from './'

test('millette', async t => {
  const result = await fn('millette')
  t.falsy(result.streaks[0].overlaps)
  t.truthy(result.streaks[0].commits.length > 50)
  t.truthy(result.commitDays > 70)
  t.truthy(result.commits > 500)
})

test('millette with details', async t => {
  const resulta = await fn.fetchContribs('millette')
  const result = await fn(resulta)
  t.falsy(result.streaks[0].overlaps)
  t.truthy(result.streaks[0].commits.length > 50)
  t.truthy(result.commitDays > 70)
  t.truthy(result.commits > 500)
})

test.skip('millette with details', async t => {
  const resulta = await fn.fetchContribs('jipiboily')
  console.log(resulta.length)
  console.log(resulta)
  /*
  const result = await fn(resulta)
  t.falsy(result.streaks[0].overlaps)
  t.truthy(result.streaks[0].commits.length > 50)
  t.truthy(result.commitDays > 70)
  t.truthy(result.commits > 500)
  */
})

test('overlapping', async t => {
  const result = await fn('ldionne')
  t.is(result.streaks[0].commits.length, 30)
  t.truthy(result.streaks[0].overlaps)
  t.truthy(result.commitDays > 250)
  t.truthy(result.commits > 1000)
})

test('no commits', async t => {
  const result = await fn('ubik23')
  t.is(result.streaks.length, 0)
  t.is(result.commitDays, 0)
  t.is(result.commits, 0)
})

test('bad username', async t => await t.throws(fn('millette666'), 'Response code 404 (Not Found)'))
test('bad username type', async t => await t.throws(fn(666), 'The username argument should a string or an array of commits for a year.'))
