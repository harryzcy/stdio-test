import { Stream } from "./stream";

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


export { ConsoleStream, withConsoleLog };
