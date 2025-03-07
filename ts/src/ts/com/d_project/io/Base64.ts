import { Base64DecodeInputStream } from "./Base64DecodeInputStream";
import { Base64EncodeOutputStream } from "./Base64EncodeOutputStream";
import { ByteArrayInputStream } from "./ByteArrayInputStream";
import { ByteArrayOutputStream } from "./ByteArrayOutputStream";

export class Base64 {
  constructor() {
    throw "error";
  }

  public static encode(data: number[]): number[] {
    const bout = new ByteArrayOutputStream();
    try {
      const ostream = new Base64EncodeOutputStream(bout);
      try {
        ostream.writeBytes(data);
      } finally {
        ostream.close();
      }
    } finally {
      bout.close();
    }
    return bout.toByteArray();
  }

  public static decode(data: number[]): number[] {
    const bout = new ByteArrayOutputStream();
    try {
      let istream = new Base64DecodeInputStream(new ByteArrayInputStream(data));
      try {
        let b: number;
        while ((b = istream.readByte()) != -1) {
          bout.writeByte(b);
        }
      } finally {
        istream.close();
      }
    } finally {
      bout.close();
    }
    return bout.toByteArray();
  }
}
