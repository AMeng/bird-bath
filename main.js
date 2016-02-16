NodeList.prototype['forEach'] = HTMLCollection.prototype['forEach'] = Array.prototype['forEach'];
var OPTIONS = {};

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

function hideTweetsWithoutText() {
  // Remove media links (so we can check for emptyness later)
  document.querySelectorAll("a.u-hidden").forEach(function(n) {
    n.remove();
  });

  // Delete all empty tweets (only contained media links)
  document.querySelectorAll("p.TweetTextSize").forEach(function(n) {
    if (n.textContent.trim().length == 0) {
      n.parentElement.parentElement.parentElement.parentElement.remove();
    }
  });
}

function setupFeedObserver() {
  var container, feedObserver;

  container = document.querySelector('div.stream-container');
  feedObserver = new window.MutationObserver(function(mutations) {
    if (OPTIONS.birdBathHideNoText) {
      hideTweetsWithoutText();
    }
  });
  feedObserver.observe(container, {
    attributes: true,
    attributeOldValue: true,
    childList: false,
    subtree: false
  });
}

function addCSS(style, cssProperty) {
  style.sheet.insertRule(cssProperty, style.sheet.length);
}

chrome.storage.sync.get("options", function (obj) {
  var observer, style, target;

  if (obj.options) {
    OPTIONS = obj.options;
  }

	style = document.createElement("style");
	style.appendChild(document.createTextNode(""));
	document.head.appendChild(style);

  if (OPTIONS.birdBathHideMedia) {
    addCSS(style, "div.content-main div.AdaptiveMedia { display: none; }");
    addCSS(style, "div.content-main div.QuoteMedia { display: none; }");
  }
  if (OPTIONS.birdBathExpandFeed) {
    addCSS(style, "div.dashboard-right { display: none; }");
    addCSS(style, "div.dashboard-left { display: none; }");
    addCSS(style, "div.content-main { width: 100%; }");
  }
  if (OPTIONS.birdBathHidePromos) {
    addCSS(style, "div.PromptbirdPrompt-streamItem { display: none; }");
  }
  if (OPTIONS.birdBathHideFollow) {
    addCSS(style, "div.WtfLargeCarouselStreamItem { display: none; }");
  }

  addOptionsLink();

  target = document.querySelector('body');
  observer = new window.MutationObserver(function(mutations) {
    observer.disconnect();
    setupFeedObserver();
  });
  observer.observe(target, { childList: true, subtree: true });
});
