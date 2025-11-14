import { EventEmitter } from "tseep";

class EventEmitterSingleton {
  constructor() {
    if (EventEmitterSingleton.instance) {
      return EventEmitterSingleton.instance;
    }

    this.emitter = new EventEmitter();
    EventEmitterSingleton.instance = this;
  }

  emit(event, data) {
    this.emitter.emit(event, data);
  }

  on(event, callback) {
    this.emitter.on(event, callback);
  }

  off(event, callback) {
    this.emitter.off(event, callback);
  }
}

const emitter = new EventEmitterSingleton();
Object.freeze(emitter);

export default emitter;
