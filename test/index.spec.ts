import { expect } from "chai";
import { Stream, withStdoutWrite } from "../src/index";

describe("Stream", () => {
  describe("#push()", () => {
    it("should return the new length", () => {
      const s = new Stream();
      const one = s.push("first");
      expect(one).to.eq(1);
      const two = s.push("first");
      expect(two).to.eq(2);
    });
  });

  describe("#calledTimes()", () => {
    it("initial called times should be zero", () => {
      const s = new Stream();
      expect(s.calledTimes()).to.eq(0);
    });

    it("should return called times", () => {
      const times = [1, 3, 5];
      times.forEach(num => {
        const s = new Stream();
        for (let j = 0; j < num; j++) {
          s.push("test");
        }
        expect(s.calledTimes()).to.eq(num);
      });
    });
  });

  describe("#buffers()", () => {
    it("should return empty array when push() not called", () => {
      const s = new Stream();
      const buffers = s.buffers();
      expect(buffers).to.be.instanceof(Array);
      expect(buffers).to.have.length(0);
    });

    it("should return all buffers", () => {
      const s = new Stream();
      s.push("first");
      s.push("second");
      const buffers = s.buffers();
      expect(buffers).to.be.instanceof(Array);
      expect(buffers).to.have.length(2);
      expect(buffers).to.be.deep.eq(["first", "second"]);
    });
  });

  describe("#lines()", () => {
    it("should return empty array when push() not called", () => {
      const s = new Stream();
      const lines = s.lines();
      expect(lines).to.be.instanceof(Array);
      expect(lines).to.have.length(0);
    });

    it("should return one line when push() was called once", () => {
      const s = new Stream();
      s.push("test");
      const lines = s.lines();
      expect(lines).to.be.instanceof(Array);
      expect(lines).to.have.length(1);
      expect(lines).to.be.deep.eq(["test"]);
    });

    it("should return one line when no line break was given", () => {
      const s = new Stream();
      s.push("test");
      s.push("-test2");
      const lines = s.lines();
      expect(lines).to.be.instanceof(Array);
      expect(lines).to.have.length(1);
      expect(lines).to.be.deep.eq(["test-test2"]);
    });

    it("should trim new line at the end", () => {
      const s = new Stream();
      s.push("test\n");
      const lines = s.lines();
      expect(lines).to.be.instanceof(Array);
      expect(lines).to.have.length(1);
      expect(lines).to.be.deep.eq(["test"]);
    });

    it("should return all lines", () => {
      const s = new Stream();
      s.push("first-");
      s.push("first2\n");
      s.push("second");
      const lines = s.lines();
      expect(lines).to.be.instanceof(Array);
      expect(lines).to.have.length(2);
      expect(lines).to.be.deep.eq(["first-first2", "second"]);
    });

    it("should trim new line at the end for multiline output", () => {
      const s = new Stream();
      s.push("first-");
      s.push("first2\n");
      s.push("second\n");
      const lines = s.lines();
      expect(lines).to.be.instanceof(Array);
      expect(lines).to.have.length(2);
      expect(lines).to.be.deep.eq(["first-first2", "second"]);
    });
  });
});

describe("#withStdoutWrite()", () => {
  it("should return Stream", () => {
    const s = withStdoutWrite(() => { return; });
    expect(s).to.be.instanceOf(Stream);
  });

  it("should mute and capture stdout", () => {
    const s = withStdoutWrite(() => { 
      process.stdout.write("test");
     });
    expect(s).to.be.instanceOf(Stream);
    expect(s.buffers()).to.be.length(1);
    expect(s.buffers()).to.be.deep.eq(["test"]);
  });
});

