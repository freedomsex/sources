const {Image} = window;
const {document} = window;

function newImage(src) {
  const img = new Image();
  img.style.visibility = 'hidden';
  img.style.position = 'absolute';
  img.src = src;
}


export default {
  cache(name, value) {
    if (value !== undefined) {
      // make sure we have *** session defined first
      document.cookie = `${opts.cacheCookieName}=${value}; path=/; domain=${_ec_domain}`;
      // {{ajax request to opts.cachePath}} handles caching
      self.ajax({
        url: `${_ec_baseurl + _ec_phpuri + opts.cachePath}?name=${name}&cookie=${opts.cacheCookieName}`,
        success(data) {},
      });
    } else {
      // interestingly enough, we want to erase our ***
      // http cookie so the php will force a cached response
      const origvalue = this.getFromStr(opts.cacheCookieName, document.cookie);
      self._ec.cacheData = undefined;
      document.cookie = `${opts.cacheCookieName}=; expires=Mon, 20 Sep 2010 00:00:00 UTC; path=/; domain=${_ec_domain}`;

      self.ajax({
        url: `${_ec_baseurl + _ec_phpuri + opts.cachePath}?name=${name}&cookie=${opts.cacheCookieName}`,
        success(data) {
          // put our cookie back
          document.cookie = `${opts.cacheCookieName}=${origvalue}; expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/; domain=${_ec_domain}`;

          self._ec.cacheData = data;
        },
      });
    }
  },

  auth(name, value) {
    if (value !== undefined) {
      // {{opts.authPath}} handles Basic Access Authentication
      newImage(`//${value}@${location.host}${_ec_baseurl}${_ec_phpuri}${opts.authPath}?name=${name}`);
    } else {
      self.ajax({
        url: `${_ec_baseurl + _ec_phpuri + opts.authPath}?name=${name}`,
        success(data) {
          self._ec.authData = data;
        },
      });
    }
  },

  etag(name, value) {
    if (value !== undefined) {
      // make sure we have *** session defined first
      document.cookie = `${opts.etagCookieName}=${value}; path=/; domain=${_ec_domain}`;
      // {{ajax request to opts.etagPath}} handles etagging
      self.ajax({
        url: `${_ec_baseurl + _ec_phpuri + opts.etagPath}?name=${name}&cookie=${opts.etagCookieName}`,
        success(data) {},
      });
    } else {
      // interestingly enough, we want to erase our ***
      // http cookie so the php will force a cached response
      const origvalue = this.getFromStr(opts.etagCookieName, document.cookie);
      self._ec.etagData = undefined;
      document.cookie = `${opts.etagCookieName}=; expires=Mon, 20 Sep 2010 00:00:00 UTC; path=/; domain=${_ec_domain}`;

      self.ajax({
        url: `${_ec_baseurl + _ec_phpuri + opts.etagPath}?name=${name}&cookie=${opts.etagCookieName}`,
        success(data) {
          // put our cookie back
          document.cookie = `${opts.etagCookieName}=${origvalue}; expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/; domain=${_ec_domain}`;

          self._ec.etagData = data;
        },
      });
    }
  },

};
