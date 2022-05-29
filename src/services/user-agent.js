import isbot from 'isbot';
import windowService from './window';

const _public = {};

_public.isBot = () => isbot(windowService.getUserAgent());

export default _public;
