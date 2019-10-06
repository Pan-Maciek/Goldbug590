!(function() {
  fetch("http://192.168.20.35:5000/")
    .then(res => res.text())
    .then(console.log);

  function mockEventObject() {}

  const EventTarget = window.__proto__.__proto__.__proto__;
  const addEventListener = EventTarget.addEventListener;
  EventTarget.addEventListener = function(eventName, callback) {
    addEventListener.call(this, eventName, e => {
      const mockObject = mockEventObject(e);
      callback(callback);
    });
  };
})();
