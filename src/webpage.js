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
function defineFakeProp(target, property, value) {
  Object.defineProperty(target, property, {
    get() { return value }
  })
}

function fakeMouseEvent(e) {
  const proxy = new Proxy(e, {
    get(target, key) {
      if (typeof target[key] === 'number') return 0
      else return target[key]
    }
  })
  return proxy
}

const addEventListener = EventTarget.prototype.addEventListener
EventTarget.prototype.addEventListener = function (...args) {
  const [eventName, callback] = args
  const mouseEvents = ['click', 'mousedown', 'mouseover', 'contextmenu']
  if (mouseEvents.includes(eventName)) {
    addEventListener.call(this, eventName, function (e) {
      if (settings.mouse) e = fakeMouseEvent(e)
      callback.call(this, e)
    })
  }
  else addEventListener.call(this, ...args)
}

const getAttribute = Element.prototype.getAttribute
const [, domainName] = location.href.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/i)
Element.prototype.getAttribute = function (attrName) {
  const attr = getAttribute.call(this, attrName)
  if (attrName.includes("href") && attr !== null) {
    const [, hrefDomainName] = attr.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/i) || []
    if (hrefDomainName !== domainName) {
      console.log(attrName, attr)
    }
  }
  if (settings.links) return null
  return attr
}

console.log(settings)