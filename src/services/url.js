import queryString from 'query-string';
import windowService from './window';

const _public = {};

_public.getSearchParams = () => {
  return queryString.parse(getQueryStringFromUrl(windowService.getHref()));
};

function getQueryStringFromUrl(url){
  const delimiter = '?';
  const urlQueryString = url.includes(delimiter) && url.split(delimiter)[1];
  return urlQueryString ? `?${removeHashNavigation(urlQueryString)}` : '';
}

function removeHashNavigation(urlQueryString){
  const [result] = urlQueryString.split('#');
  return result.replace(/\/$/, '');
}

export default _public;
