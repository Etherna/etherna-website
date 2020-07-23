'use strict';
(function () {
  var forceTrailingSlash = __FORCE_TRAILING_SLASH__;
  if (forceTrailingSlash && !window.location.pathname.endsWith("/")) {
    window.location.href =
      window.location.origin +
      window.location.pathname + "/"
      window.location.search;
  }
  var ipfsPathPrefix = (window.location.pathname.match(__PATTERN__) || [])[0] || '';
  window.__PATH_PREFIX__ = ipfsPathPrefix;
})();
