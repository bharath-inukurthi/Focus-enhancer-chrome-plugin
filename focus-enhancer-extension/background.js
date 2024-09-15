// Listen for any tab update to check if the user is navigating to a blocked website
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url) {
    // Retrieve the blocked websites from storage
    chrome.storage.sync.get(['blockedWebsites'], function (result) {
      const blockedWebsites = result.blockedWebsites || [];
      
      // Check if the current tab's URL contains any of the blocked websites
      blockedWebsites.forEach(function (item) {
        if (tab.url.includes(item.website)) {
          // Redirect to the blocked page
          chrome.tabs.update(tabId, {url: chrome.runtime.getURL('blocked.html')});
        }
      });
    });
  }
});
