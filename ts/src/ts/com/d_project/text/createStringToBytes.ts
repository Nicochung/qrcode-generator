import { Base64DecodeInputStream, ByteArrayInputStream } from "../io";

export function createStringToBytes(
  unicodeData: string,
  numChars: number
): (s: string) => number[] {
  function toBytes(s: string): number[] {
    let bytes: number[] = [];
    for (let i = 0; i < s.length; i += 1) {
      bytes.push(s.charCodeAt(i));
    }
    return bytes;
  }
  // create conversion map.
  let unicodeMap = (function () {
    let bin = new Base64DecodeInputStream(
      new ByteArrayInputStream(toBytes(unicodeData))
    );
    let read = function () {
      let b = bin.readByte();
      if (b == -1) throw "eof";
      return b;
    };
    let count = 0;
    let unicodeMap: { [ch: string]: number } = {};
    while (true) {
      let b0 = bin.readByte();
      if (b0 == -1) break;
      let b1 = read();
      let b2 = read();
      let b3 = read();
      let k = String.fromCharCode((b0 << 8) | b1);
      let v = (b2 << 8) | b3;
      unicodeMap[k] = v;
      count += 1;
    }
    if (count != numChars) {
      throw count + "!=" + numChars;
    }
    return unicodeMap;
  })();

  let unknownChar = "?".charCodeAt(0);

  return function (s: string): number[] {
    let bytes: number[] = [];
    for (let i = 0; i < s.length; i += 1) {
      let c = s.charCodeAt(i);
      if (c < 128) {
        bytes.push(c);
      } else {
        let b = unicodeMap[s.charAt(i)];
        if (typeof b == "number") {
          if ((b & 0xff) == b) {
            // 1byte
            bytes.push(b);
          } else {
            // 2bytes
            bytes.push(b >>> 8);
            bytes.push(b & 0xff);
          }
        } else {
          bytes.push(unknownChar);
        }
      }
    }
    return bytes;
  };
}
