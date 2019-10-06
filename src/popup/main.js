let settings = { mouse: true, links: false }
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request)
    if (request.message === 'settings') {
        console.log(request.message)
        // settings =
        settings = request.payload
        mouseTrk.checked = settings.mouse
        urlTrk.checked = settings.links
    }
})
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0]
    chrome.tabs.sendMessage(activeTab.id, { message: "load settings" })
})

const mouseTrk = document.querySelector("#mouse_tracking>input")
const urlTrk = document.querySelector("#url_tracking>input")

document.getElementById("uncheck_boxes").addEventListener("click", e => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0]
        chrome.tabs.sendMessage(activeTab.id, { "message": "uncheck all" })
    })
})
document.getElementById("mouse_tracking").addEventListener("click", e => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0]
        chrome.tabs.sendMessage(activeTab.id, { "message": "prevent mouse tracking" })
    })
})
document.getElementById("url_tracking").addEventListener("click", e => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0]
        chrome.tabs.sendMessage(activeTab.id, { "message": "prevent url tracking" })
    })
})

