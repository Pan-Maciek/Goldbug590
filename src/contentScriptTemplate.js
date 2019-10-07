const defaultSetting = {
    mouse: false,
    links: false
}

const settings = JSON.parse(localStorage.getItem('settings') || "false") || defaultSetting

const script = document.createElement('script')
script.innerHTML = `!function(settings){###}(${JSON.stringify(settings)})`
document.documentElement.prepend(script)

chrome.runtime.onMessage.addListener(({ message, payload }) => {
    if (message === 'uncheck all') {
        [...document.querySelectorAll('input:not([required])[type="checkbox"]')]
            .filter(x => x.checked)
            .forEach(x => x.click())
    } else if (message === 'load settings') {
        chrome.runtime.sendMessage({ message: 'settings', payload: settings })
    } else if (message === 'settings') {
        localStorage.setItem('settings', JSON.stringify(payload))
        document.location.reload()
    }
})
