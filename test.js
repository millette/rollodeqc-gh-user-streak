'use strict'
import test from 'ava'
import fn from './'

import fs from 'fs'

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

test.skip('overlapping', async t => {
  const result = await fn('ldionne')
  t.is(result.streaks[0].commits.length, 25)
  // t.truthy(result.streaks[0].overlaps)
  t.truthy(result.commitDays > 250)
  t.truthy(result.commits > 1000)
})

test('no commits', async t => {
  const result = await fn('Comarco')
  t.is(result.streaks.length, 0)
  t.is(result.commitDays, 0)
  t.is(result.commits, 0)
})

test('buggy svg', t => {
  fs.readFile('buggy-contrib.svg', 'utf8', (err, gg) => {
    t.falsy(err)
    fn.fetchContribs(gg).then(result => {
      t.truthy(result.length <= 365)
    })
  })
})

test('ok svg', t => {
  fs.readFile('ok-contrib.svg', 'utf8', (err, gg) => {
    t.falsy(err)
    fn.fetchContribs(gg).then(result => {
      t.truthy(result.length >= 366)
    })
  })
})

test('bad username', async t => await t.throws(fn('millette666'), 'Response code 404 (Not Found)'))
test('bad username type', async t => await t.throws(fn(666), 'The username argument should a string or an array of commits for a year.'))
