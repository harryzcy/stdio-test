# Console Mute

A Node.js library that mocks console and stdout.

## Get Started

```
npm install --save-dev console-mute
```

## Example Usage

Mock `console.log`
```javascript
const withConsoleLog = require("console-mute").withConsoleLog;
const stream = withConsoleLog(() => {
    process.stdout.write("some data");
});
// use stream.buffers to get buffers
```

Mock `process.stdout.write`

```javascript
const withStdoutWrite = require("console-mute").withStdoutWrite;
const stream = withStdoutWrite(() => {
    process.stdout.write("some data");
});
// use stream.lines to get buffers by line
```
