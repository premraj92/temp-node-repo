// Events are a CORE building block of the "Event Driven Architecture" of node
// Much of the Node.js core API is built around an idiomatic asynchronous event-driven
// architecture in which certain kinds of objects (called "emitters")
// emit named events that cause Function objects ("listeners") to be called.
// ALL Objects in Node that emit events are instances of the EventEmitter class
// These objects expose an eventEmitter.on() function
// that allows one or more functions to be attached to
// named events emitted by the object.

// EventEmitter below is a class provided by Node's built in "events" Module
// And we can use this EventEmitter class in two ways
// Create a Custom Event Emitter class by Extending EventEmitter
// Create a object/instance of EventEmitter

const EventEmitter = require("events");

// this EventEmitter instance/object provides 2 main methods a event listener => on() && a method to emit event => emit()
const eventEmitter = new EventEmitter();

// You can have any number of listeners for a single event
eventEmitter.on("request", (userName, userAge, userVitals) => {
  console.log(`New Request has been received from ${userName} who is ${userAge} old, his Blood Pressure is ${userVitals.bp}`);
});

eventEmitter.on("request", () => {
  console.log(`New Request has been received`);
});

eventEmitter.on("request", () => {
  console.log(`New Request has been received`);
});

// Event EMITTED
// the first argument should always be the eventName
// You also can pass any number of arguments after eventName && they can be accessed in 
// the same order in the listener callback
eventEmitter.emit("request", "sathish", '100', {bp: '120 / 80', heartbeat: 90});

// You always have to register a listener before you emit the event
// So the eventListener below in the next line won't be triggered as its registered after the event is emitted
// Its like trying to board your flight/train/bus after its left
eventEmitter.on("request", () => {
  console.log(`New Request has been received, BUT you won't see me - becoz 
    this stupid guy is TRYing to catch a TRAIN after its left the station`);
});

// this listenerCount returns the number of events of a particular type/name - in this case "request"
const listenersCount = eventEmitter.listenerCount("request");
console.log(`No of Listeners for event type 'request' : `, listenersCount);
