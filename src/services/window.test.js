import windowService from './window';

describe('Window Service', () => {
  it('should get location href', () => {
    expect(windowService.getHref()).toEqual(window.location.href);
  });

  it('should get location pathname', () => {
    expect(windowService.getPathname()).toEqual(window.location.pathname);
  });
});
