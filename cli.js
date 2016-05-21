#!/usr/bin/env node

/*
Fetch github user commit streak.

Copyright 2016
Robin Millette <robin@millette.info>
<http://robin.millette.info>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the
[GNU Affero General Public License](LICENSE.md)
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict'

const rollodeqcGhUserStreak = require('./')

// npm
const meow = require('meow')
const sort = require('lodash.sortby')

const cli = meow([
  'Usage',
  '  $ rollodeqc-gh-user-streak [username]',
  '',
  'Examples',
  '  $ rollodeqc-gh-user-streak',
  '  ... stats for millette',
  '  $ rollodeqc-gh-user-streak bob',
  '  ... stats for bob'
])

rollodeqcGhUserStreak(cli.input[0] || 'millette')
  .then((response) => {
    if (!response.streaks.length) {
      console.log('No commits in last 365 days.')
      return
    }
    const latest = sort(response.streaks, 'begin').reverse()[0]
    console.log(`Longest streak in last 365 days: ${response.streaks[0].commits.length} days (${response.streaks[0].commits.reduce((p, c) => p + c)} commits), started ${response.streaks[0].begin}.`)
    if (latest.begin !== response.streaks[0].begin) {
      console.log(`Latest streak: ${latest.commits.length} days (${latest.commits.reduce((p, c) => p + c)} commits), started ${latest.begin}.`)
    }
  })
  .catch((e) => {
    console.error('ERROR:', e)
  })
