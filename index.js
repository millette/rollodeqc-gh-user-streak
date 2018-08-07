/*
Fetch github user commit streak.

Copyright 2016
Robin Millette <mailto:robin@millette.info>
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

// npm
const got = require('got')
const sort = require('lodash.sortby')
const flatten = require('lodash.flatten')

const weeksRe = /<g transform="translate\([0-9]+, 0\)">([^]+?)<\/g>/gm
const daysRe = /<rect class="day" width="10" height="10" x="-?[0-9]+" y="[0-9]+" fill="#[a-fA-F0-9]+" data-count="([0-9]+)" data-date="([0-9]{4}-[0-9]{2}-[0-9]{2})"\/>/g

const counter = days => {
  const counts = []
  let match
  let cnt
  while ((match = daysRe.exec(days))) {
    cnt = parseInt(match[1], 10)
    counts.push({ count: cnt, date: match[2] })
  }
  return counts
}

const dailyContribs = str => {
  const sorted = sort(flatten(str.match(weeksRe).map(counter)), 'date')
  const dates = sorted.map(g => g.date).slice(-2)
  if (Date.parse(dates[1]) - Date.parse(dates[0]) > 90005000) {
    // day skipped!
    return sorted.slice(1, -1).filter(x => x.count)
  }

  return sorted.filter(x => x.count)
}

const fetchContribs = username => {
  if (!username || typeof username !== 'string') {
    return Promise.reject(
      new Error('The username argument should a non-empty string.')
    )
  }
  if (username.indexOf('<svg ') === -1) {
    return got(`https://github.com/users/${username}/contributions`, {
      retry: 5
    }).then(({ body }) => dailyContribs(body))
  }
  return Promise.resolve(dailyContribs(username))
}

const findStreaks = contribs => {
  const s = []
  let g
  let lastDay = 0
  let firstDay = contribs[0].date

  contribs.filter(x => x.count).forEach(contrib => {
    const dayN = Math.round(new Date(contrib.date).getTime() / 86400000)
    if (dayN - lastDay > 1) {
      if (g && g.length) {
        s.push(g)
      }
      g = []
    }
    g.push(contrib)
    lastDay = dayN
  })
  if (g && g.length) {
    s.push(g)
  }
  // sort by streak length and number of commits to break ties
  return sort(
    sort(
      s.map(streak => {
        const obj = {
          begin: streak[0].date,
          commits: streak.map(day => day.count)
        }
        if (streak[0].date === firstDay) {
          obj.overlaps = true
        }
        return obj
      }),
      x => x.commits.reduce((p, c) => p + c, 0)
    ),
    x => x.commits.length
  ).reverse()
}

module.exports = username => {
  switch (typeof username) {
    case 'string':
      return fetchContribs(username).then(contribs => {
        return {
          streaks: findStreaks(contribs),
          commitDays: contribs.filter(x => x.count).length,
          days: contribs.length,
          commits: contribs.reduce((p, c) => p + c.count, 0)
        }
      })

    case 'object':
      return Promise.resolve({
        streaks: findStreaks(username),
        commitDays: username.filter(x => x.count).length,
        days: username.length,
        commits: username.reduce((p, c) => p + c.count, 0)
      })

    default:
      return Promise.reject(
        new Error(
          'The username argument should a string or an array of commits for a year.'
        )
      )
  }
}

module.exports.fetchContribs = fetchContribs
