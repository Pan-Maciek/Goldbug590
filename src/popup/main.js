const mouseTrk = document.querySelector("#mouse_tracking>input")
const urlTrk = document.querySelector("#url_tracking>input")
const uncheckBoxesBtn = document.getElementById("uncheck_boxes")
const mouseTrackingLabel = document.getElementById("mouse_tracking")
const linkTrackingLabel = document.getElementById("url_tracking")

let settings = { mouse: false, links: false }

chrome.runtime.onMessage.addListener(({ message, payload }) => {
    if (message === 'settings') {
        settings = payload
        mouseTrk.checked = settings.mouse
        urlTrk.checked = settings.links
    }
})

const sendMessageToContentScript = (message, payload) =>
    chrome.tabs.query({ currentWindow: true, active: true },
        ([{ id }]) => chrome.tabs.sendMessage(id, { message, payload }))

sendMessageToContentScript('load settings')

uncheckBoxesBtn.addEventListener("click", e => sendMessageToContentScript('uncheck all'))

const sendSettings = () => sendMessageToContentScript('settings', settings)

const toggleSettings = key => (settings[key] = !settings[key], sendSettings())

mouseTrackingLabel.addEventListener('click', () => toggleSettings('mouse'))
linkTrackingLabel.addEventListener('click', () => toggleSettings('links'))
