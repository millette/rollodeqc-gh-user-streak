'use strict'
import test from 'ava'
import fn from './'

import { readFileSync } from 'fs'

test('millette', async t => {
  const result = await fn('millette')
  // t.truthy(result.streaks[0].overlaps)
  t.truthy(result.streaks[0].commits.length > 20)
  t.truthy(result.commitDays > 70)
  t.truthy(result.commits > 500)
})

test('millette with details', async t => {
  const resulta = await fn.fetchContribs('millette')
  const result = await fn(resulta)
  // t.truthy(result.streaks[0].overlaps)
  t.truthy(result.streaks[0].commits.length > 20)
  t.truthy(result.commitDays > 70)
  t.truthy(result.commits > 500)
})

test.skip('overlapping', async t => {
  const result = await fn('ldionne')
  t.is(result.streaks[0].commits.length, 25)
  // t.truthy(result.streaks[0].overlaps)
  t.truthy(result.commitDays > 250)
  t.truthy(result.commits > 1000)
})

test.skip('no commits', async t => {
  const result = await fn('Comarco')
  t.is(result.streaks.length, 0)
  t.is(result.commitDays, 0)
  t.is(result.commits, 0)
})

test('some commits', async t => {
  const result = await fn('Comarco')
  t.is(result.streaks.length, 59)
  t.is(result.commitDays, 209)
  t.is(result.commits, 1415)
})

test.skip('buggy svg', async t => {
  const gg = readFileSync('buggy-contrib.svg', 'utf8')
  const result = await fn.fetchContribs(gg)
  t.falsy(result.length)
})

test('ok svg', async t => {
  const gg = readFileSync('ok-contrib.svg', 'utf8')
  const result = await fn.fetchContribs(gg)
  t.is(result.length, 194)
})

test('bad username', t =>
  t.throws(fn('millette666'), 'Response code 404 (Not Found)'))

test('bad username type', t =>
  t.throws(
    fn(666),
    'The username argument should a string or an array of commits for a year.'
  ))
