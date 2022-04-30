import windowService from '@src/services/window';
import urlService from './url';

describe('URL Service', () => {
  function stubCurrentHref(href){
    windowService.getHref = jest.fn(() => href);
  }

  it('should get an empty object if has no search params on url', () => {
    stubCurrentHref('https://glorious.codes/');
    expect(urlService.getSearchParams()).toEqual({});
  });

  it('should get an object containing search params found on url', () => {
    stubCurrentHref('https://glorious.codes/?foo=bar');
    expect(urlService.getSearchParams()).toEqual({ foo: 'bar' });
  });

  it('should get an object containing search params found on url that uses hash navigation', () => {
    stubCurrentHref('https://components.taslonic.com/#!/components/vue/alert?analytics=disabled');
    expect(urlService.getSearchParams()).toEqual({ analytics: 'disabled' });
    stubCurrentHref('https://components.taslonic.com?analytics=disabled/#!/components/react/alert');
    expect(urlService.getSearchParams()).toEqual({ analytics: 'disabled' });
  });
});
