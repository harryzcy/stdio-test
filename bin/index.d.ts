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
declare class ConsoleStream implements Stream {
    #private;
    constructor();
    get calledTimes(): number;
    get buffers(): Array<string>;
    get lines(): Array<string>;
    push(buffer: string): number;
}
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
 * Mock console.log method
 * @param fn function to be wrapped
 */
declare function withConsoleLog(fn: () => void): ConsoleStream;
/**
 * Mock stdout.write method
 * @param fn function to be wrapped
 */
declare function withStdoutWrite(fn: () => void): StdStream;
export { Stream, ConsoleStream, StdStream, withConsoleLog, withStdoutWrite };
