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

const weeksRe = /<g transform="translate\([0-9]+, 0\)">([^]+?)<\/g>/mg
const daysRe = /<rect class="day" width="11" height="11" y="[0-9]+" fill="#[a-fA-F0-9]+" data-count="([0-9]+)" data-date="([0-9]{4}-[0-9]{2}-[0-9]{2})"\/>/g

const dailyContribs = (str) => sort(flatten(str.match(weeksRe).map((days) => {
  const counts = []
  let match
  let cnt
  while (match = daysRe.exec(days)) {
    cnt = parseInt(match[1], 10)
    if (cnt) { counts.push({ count: cnt, date: match[2] }) }
  }
  return counts
})), 'date')

const fetchContribs = (username) => got(`https://github.com/users/${username}/contributions`)
  .then((response) => response.body)
  .then((body) => dailyContribs(body))

const findStreaks = (contribs) => {
  const s = []
  let g
  let lastDay = 0
  contribs.forEach((contrib) => {
    const dayN = Math.round(new Date(contrib.date).getTime() / 86400000)
    if (dayN - lastDay > 1) {
      if (g && g.length > 1) { s.push(g) }
      g = [ contrib ]
    } else if (dayN - lastDay === 1) {
      g.push(contrib)
    } else {
      throw(new Error('Contribs should be ordered by date in ascending order.'))
    }
    lastDay = dayN
  })
  if (g && g.length > 1) { s.push(g) }
  return sort(sort(
    s.map((streak) => { return { begin: streak[0].date, commits: streak.map((day) => day.count) } }),
    (x) => x.commits.reduce((p, c) => p + c, 0)
  ), (x) => x.commits.length).reverse()
}

module.exports = (username) => fetchContribs(username)
  .then((contribs) => {
    return {
      streaks: findStreaks(contribs),
      commitDays: contribs.length,
      days: 365,
      commits: contribs.reduce((p, c) => p + c.count, 0)
    }
  })

module.exports.fetchContribs = fetchContribs
