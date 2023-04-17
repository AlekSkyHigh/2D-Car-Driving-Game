import { fixed } from "./math";

class Matrix {

    constructor(options) {
        this.width = 100;
        this.height = 100;
        this.rows = 5;
        this.columns = 5;
        this.slots = {};
        Object.assign(this, options);
        this.count = this.rows * this.columns;
        if (!this.offset) {
            this.offset = {
                x: 0,
                y: 0
            };
        }
        
        this.width -= this.offset.x * 2;
        this.height -= this.offset.y * 2;
        this.generateSlots();
        return this;
    }

    generateSlots() {
        const {rows, columns, width, height, offset} = this;
        const cellWidth = fixed(width / columns, 2);
        const cellHeight = fixed(height / rows, 2);
        
        for (let x = 0; x < rows; x++) {
            if (!this.slots[x]) {
                this.slots[x] = {};
            }
            
            for (let y = 0; y < columns; y++) {
                this.slots[x][y] = {
                    x, y,
                    ax: offset.x + fixed(y * cellWidth, 2), ay: offset.y + fixed(x * cellHeight, 2),
                    bx: offset.x + fixed((y + 1) * cellWidth, 2), by: offset.y + fixed(x * cellHeight, 2),
                    cx: offset.x + fixed(y * cellWidth, 2), cy: offset.y + fixed((x + 1) * cellHeight, 2),
                    dx: offset.x + fixed((y + 1) * cellWidth, 2), dy: offset.y + fixed((x + 1) * cellHeight, 2),
                    width: cellWidth,
                    height: cellHeight,
                    available: true,
                    locked: false
                };
                
                const { ax, ay } = this.slots[x][y];
            }
        }
    }

    bookSlot(x, y = null) {
        if (!y) {
            x = x % this.columns;
            y = Math.floor(x / this.columns);
        }

        if (this.slots[x][y]) {
            this.slots[x][y].available = false;
        }

        return this;
    }

    releaseSlot(x, y = null) {
        if (!y) {
            x = x % this.columns;
            y = Math.floor(x / this.columns);
        }
        if (this.slots[x][y]) {
            this.slots[x][y].available = true;
        }

        return this;
    }

    eachSlot(callback) {
        const {slots} = this;
        for (let x in slots) {
            for (let y in slots[x]) {
                callback(slots[x][y], x, y);
            }
        }
    }

    eachEdgeSlot(callback) {
        const {slots, rows, columns} = this;
        const [lastX, lastY] = [rows - 1, columns - 1];
        for (let x = 0; x < rows; x++) {
            callback(slots[x][0]);
        }
        
        for (let y = 1; y < columns; y++) {
            callback(slots[rows-1][y]);
        }

        for (let x = lastX-1; x >= 0; x--) {
            callback(slots[x][columns-1]);
        }

        for (let y = lastY-1; y > 0; y--) {
            callback(slots[0][y]);
        }
    }

    firstSlot(callback) {
        const {slots} = this;
        let result;

        for (let x in slots) {
            for (let y in slots[x]) {
                result = callback(slots[x][y]);
                if (true === result) {
                    return slots[x][y];
                }
            }
        }

        return null;
    }

    findSlotByPoint(point) {

    }
    
    countAvailableSlots() {
        let freeSlots = 0;
        this.eachSlot(({available, locked}) => {
            freeSlots += Number(true === available && false === locked);
        });
        return freeSlots;
    }
    
    getDefaultSlotSize() {
        const { width, height } = this.slots[0][0];
        return { width, height };
    }

}

export default Matrix;