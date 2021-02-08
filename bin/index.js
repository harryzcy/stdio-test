"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _calledNum, _buffers, _calledNum_1, _buffers_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.withStdoutWrite = exports.withConsoleLog = exports.StdStream = exports.ConsoleStream = void 0;
/**
 * Implements Stream for console methods
 */
class ConsoleStream {
    constructor() {
        _calledNum.set(this, void 0);
        _buffers.set(this, void 0);
        __classPrivateFieldSet(this, _calledNum, 0);
        __classPrivateFieldSet(this, _buffers, []);
    }
    get calledTimes() {
        return __classPrivateFieldGet(this, _calledNum);
    }
    get buffers() {
        return __classPrivateFieldGet(this, _buffers);
    }
    get lines() {
        return this.buffers;
    }
    push(buffer) {
        __classPrivateFieldSet(this, _calledNum, +__classPrivateFieldGet(this, _calledNum) + 1);
        return __classPrivateFieldGet(this, _buffers).push(buffer);
    }
}
exports.ConsoleStream = ConsoleStream;
_calledNum = new WeakMap(), _buffers = new WeakMap();
/**
 * Implements Stream for stdout and stderr
 */
class StdStream {
    constructor() {
        _calledNum_1.set(this, void 0);
        _buffers_1.set(this, void 0);
        __classPrivateFieldSet(this, _calledNum_1, 0);
        __classPrivateFieldSet(this, _buffers_1, []);
    }
    get calledTimes() {
        return __classPrivateFieldGet(this, _calledNum_1);
    }
    get buffers() {
        return __classPrivateFieldGet(this, _buffers_1);
    }
    get lines() {
        if (__classPrivateFieldGet(this, _buffers_1).length == 0) {
            // return empty array
            return new Array();
        }
        let str = __classPrivateFieldGet(this, _buffers_1).join("");
        if (str.endsWith("\n")) {
            str = str.slice(0, -1);
        }
        return str.split("\n");
    }
    push(buffer) {
        __classPrivateFieldSet(this, _calledNum_1, +__classPrivateFieldGet(this, _calledNum_1) + 1);
        return __classPrivateFieldGet(this, _buffers_1).push(buffer);
    }
}
exports.StdStream = StdStream;
_calledNum_1 = new WeakMap(), _buffers_1 = new WeakMap();
/**
 * Mock console.log method
 * @param fn function to be wrapped
 */
function withConsoleLog(fn) {
    const s = new ConsoleStream();
    const originalWrite = console.log;
    console.log = (buffer) => {
        s.push(buffer);
    };
    fn();
    console.log = originalWrite;
    return s;
}
exports.withConsoleLog = withConsoleLog;
/**
 * Mock stdout.write method
 * @param fn function to be wrapped
 */
function withStdoutWrite(fn) {
    const s = new StdStream();
    const originalWrite = process.stdout.write;
    process.stdout.write = (buffer) => {
        s.push(buffer);
        return true;
    };
    fn();
    process.stdout.write = originalWrite;
    return s;
}
exports.withStdoutWrite = withStdoutWrite;
//# sourceMappingURL=index.js.map