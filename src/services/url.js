import queryString from 'query-string';
import windowService from './window';

const _public = {};

_public.getSearchParams = () => {
  return queryString.parse(windowService.getSearch());
};

export default _public;
