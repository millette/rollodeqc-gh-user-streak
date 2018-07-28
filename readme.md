# rollodeqc-gh-user-streak
[![Build Status](https://travis-ci.org/millette/rollodeqc-gh-user-streak.svg?branch=master)](https://travis-ci.org/millette/rollodeqc-gh-user-streak)
[![Coverage Status](https://coveralls.io/repos/github/millette/rollodeqc-gh-user-streak/badge.svg?branch=master)](https://coveralls.io/github/millette/rollodeqc-gh-user-streak?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/millette/rollodeqc-gh-user-streak.svg)](https://gemnasium.com/github.com/millette/rollodeqc-gh-user-streak)
> Fetch github user contribution streak.

Since [Github changed the users profiles](https://github.com/blog/2173-more-contributions-on-your-profile)
to put more emphasis on the present and less on history, they removed the popular contribution streak count.
This little script brings it back.

## Known limitations
We're only looking at the last 365 days. If you've been streaking
for more than a year, congratulation! But you won't see the result here, sorry.

## New since version 0.2.0
The cli now uses [update-notifier][] to let the user know about updates to this program.

Users have the ability to opt-out of the update notifier by changing
the optOut property to true in ~/.config/configstore/update-notifier-rollodeqc-gh-user-streak.json.
The path is available in notifier.config.path.

Users can also opt-out by setting the environment variable NO_UPDATE_NOTIFIER
with any value or by using the --no-update-notifier flag on a per run basis.

## Install
```
$ npm install --save rollodeqc-gh-user-streak
```

## Usage
```js
const rollodeqcGhUserStreak = require('rollodeqc-gh-user-streak')

rollodeqcGhUserStreak('unicorns')
//=> 'unicorns & rainbows'
```

## API
### rollodeqcGhUserStreak(input, [options])
#### input
Type: `string`

Lorem ipsum.

## CLI
```
$ npm install --global rollodeqc-gh-user-streak
```

```
$ rollodeqc-gh-user-streak --help

  Usage
    rollodeqc-gh-user-streak [input]

  Options
    --details  -d   Output every contribution. [Default: false]

  Examples
    $ rollodeqc-gh-user-streak
    unicorns & rainbows
    $ rollodeqc-gh-user-streak ponies
    ponies & rainbows
    $ rollodeqc-gh-user-streak bob --details
    ... detailed stats for bob
```


## License
AGPL-v3 © [Robin Millette](http://robin.millette.info)

[update-notifier]: <https://github.com/yeoman/update-notifier>
