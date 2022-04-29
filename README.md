# Glorious Analytics

> Privacy-first analytics.

[![CircleCI](https://circleci.com/gh/glorious-codes/glorious-analytics/tree/master.svg?style=svg)](https://circleci.com/gh/glorious-codes/glorious-analytics/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/glorious-codes/glorious-analytics/badge.svg?branch=master)](https://coveralls.io/github/glorious-codes/glorious-analytics?branch=master)

## Installation

```
npm install @glorious/analytics --save
```

## Usage

Glorious Analytics is based on [Plausible](https://plausible.io/) by default, but you can optionally use another service. See **Adapters** section below to learn more.

``` javascript
import GAnalytics from '@glorious/analytics';

const analytics = new GAnalytics();
analytics.init('glorious.codes');
analytics.trackPageview();
```

To avoid being tracked by any site using Glorious Analytics, set `analytics` search param as `disabled`. Your preference will be set in a cookie and the following visits won't be tracked even without declaring the analytics search param on url.
```
https://glorious.codes?analytics=disabled
```

## API

### `init`

``` javascript
/*
** @token: String [required]
** @options: Object [optional]
*/

// Domain registered on Plausible
const token = 'glorious.codes';
// Local development is not tracked by default, but you can make it work by
// setting trackLocalhost option as true on initializaton.
const options = { trackLocalhost: true };
const analytics = new GAnalytics();

analytics.init(token, options);
```

### `trackPageview`

``` javascript
analytics.trackPageview();
```

## Adapters

You can optionally use Glorious Analytics with the following adapters. Click over one of them to get specific instructions:

- [Google Analytics](https://github.com/glorious-codes/glorious-analytics/blob/master/src/adapters/google-analytics/google-analytics.md)

## Contributing

1. Install [Node](https://nodejs.org/en/). Download the "Recommend for Most Users" version.

2. Clone the repo:
``` bash
git clone git@github.com:glorious-codes/glorious-analytics.git
```

3. Go to the project directory:
``` bash
cd glorious-analytics
```

4. Install the project dependencies:
``` bash
npm install
```

5. Build the project:
``` bash
npm run build
```

## Tests

Ensure that all code that you have added is covered with unit tests:
``` bash
npm run test -- --coverage
```
