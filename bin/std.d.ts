import { Stream } from "./stream";
/**
 * Implements Stream for stdout and stderr
 */
declare class StdStream implements Stream {
    #private;
    constructor();
    get calledTimes(): number;
    get buffers(): Array<string>;
    get lines(): Array<string>;
    push(buffer: string): number;
}
/**
 * Mock stdout.write method
 * @param fn function to be wrapped
 */
declare function withStdoutWrite(fn: () => void): StdStream;
export { StdStream, withStdoutWrite };
