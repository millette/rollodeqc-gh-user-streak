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
const meow = require('meow')
const rollodeqcGhUserStreak = require('./')

const cli = meow([
  'Usage',
  '  $ rollodeqc-gh-user-streak [input]',
  '',
  'Options',
  '  --foo  Lorem ipsum. [Default: false]',
  '',
  'Examples',
  '  $ rollodeqc-gh-user-streak',
  '  unicorns & rainbows',
  '  $ rollodeqc-gh-user-streak ponies',
  '  ponies & rainbows'
])

rollodeqcGhUserStreak(cli.input[0] || 'unicorns')
  .then((response) => {
    console.log(JSON.stringify(response, null, ' '))
  })
  .catch((e) => {
    console.error('ERROR:', e)
  })
