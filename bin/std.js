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
exports.withStdoutWrite = exports.StdStream = void 0;
/**
 * Implements Stream for stdout and stderr
 */
class StdStream {
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
        if (__classPrivateFieldGet(this, _buffers).length == 0) {
            // return empty array
            return new Array();
        }
        let str = __classPrivateFieldGet(this, _buffers).join("");
        if (str.endsWith("\n")) {
            str = str.slice(0, -1);
        }
        return str.split("\n");
    }
    push(buffer) {
        __classPrivateFieldSet(this, _calledNum, +__classPrivateFieldGet(this, _calledNum) + 1);
        return __classPrivateFieldGet(this, _buffers).push(buffer);
    }
}
exports.StdStream = StdStream;
_calledNum = new WeakMap(), _buffers = new WeakMap();
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
//# sourceMappingURL=std.js.map