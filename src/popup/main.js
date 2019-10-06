document.getElementById("uncheckBoxes").addEventListener("click", e => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "uncheck all" });
    });
})

