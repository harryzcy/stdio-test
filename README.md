# Standard IO Test

A Node.js library that mocks console and stdout for testing.

## Get Started

```
npm install --save-dev stdio-test
```

## Example Usage

Mock `console.log`
```javascript
const withConsoleLog = require("stdio-test").withConsoleLog;
const stream = withConsoleLog(() => {
    process.stdout.write("some data");
});
// use stream.buffers to get buffers
```

Mock `process.stdout.write`

```javascript
const withStdoutWrite = require("stdio-test").withStdoutWrite;
const stream = withStdoutWrite(() => {
    process.stdout.write("some data");
});
// use stream.lines to get buffers by line
```
