import dateService from '@src/services/date';
import windowService from '@src/services/window';

const _public = {};

_public.init = googleAnalyticsId => {
  buildGoogleAnalyticsScriptTag(googleAnalyticsId);
  gtag('js', dateService.getNow());
};

_public.trackPageview = (googleAnalyticsId, { path } = {}) => {
  configAnalytics(googleAnalyticsId, path);
};

function buildGoogleAnalyticsScriptTag(id){
  const tag = document.createElement('script');
  tag.setAttribute('async', 'true');
  tag.setAttribute('src', `${getGoogleAnalyticsScriptBaseUrl()}?id=${id}`);
  document.head.appendChild(tag);
}

function configAnalytics(id, path){
  gtag('config', id, { page_path: (path || windowService.getPathname()) });
}

function gtag(){
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

function getGoogleAnalyticsScriptBaseUrl(){
  return 'https://www.googletagmanager.com/gtag/js';
}

export default _public;
