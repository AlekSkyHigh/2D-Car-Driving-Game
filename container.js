import Action from './utils/action.js';

class Container {

    constructor(options = {}, toPrototype = false) {
        if (toPrototype) {
            Object.assign(Container.prototype, options);
        } else {
            Object.assign(this, options);
        }
        return this;
    }
    
    $on(tag, callback, placement = 0) {
        Action.add(tag, callback, placement);
    }

    $emit(...args) {
        Action.run.apply(Action, args);
    }

    $off(tag) {
        Action.remove(tag);
    }
    
    $hasEvent(tag) {
        return Array.isArray(Action[tag]) && Action[tag].length > 0;
    }

    $listen(events) {
        this.__events = [];
        for (let name in events) {
            if (!Array.isArray(events[name])) {
                continue;
            }
            for (let i in events[name]) {
                let method = `${name}_${events[name][i]}`;
                if (typeof this[method] === 'function') {
                    this.$on(method, this[method].bind(this));
                }
                this.__events.push(method);
            }
        }
    }
    
    $clear() {
        Action.clear();
    }

    $set(name, value) {
        Container.prototype[name] = value;
    }
}

export default Container;