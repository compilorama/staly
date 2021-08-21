import GAnalytics from '.';

describe('GAnalytics', () => {
  it('should contain a method to initialize analytics', () => {
    const ganalytics = new GAnalytics();
    expect(ganalytics.init).toEqual(expect.any(Function));
    expect(ganalytics.init()).toBeFalsy();
  });
});
