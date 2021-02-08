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
var _calledNum, _buffers;
Object.defineProperty(exports, "__esModule", { value: true });
exports.withConsoleLog = exports.ConsoleStream = void 0;
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
//# sourceMappingURL=console.js.map