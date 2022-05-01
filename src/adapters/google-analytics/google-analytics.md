# Google Analytics Adapter

## Usage

To use [Glorious Analytics](https://analytics.google.com/) as analytics service, initialize Glorious Analytics passing it as adapter in the options.

``` javascript
import GAnalytics from '@glorious/analytics';
import googleAnalyticsAdapter from '@glorious/analytics/dist/adapters/google-analytics';

const analytics = new GAnalytics();
analytics.init('UA-325476', { adapter: googleAnalyticsAdapter });
analytics.trackPageview();
```

## API

### `init`

``` javascript
/*
** @id: String [required]
** @options: Object [optional]
*/

// Google Analytics ID. Supports both:
// - Universal Analytics ID
// - Google Analytics 4 property
const id = 'UA-325476';
// You need to pass Google Analytics adapter as option.
// See how to import it on the Usage section above.
const options = { adapter: googleAnalyticsAdapter };
const analytics = new GAnalytics();

analytics.init(id, options);
```

### `trackPageview`

``` javascript
/*
** @options: Object [optional]
*/

// By default, the current pathname will be used.
// If your application is a SPA that uses hash navigation, you can optionally
// pass a custom path as option otherwise:
const options = { path: window.location.hash.substring(1) };
const analytics = new GAnalytics();

analytics.trackPageview(options);
```
