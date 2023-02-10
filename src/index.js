import Plausible from 'plausible-tracker';
import gcookie from '@glorious/cookie';
import { ANALYTICS_KEY, ANALYTICS_DISABLED_VALUE, ANALYTICS_KEY_EXPIRY } from '@src/constants/analytics';
import userAgentService from '@src/services/user-agent';
import urlService from '@src/services/url';

class GAnalytics {
  init(token, { adapter, ...rest } = {}){
    this.setToken(token);
    this.setAdapter((adapter || buildDefaultAdapter(token, rest)));
    if(shouldTrack()) this.adapter.init(token);
  }
  setToken(token){
    this.token = token;
  }
  setAdapter(adapter){
    this.adapter = adapter;
  }
  trackPageview(options){
    if(shouldTrack()) this.adapter.trackPageview(options, this.token);
    else gcookie.set(ANALYTICS_KEY, ANALYTICS_DISABLED_VALUE, ANALYTICS_KEY_EXPIRY);
  }
}

function buildDefaultAdapter(domain, { trackLocalhost }){
  const plausible = Plausible({ domain, trackLocalhost });
  return { ...plausible, init: () => {} };
}

function shouldTrack(){
  return !userAgentService.isBot() && isAnalyticsEnabled();
}

function isAnalyticsEnabled(){
  const analytics = urlService.getSearchParams().analytics || gcookie.get(ANALYTICS_KEY);
  return analytics !== ANALYTICS_DISABLED_VALUE;
}

export default GAnalytics;
