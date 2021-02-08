/**
 * defines an output stream
 */
interface Stream {
    calledTimes: number;
    buffers: Array<string>;
    lines: Array<string>;

    push(buffer: string): number;
}

/** 
 * Implements Stream for console methods
 */
class ConsoleStream implements Stream {
    #calledNum: number;
    #buffers: Array<string>;

    constructor() {
        this.#calledNum = 0;
        this.#buffers = [];
    }

    get calledTimes(): number {
        return this.#calledNum;
    }

    get buffers(): Array<string> {
        return this.#buffers;
    }

    get lines(): Array<string> {
        return this.buffers;
    }

    push(buffer: string): number {
        this.#calledNum++;
        return this.#buffers.push(buffer);
    }
}

/** 
 * Implements Stream for stdout and stderr
 */
class StdStream implements Stream {
    #calledNum: number;
    #buffers: Array<string>;

    constructor() {
        this.#calledNum = 0;
        this.#buffers = [];
    }

    get calledTimes(): number {
        return this.#calledNum;
    }

    get buffers(): Array<string> {
        return this.#buffers;
    }

    get lines(): Array<string> {
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

    push(buffer: string): number {
        this.#calledNum++;
        return this.#buffers.push(buffer);
    }
}

/**
 * Mock console.log method
 * @param fn function to be wrapped
 */
function withConsoleLog(fn: () => void): ConsoleStream {
    const s = new ConsoleStream();
    const originalWrite = console.log;
    console.log = (buffer: string) => {
        s.push(buffer);
    };

    fn();

    console.log = originalWrite;
    return s;
}

/**
 * Mock stdout.write method 
 * @param fn function to be wrapped
 */
function withStdoutWrite(fn: () => void): StdStream {
    const s = new StdStream();
    const originalWrite = process.stdout.write;
    process.stdout.write = (buffer: string) => {
        s.push(buffer);
        return true;
    };

    fn();

    process.stdout.write = originalWrite;
    return s;
}

export { Stream, ConsoleStream, StdStream, withConsoleLog, withStdoutWrite };
