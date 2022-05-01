import Plausible from 'plausible-tracker';
import gcookie from '@glorious/cookie';
import { PlausibleMock, plausibleInstanceMock } from '@src/mocks/plausible';
import googleAnalytics from '@src/adapters/google-analytics/google-analytics';
import windowService from '@src/services/window';
import GAnalytics from '.';

jest.mock('plausible-tracker');
Plausible.mockImplementation(PlausibleMock);

describe('GAnalytics', () => {
  function stubCookies(cookies){
    gcookie.get = jest.fn(key => cookies[key]);
  }

  function stubCurrentHref(href){
    windowService.getHref = jest.fn(() => href);
  }

  beforeEach(() => {
    plausibleInstanceMock.trackPageview = jest.fn();
    googleAnalytics.init = jest.fn();
    googleAnalytics.trackPageview = jest.fn();
    stubCookies({});
    stubCurrentHref('http://some.url.com/');
  });

  it('should initialize Plausible on initialize not tracking local development by default', () => {
    const token = 'glorious.codes';
    const ganalytics = new GAnalytics();
    ganalytics.init(token);
    expect(PlausibleMock).toHaveBeenCalledWith({
      domain: token,
      trackLocalhost: undefined
    });
  });

  it('should initialize Plausible on initialize optionally tracking local development', () => {
    const token = 'glorious.codes';
    const ganalytics = new GAnalytics();
    ganalytics.init(token, { trackLocalhost: true });
    expect(PlausibleMock).toHaveBeenCalledWith({
      domain: token,
      trackLocalhost: true
    });
  });

  it('should track page view', () => {
    const token = 'glorious.codes';
    const ganalytics = new GAnalytics();
    ganalytics.init(token);
    ganalytics.trackPageview();
    expect(plausibleInstanceMock.trackPageview).toHaveBeenCalledWith(token, undefined);
  });

  it('should not track page view when analytics search param has been set as disabled', () => {
    stubCurrentHref('http://some.url.com/?analytics=disabled');
    const ganalytics = new GAnalytics();
    ganalytics.init();
    ganalytics.trackPageview();
    expect(plausibleInstanceMock.trackPageview).not.toHaveBeenCalled();
  });

  it('should not track page view when a cookie called analytics has been set as disabled', () => {
    stubCookies({ analytics: 'disabled' });
    const ganalytics = new GAnalytics();
    ganalytics.init();
    ganalytics.trackPageview();
    expect(plausibleInstanceMock.trackPageview).not.toHaveBeenCalled();
  });

  it('should set a cookie called analytics as disabled when analytics search param has been set as disabled', () => {
    stubCurrentHref('http://some.url.com/?analytics=disabled');
    gcookie.set = jest.fn();
    const ganalytics = new GAnalytics();
    ganalytics.init();
    ganalytics.trackPageview();
    expect(gcookie.set).toHaveBeenCalledWith('analytics', 'disabled', 7300);
  });

  it('should optionally use Google Analytics as analytics service', () => {
    const token = 'UA-325476';
    const ganalytics = new GAnalytics();
    const pageviewOptions = { some: 'option' };
    ganalytics.init(token, { adapter: googleAnalytics });
    ganalytics.trackPageview(pageviewOptions);
    expect(googleAnalytics.init).toHaveBeenCalledWith(token);
    expect(googleAnalytics.trackPageview).toHaveBeenCalledWith(token, pageviewOptions);
  });

  it('should not initialize adapter when analytics search param has been set as disabled', () => {
    stubCurrentHref('http://some.url.com/?analytics=disabled');
    const ganalytics = new GAnalytics();
    ganalytics.init('UA-325476', { adapter: googleAnalytics });
    expect(googleAnalytics.init).not.toHaveBeenCalled();
  });

  it('should not track page view when a cookie called analytics has been set as disabled', () => {
    stubCookies({ analytics: 'disabled' });
    const ganalytics = new GAnalytics();
    ganalytics.init('UA-325476', { adapter: googleAnalytics });
    expect(googleAnalytics.init).not.toHaveBeenCalled();
  });
});
