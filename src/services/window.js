const _public = {};

_public.getHref = () => window.location.href;

_public.getPathname = () => window.location.pathname;

_public.getUserAgent = () => window.navigator.userAgent;

export default _public;
