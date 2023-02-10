import GAnalytics from '@src/index.js';
import adapter from './google-analytics';
import dateService from '@src/services/date';
import windowService from '@src/services/window';

describe('Google Analytics Adapter', () => {
  const dateMock = new Date();
  const createElementMock = { setAttribute: jest.fn() };

  function init(id){
    const analytics = new GAnalytics();
    analytics.init(id, { adapter });
    return analytics;
  }

  function stubPathname(path){
    windowService.getPathname = jest.fn(() => path);
  }

  beforeEach(() => {
    document.createElement = jest.fn(() => ({ setAttribute: createElementMock.setAttribute }));
    document.head.appendChild = jest.fn();
    dateService.getNow = jest.fn(() => dateMock);
    stubPathname('/');
  });

  afterEach(() => {
    delete window.dataLayer;
    window.location.hash = '';
    document.head.appendChild.mockClear();
  });

  it('should get analytics thirdy party code asynchronously', () => {
    init();
    expect(createElementMock.setAttribute).toHaveBeenCalledWith('async', 'true');
  });

  it('should get analytics thirdy party code passing analytics id', () => {
    const id = 'UA325476';
    init(id);
    expect(createElementMock.setAttribute).toHaveBeenCalledWith(
      'src',
      `https://www.googletagmanager.com/gtag/js?id=${id}`
    );
  });

  it('should append script tag to get analytics third party code on head', () => {
    document.head.appendChild = jest.fn();
    init();
    expect(typeof document.head.appendChild.mock.calls[0][0]).toEqual('object');
  });

  it('should configure analytics settings after append script tag on head', () => {
    init();
    expect(window.dataLayer[0][0]).toEqual('js');
    expect(window.dataLayer[0][1]).toEqual(dateMock);
  });

  it('should track page view using current pathname by default', () => {
    const path = '/about';
    const id = 'UA325476';
    stubPathname(path);
    const analytics = init(id);
    analytics.trackPageview();
    expect(window.dataLayer[1][0]).toEqual('config');
    expect(window.dataLayer[1][1]).toEqual(id);
    expect(window.dataLayer[1][2]).toEqual({ page_path: path });
  });

  it('should optionally track page view passing a custom pathname', () => {
    const id = 'UA325476';
    const customPath = '#/author';
    const analytics = init(id);
    analytics.trackPageview({ path: customPath });
    expect(window.dataLayer[1][0]).toEqual('config');
    expect(window.dataLayer[1][1]).toEqual(id);
    expect(window.dataLayer[1][2]).toEqual({ page_path: customPath });
  });
});
