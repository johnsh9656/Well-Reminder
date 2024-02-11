chrome.runtime.onInstalled.addListener(function () {
    // initalize count 
    chrome.storage.local.set({ count: 0 });
    chrome.storage.local.set({ openWeb: false });
});

chrome.tabs.onCreated.addListener(function() {
    const interval = 10;
    _openWeb = chrome.storage.local.get('openWeb');
    
    // increment count on  eveery new tab creation
    chrome.storage.local.get('count', function (data) {
        const count = data.count + 1;
        chrome.storage.local.set({ count });

        // open the website or popup every x times
        if (count % interval == 0 && _openWeb) {
            chrome.tabs.create({ url: "https://well-reminder.web.app/"});
        }
    });
});

function setOpenWeb(status) {
    chrome.storage.local.get('openWeb', function (data) {
        const openWeb = status;
        chrome.storage.local.set({ openWeb });
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getOpenWebStatus") {
        chrome.storage.local.get('openWeb', function (data) {
            sendResponse({ openWeb: data.openWeb });
        });
    }
    else if (request.action === "setOpenWeb") {
        setOpenWeb(reqest.openWeb)
    }
    return true;
});
