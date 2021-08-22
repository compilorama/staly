# Glorious Analytics

> Privacy-first analytics.

## Installation

```
npm install @glorious/analytics --save
```

## Usage

Glorious Analytics is based on [Plausible](https://plausible.io/), a simple and privacy-friendly alternative to Google Analytics.

``` javascript
import GAnalytics from '@glorious/analytics';

const analytics = new GAnalytics();
analytics.init('glorious.codes');
analytics.trackPageview();
```

To avoid been tracked by any site using Glorious Analytics, set `analytics` search param as `disabled`. Your preference will be set in a cookie and the following visits won't be tracked even without declaring the analytics search param on url.
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
