class Action {
    static add(tag, callback, priority = 10) {
        if (!this[tag]){
            this[tag] = [];
        }
        this[tag][this.getPriority(tag, parseInt(priority))] = callback;
    }
    static remove(tag, priority = false) {
        if (priority) {
            delete this[tag][priority];
        } else {
            this[tag] = [];
        }
        
    }
    
    static clear() {
        for(let tag in this) {
            
            if (Array.isArray(this[tag])) {
                this[tag] = [];
            }
        }
    }
    static getPriority(tag, priority) {
        if (typeof this[tag][priority] !== 'undefined') {
            return this.getPriority(tag, priority + 1);
        }
        
        return priority;
    }
    static run() {
        let args = Object.values(arguments),
                tag = args.shift();
        for (let i in this[tag]) {
            if(typeof this[tag][i] === 'function') {
                this[tag][i].apply(this, args);
            } else if (typeof this[tag][i] === 'string') {
                window[this[tag][i]].apply(this, args);
            }
        }
        
    }
};
 
export default Action;