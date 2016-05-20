# rollodeqc-gh-user-streak
[![Build Status](https://travis-ci.org/millette/rollodeqc-gh-user-streak.svg?branch=master)](https://travis-ci.org/millette/rollodeqc-gh-user-streak)
[![Coverage Status](https://coveralls.io/repos/github/millette/rollodeqc-gh-user-streak/badge.svg?branch=master)](https://coveralls.io/github/millette/rollodeqc-gh-user-streak?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/millette/rollodeqc-gh-user-streak.svg)](https://gemnasium.com/github.com/millette/rollodeqc-gh-user-streak)
> Fetch github user commit streak.

Since [Github changed the users profiles](https://github.com/blog/2173-more-contributions-on-your-profile)
to put more emphasis on the present and less on history, they removed the popular commit streak count.
This little more brings it back.

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

#### options
##### foo
Type: `boolean`<br>
Default: `false`

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
    --foo  Lorem ipsum. [Default: false]

  Examples
    $ rollodeqc-gh-user-streak
    unicorns & rainbows
    $ rollodeqc-gh-user-streak ponies
    ponies & rainbows
```


## License
AGPL-v3 © [Robin Millette](http://robin.millette.info)
