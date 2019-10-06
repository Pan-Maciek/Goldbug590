!function () {
    function mockEventObject() {

    }

    const EventTarget = window.__proto__.__proto__.__proto__
    const addEventListener = EventTarget.addEventListener
    EventTarget.addEventListener = function (eventName, callback) {
        addEventListener.call(this, eventName, e => {
            const mockObject = mockEventObject(e)
            callback(callback)
        })
    }
}()