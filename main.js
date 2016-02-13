NodeList.prototype['forEach'] = HTMLCollection.prototype['forEach'] = Array.prototype['forEach'];
NodeList.prototype['slice'] = HTMLCollection.prototype['slice'] = Array.prototype['slice'];

var OPTIONS = {};
chrome.storage.sync.get("options", function (obj) {
    if (obj.options) {
      OPTIONS = obj.options;
    }
});

function addOptionsLink() {
  var hasOptionsLink, optionsUrl, userMenu;

  hasOptionsLink = document.querySelectorAll('a.birdbath-options').length > 0;
  if (!hasOptionsLink) {
    optionsUrl = chrome.extension.getURL('options.html');
    userMenu = document.querySelector('ul.right-actions div.dropdown-menu ul li.dropdown-divider');
    userMenu.insertAdjacentHTML(
      'afterend',
      "<li role='presentation'><a href='" + optionsUrl + "' class='birdbath-options' target='_blank'>Bird Bath</a></li>"
    );
  }
}

function hideMedia() {
  document.querySelectorAll("div.AdaptiveMedia").forEach(function(n) {
    n.remove();
  });
  document.querySelectorAll("div.QuoteMedia").forEach(function(n) {
    n.remove();
  });
}

function expandFeed() {
  // Remove the sidebars and expand the main feed to take their place
  document.querySelector("div.dashboard-right").remove();
  document.querySelector("div.dashboard-left").remove();
  document.querySelector("div.content-main").style.width = "100%";
}

function setupRefreshObserver() {
  var container, refreshObserver;

  addOptionsLink();
  if (OPTIONS.birdBathExpandFeed) {
    expandFeed();
  }
  if (OPTIONS.birdBathHideMedia) {
    hideMedia();
  }

  container = document.querySelector('div.stream-container');
  refreshObserver = new window.MutationObserver(function(mutations) {
    if (OPTIONS.birdBathHideMedia) {
      hideMedia();
    }
  });
  refreshObserver.observe(container, {
    attributes: true,
    attributeOldValue: true,
    childList: false,
    subtree: false
  });
}

(function() {
  var observer, target;

  target = document.querySelector('body');
  observer = new window.MutationObserver(function(mutations) {
    observer.disconnect();
    setupRefreshObserver();
  });
  observer.observe(target, { childList: true, subtree: true });
})();
