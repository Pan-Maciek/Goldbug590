const defaultSetting = {
    mouse: false,
    links: false
}

const settings = localStorage.getItem('settings') || defaultSetting

const script = document.createElement('script')
script.innerHTML = `!function(settings){###}(${JSON.stringify(settings)})`
document.documentElement.prepend(script)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'uncheck all') {
        [...document.querySelectorAll('input:not([required])[type="checkbox"]')]
            .filter(x => x.checked)
            .forEach(x => x.click())
    } else if (request.message === 'load settings') {
        sendResponse({ message: 'settings', payload: settings })
    }
})
