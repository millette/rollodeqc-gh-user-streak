#!/usr/bin/env node

/*
Fetch github user contribution streak.

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
const chalk = require('chalk')
const sort = require('lodash.sortby')
const updateNotifier = require('update-notifier')

updateNotifier({ pkg: require('./package.json') }).notify()

const cli = meow(`
Usage
  $ rollodeqc-gh-user-streak [username] --details

Options
  --details  -d   Output last year's contributions count per day. [Default: false]

Examples
  $ rollodeqc-gh-user-streak
  ... stats for millette
  $ rollodeqc-gh-user-streak bob
  ... stats for bob
  $ rollodeqc-gh-user-streak bob --details
  ... detailed stats for bob
`, {
  flags: {
    details: {
      type: 'boolean',
      alias: 'd'
    }
  }
})

const username = cli.input[0] || 'millette'

if (cli.flags.details) {
  rollodeqcGhUserStreak.fetchContribs(username)
    .then((response) => {
      console.log(JSON.stringify(response, null, ' '))
    })
} else {
  rollodeqcGhUserStreak(username)
    .then((response) => {
      if (!response.streaks.length) {
        console.log('No contributions in last 365 days.')
        return
      }
      const latest = sort(response.streaks, 'begin').reverse()[0]
      console.log(chalk`{green Longest streak in a year: ${response.streaks[0].commits.length} days (${response.streaks[0].commits.reduce((p, c) => p + c)} contributions), started ${response.streaks[0].begin}.}`)
      if (response.streaks[0].overlaps) {
        console.log(chalk`{red.bold Note that the streak may be longer since it started at least 365 days ago.}`)
      }
      if (latest.begin !== response.streaks[0].begin) {
        console.log(`Latest streak: ${latest.commits.length} days (${latest.commits.reduce((p, c) => p + c)} contributions), started ${latest.begin}.`)
      }
    })
    .catch((e) => {
      console.error('ERROR:', e)
    })
}
