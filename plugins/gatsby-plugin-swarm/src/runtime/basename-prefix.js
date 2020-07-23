(function () {
  /// don't run if __PATH_PREFIX__ is empty
  if (window.__PATH_PREFIX__) {
    fixCurrentUrls();
    observeDOM();
  }

  /// Fix current scripts and links
  function fixCurrentUrls() {
    var currentScripts = document.querySelectorAll('[href], [src], [data-href], [data-src]');
    fixUrls(currentScripts);
  }

  /// Observe for added scripts and links in DOM
  function observeDOM() {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "attributes") {
          fixUrls([mutation.target]);
        }
        fixUrls(mutation.addedNodes);
      });
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true
    });
  }

  /// Replace script and link tags with corrected one
  function fixUrls(nodes) {
    var basename = window.__PATH_PREFIX__;

    nodes.forEach(function (node) {
      if (typeof node !== "object") return;

      var fixedNode = clonedElWithBasename(node, basename)
      if (fixedNode) {
        node.parentNode.appendChild(fixedNode);
        node.remove();
      }
    });
  }

  // Clone element with attributes
  function clonedElWithBasename(originEl, basename) {
    if (!originEl) return null;
    if (typeof originEl !== "object") return null;
    if (typeof originEl.getAttribute !== "function") return null;

    if (!basename.endsWith("/")) {
      basename = basename + "/";
    }

    var url, urlAttr;
    var attributes = ['href', 'src', 'data-href', 'data-src'];
    var patterns = [
      /(^\/|^)__PATH_PREFIX__\//,
      /^(\.?\.\/)+/
    ]
    for (var i = 0; i < attributes.length; i++) {
      var attr = attributes[i];
      var nodeUrl = originEl.getAttribute(attr);
      if (nodeUrl) {
        for (var j = 0; j < patterns.length; j++) {
          var pattern = patterns[j]
          if (pattern.test(nodeUrl)) {
            url = nodeUrl.replace(pattern, basename);
            urlAttr = attr
            break;
          }
        }

        if (url) break;
      }
    }

    if (!url) return null;

    // var cloneEl = document.createElement(originEl.tagName);
    // for (var i = 0; i < originEl.attributes.length; i++) {
    //   var attr = originEl.attributes[i];
    //   cloneEl.setAttribute(attr.name, attr.value);
    // }
    // cloneEl.setAttribute(urlAttr, url)
    // cloneEl.innerText = originEl.innerText;
    // return cloneEl;


    originEl.setAttribute(urlAttr, url);
  }
})();
