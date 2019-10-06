const script = document.createElement('script')
script.innerHTML = `###`
document.documentElement.prepend(script)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'uncheck all') {
        [...document.querySelectorAll('input:not([required])[type="checkbox"]')]
            .filter(x => x.checked)
            .forEach(x => x.click())
    }
})