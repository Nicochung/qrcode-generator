
export abstract class OutputStream {
  constructor() {}
  public abstract writeByte(b : number) : void;
  public writeBytes(bytes : number[]) : void {
    for (let i = 0; i < bytes.length; i += 1) {
      this.writeByte(bytes[i]);
    }
  }
  public flush() : void {
  }
  public close() : void {
    this.flush();
  }
}
