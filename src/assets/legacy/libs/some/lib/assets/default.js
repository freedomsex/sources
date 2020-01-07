export default {
  history: true, // CSS history knocking or not .. can be network intensive
  java: true, // Java applet on/off... may prompt users for permission to run.
  domain: `.${window.location.host.replace(/:\d+/, '')}`, // Get current domain
  baseurl: '', // base url for php, flash and silverlight assets
  asseturi: '/assets', // assets = .fla, .jar, etc
  phpuri: '/php', // php file path or route
  authPath: false,
  swfFileName: '/static/libs/some/lib.swf',
  xapFileName: '/static/libs/some/lib.xap',
  jnlpFileName: '/static/libs/some/lib.jnlp',
  pngCookieName: 'somelib_png',
  pngPath: '/static/libs/some/lib_png.php',
  etagCookieName: 'somelib_etag',
  etagPath: '/static/libs/some/lib_etag.php',
  cacheCookieName: 'somelib_cache',
  cachePath: '/static/libs/some/lib_cache.php',
  hsts: false,
  hsts_domains: [],
  db: true, // Database
  idb: true, // Indexed DB
};
