!(function () {
  // fetch("http://192.168.20.35:5000/")
  //   .then(res => res.text())
  //   .then(console.log)

  function propertyObserver(object, property, getCallback) {
    if (!Object.getOwnPropertyDescriptor(object, property)) {
      let val = object[property]
      Object.defineProperty(object, property, {
        get() {
          let tmp = getCallback(val, property)
          if (tmp) return tmp
          return val
        },
        set(value) {
          return (val = value)
        }
      })
    }
    return object
  }

  const EventTarget = window.__proto__.__proto__.__proto__
  const addEventListener = EventTarget.addEventListener
  const getAttribute = Element.prototype.getAttribute
  const [, domainName] = location.href.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/i)

  Element.prototype.getAttribute = function (attrName) {
    const attr = getAttribute.call(this, attrName)
    if (attrName.includes("href") && attr !== null) {
      const [, hrefDomainName] = attr.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/i) || []
      // console.log(hrefDomainName, domainName)
      if (hrefDomainName !== domainName) console.log(attrName, attr)
    }
    return attr
  }
  // EventTarget.addEventListener = function (eventName, callback) {
  //     addEventListener.call(this, eventName, e => {
  //         const mockedObject = propertyObserver(e, 'srcElement', console.log)
  //         callback(mockedObject)
  //     })
  // }
})()
