class Stream {
    #calledNum: number;
    #buffers: Array<string>;

    constructor() {
        this.#calledNum = 0;
        this.#buffers = [];
    }

    push(buffer: string): number {
        this.#calledNum++;
        return this.#buffers.push(buffer);
    }

    calledTimes(): number {
        return this.#calledNum;
    }

    buffers(): Array<string> {
        return this.#buffers;
    }

    lines(): Array<string> {
        if (this.#buffers.length == 0) {
            // return empty array
            return new Array<string>();
        }
        let str = this.#buffers.join("");
        if (str.endsWith("\n")) {
            str = str.slice(0, -1);
        }
        return str.split("\n");
    }
}

function withStdoutWrite(fn: () => void): Stream {
    const s = new Stream();
    const originalWrite = process.stdout.write;
    process.stdout.write = (buffer: string) => {
        s.push(buffer);
        return true;
    };

    fn();
    
    process.stdout.write = originalWrite;
    return s;
}

export { Stream, withStdoutWrite };
