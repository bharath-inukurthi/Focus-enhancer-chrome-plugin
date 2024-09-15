chrome.storage.sync.get(['blockedWebsites'], function (result) {
  const blockedWebsites = result.blockedWebsites || [];
  const currentURL = window.location.href;

  // Find the blocked website and its associated message
  const blockedItem = blockedWebsites.find(item => currentURL.includes(item.website));

  // If the website is blocked, show the custom motivational message or a default one
  if (blockedItem) {
    const customMessage = blockedItem.message || "Stay focused and reach your goals!";
    document.getElementById('motivationalQuote').textContent = customMessage;
  }
});

document.getElementById('agreeBtn').addEventListener('click', function () {
  window.close();  // Close the blocked page
});
