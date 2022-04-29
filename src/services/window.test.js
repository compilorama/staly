/**
 * @jest-environment jsdom
 */

import windowService from './window';

describe('Window Service', () => {
  it('should get location search', () => {
    expect(windowService.getSearch()).toEqual(window.location.search);
  });

  it('should get location pathname', () => {
    expect(windowService.getPathname()).toEqual(window.location.pathname);
  });
});
