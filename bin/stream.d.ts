/**
 * defines an output stream
 */
interface Stream {
    calledTimes: number;
    buffers: Array<string>;
    lines: Array<string>;
    push(buffer: string): number;
}
export { Stream };
