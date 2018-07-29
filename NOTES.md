# Scaling

> Collecting a huge set of contributors

Say 500 people contribute each day, out of 10,000 registered. Checking all users when only 5% will contribute each day is somewhat wasteful. What kinds of heuristics can we come up to improve that?

* The longer a person has last contributed, the lower are his chances of contributing
* The inverse is also true

## Example

Should I check this user?

* 2h ago: 100%
* 168h ago: 1%

## Notes

2007-10-20T05:24:19Z is the earliest possible time for a recorded contribution

See <https://api.github.com/user/1> and <https://api.github.com/user/2> for example.

Fetching the data for a user provides us with the last 365 days of data. If we want more we must store it ourselves.

About 600,000 seconds in a week.
About 80,000 seconds in a day.
