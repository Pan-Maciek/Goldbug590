const defaultSetting = {
    mouse: false,
    links: false
}

const settings = JSON.parse(localStorage.getItem('settings') || "false") || defaultSetting

const script = document.createElement('script')
script.innerHTML = `!function(settings){###}(${JSON.stringify(settings)})`
document.documentElement.prepend(script)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'uncheck all') {
        [...document.querySelectorAll('input:not([required])[type="checkbox"]')]
            .filter(x => x.checked)
            .forEach(x => x.click())
    } else if (request.message === 'load settings') {
        chrome.runtime.sendMessage({ message: 'settings', payload: settings })
        sendResponse({ message: 'settings', payload: settings })
    } else if (request.message === 'settings') {
        localStorage.setItem('settings',JSON.stringify(request.payload))
        document.location.reload()
    }
})
