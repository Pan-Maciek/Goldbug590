document.getElementById("uncheck_boxes").addEventListener("click", e => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "uncheck all" });
    });
})
document.getElementById("mouse_tracking").addEventListener("click", e => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "prevent mouse tracking" });
    });
})
document.getElementById("url_tracking").addEventListener("click", e => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "prevent url tracking" });
    });
})

