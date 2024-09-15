document.addEventListener('DOMContentLoaded', function () {
  const blockBtn = document.getElementById('blockBtn');
  const websiteInput = document.getElementById('websiteInput');
  const message = "Don't Lose your FOCUS"; // fixed the message declaration
  const blockedList = document.getElementById('blockedList');

  // Load blocked websites and their messages from storage
  chrome.storage.sync.get(['blockedWebsites'], function (result) {
    if (result.blockedWebsites) {
      result.blockedWebsites.forEach(addToList);
    }
  });

  blockBtn.addEventListener('click', function () {
    const website = websiteInput.value.trim();
    
    if (website) {
      chrome.storage.sync.get(['blockedWebsites'], function (result) {
        let blockedWebsites = result.blockedWebsites || [];
        blockedWebsites.push({ website: website, message: message });
        chrome.storage.sync.set({ blockedWebsites: blockedWebsites }, function () {
          addToList({ website: website, message: message });
          websiteInput.value = ''; // Clear the website input
        });
      });
    }
  });

  function addToList(item) {
    const li = document.createElement('li');
    li.textContent = item.website;
    const unblockBtn = document.createElement('button');
    unblockBtn.textContent = 'Unblock';
    unblockBtn.addEventListener('click', function () {
      chrome.storage.sync.get(['blockedWebsites'], function (result) {
        let blockedWebsites = result.blockedWebsites || [];
        blockedWebsites = blockedWebsites.filter(w => w.website !== item.website);
        chrome.storage.sync.set({ blockedWebsites: blockedWebsites }, function () {
          li.remove();
        });
      });
    });
    li.appendChild(unblockBtn);
    blockedList.appendChild(li);
  }
});
