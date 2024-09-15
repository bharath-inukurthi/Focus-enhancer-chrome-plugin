chrome.storage.sync.get(['blockedWebsites'], function (result) {
    const blockedWebsites = result.blockedWebsites || [];
    blockedWebsites.forEach(website => {
      if (window.location.href.includes(website)) {
        window.location.href = chrome.runtime.getURL('blocked.html');
      }
    });
  });
  