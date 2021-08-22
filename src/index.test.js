/**
 * @jest-environment jsdom
 */

import Plausible from 'plausible-tracker';
import gcookie from '@glorious/cookie';
import { PlausibleMock, plausibleInstanceMock } from '@src/mocks/plausible';
import windowService from '@src/services/window';
import GAnalytics from '.';

jest.mock('plausible-tracker');
Plausible.mockImplementation(PlausibleMock);

describe('GAnalytics', () => {
  beforeEach(() => {
    plausibleInstanceMock.trackPageview = jest.fn();
    windowService.getSearch = jest.fn();
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
    const ganalytics = new GAnalytics();
    ganalytics.init();
    ganalytics.trackPageview();
    expect(plausibleInstanceMock.trackPageview).toHaveBeenCalled();
  });

  it('should not track page view when analytics search param has been set as disabled', () => {
    windowService.getSearch = jest.fn(() => '?analytics=disabled');
    const ganalytics = new GAnalytics();
    ganalytics.init();
    ganalytics.trackPageview();
    expect(plausibleInstanceMock.trackPageview).not.toHaveBeenCalled();
  });

  it('should not track page view when a cookie called analytics has been set as disabled', () => {
    const cookies = { analytics: 'disabled' };
    gcookie.get = jest.fn(key => cookies[key]);
    const ganalytics = new GAnalytics();
    ganalytics.init();
    ganalytics.trackPageview();
    expect(plausibleInstanceMock.trackPageview).not.toHaveBeenCalled();
  });

  it('should set a cookie called analytics as disabled when analytics search param has been set as disabled', () => {
    windowService.getSearch = jest.fn(() => '?analytics=disabled');
    gcookie.set = jest.fn();
    const ganalytics = new GAnalytics();
    ganalytics.init();
    ganalytics.trackPageview();
    expect(gcookie.set).toHaveBeenCalledWith('analytics', 'disabled');
  });
});
