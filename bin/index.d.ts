declare class Stream {
    #private;
    constructor();
    push(buffer: string): number;
    calledTimes(): number;
    buffers(): Array<string>;
    lines(): Array<string>;
}
declare function withStdoutWrite(fn: () => void): Stream;
export { Stream, withStdoutWrite };
