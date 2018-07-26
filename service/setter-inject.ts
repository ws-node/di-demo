import { Inject } from "../di-core/setter/decorator";

export class SetterService0x01 {
  public showMessage() {
    return "service-setter-01";
  }
}

export class SetterService0x02 {
  public showMessage() {
    return "service-setter-02";
  }
}

export class SetterService01 {

  private _demo01!: SetterService0x01;

  @Inject()
  private set "@demo01"(value: SetterService0x01) { this._demo01 = value; }

  private _demo02!: SetterService0x02;

  @Inject()
  private "@setDemo02"(value: SetterService0x02) {
    this._demo02 = value;
  }

  public showMessage() {
    console.log(`service01 : ${this._demo01.showMessage()} ; service02 : ${this._demo02.showMessage()}`);
  }

}