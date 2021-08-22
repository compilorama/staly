import Plausible from 'plausible-tracker';
import gcookie from '@glorious/cookie';
import { ANALYTICS_KEY, ANALYTICS_DISABLED_VALUE } from '@src/constants/analytics';
import urlService from '@src/services/url';

class GAnalytics {
  init(token, options){
    this.setPlausible(instantiatePlausible(token, options));
  }
  setPlausible(plausible){
    this.plausible = plausible;
  }
  trackPageview(){
    if(isAnalyticsEnabled()) this.plausible.trackPageview();
    else gcookie.set(ANALYTICS_KEY, ANALYTICS_DISABLED_VALUE);
  }
}

function instantiatePlausible(domain, { trackLocalhost } = {}){
  return Plausible({ domain, trackLocalhost });
}

function isAnalyticsEnabled(){
  const analytics = urlService.getSearchParams().analytics || gcookie.get(ANALYTICS_KEY);
  return analytics !== ANALYTICS_DISABLED_VALUE;
}

export default GAnalytics;
