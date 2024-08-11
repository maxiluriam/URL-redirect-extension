const urlsArray = [
  "https://x.com/",
  "https://www.reddit.com/",
  "https://twitter.com/",
];

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  (async () => {
    // see the note below on how to choose currentWindow or lastFocusedWindow
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    urlsArray.forEach((url) => {
      if (tab.url.startsWith(url)) {
        chrome.tabs.update(tabId, { url: "./siteblocked.html" });
      }
    });
  })();
});
