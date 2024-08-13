chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  (async () => {
    const array = await chrome.storage.local.get(["key"]).then((result) => {
      return result.key;
    });

    // see the note below on how to choose currentWindow or lastFocusedWindow
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    array.forEach((url) => {
      const parsedTabUrl = tab.url
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "");
      if (parsedTabUrl.startsWith(url) && url != "") {
        chrome.tabs.update(tabId, { url: "./siteblocked.html" });
      }
    });
  })();
});
