chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
	if (document.URL === "https://twitter.com") {
		chrome.tabs.executeScript(null, { file: "main.js" });
	}
});
