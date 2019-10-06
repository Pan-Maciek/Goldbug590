!function () {
    function propertyObserver(object, property, getCallback) {
        if(!Object.getOwnPropertyDescriptor(object, property)) {
            let val = object[property]
            Object.defineProperty(object, property, {
                get() {
                    getCallback(val ,property)
                    return val
                }, 
                set(value) { return val = value }
            })
        }
        return object
    }


    const EventTarget = window.__proto__.__proto__.__proto__
    const addEventListener = EventTarget.addEventListener
    EventTarget.addEventListener = function (eventName, callback) {
        addEventListener.call(this, eventName, e => {
            const mockedObject = propertyObserver(e, 'srcElement', console.log)
            callback(mockedObject)
        })
    }
}()