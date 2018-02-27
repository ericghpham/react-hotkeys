import Mousetrap from 'mousetrap';

const reject = (list, test) =>
  list.reduce(
    (memo, item, index) => test(item, index) ? memo : (memo.push(item), memo),
    []
  )

const noop = () => {}

class Manager extends Mousetrap {
  constructor(element = document.body) {
    super(element);
    this.keys = new Map();
  }

  bindKeys(keys, callback) {
    for (const key of keys) {
      this.bind(key, callback);
    }
  }

  unbindKeys(keys, callback) {
    for (const key of keys) {
      this.unbind(key, callback);
    }
  }

  bind(key, callback) {
    let bindings = this.unbind(key, callback);
    bindings.push(callback);
    this.keys.set(key, bindings);
    super.bind(key, callback);
    return bindings;
  }

  unbind(key, callback) {
    let bindings = this.keys.get(key) || [];
    bindings = reject(bindings, fn => fn === callback);
    this.keys.set(key, bindings);
    super.bind(key, bindings[bindings.length - 1] || noop)
    return bindings;
  }
}

const manager = new Manager();
export default manager;
export {
  Manager
}