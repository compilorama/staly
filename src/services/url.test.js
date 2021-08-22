import windowService from '@src/services/window';
import urlService from './url';

describe('URL Service', () => {
  it('should get an empty object if has no search params on url', () => {
    windowService.getSearch = jest.fn(() => '');
    expect(urlService.getSearchParams()).toEqual({});
  });

  it('should get an object containing search params found on url', () => {
    windowService.getSearch = jest.fn(() => '?foo=bar');
    expect(urlService.getSearchParams()).toEqual({ foo: 'bar' });
  });
});
