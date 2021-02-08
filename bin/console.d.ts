import { Stream } from "./stream";
/**
 * Implements Stream for console methods
 */
declare class ConsoleStream implements Stream {
    #private;
    constructor();
    get calledTimes(): number;
    get buffers(): Array<string>;
    get lines(): Array<string>;
    push(buffer: string): number;
}
/**
 * Mock console.log method
 * @param fn function to be wrapped
 */
declare function withConsoleLog(fn: () => void): ConsoleStream;
export { ConsoleStream, withConsoleLog };
