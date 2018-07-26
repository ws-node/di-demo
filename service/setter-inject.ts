import { Inject } from "../di-core/setter/decorator";
import { OnInit } from "../di-core/setter/lifecycle";

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

export class SetterService01 implements OnInit {

  private _demo01!: SetterService0x01;

  @Inject()
  private set "#$^#@$^#^"(value: SetterService0x01) { this._demo01 = value; }

  private _demo02!: SetterService0x02;

  @Inject()
  private "$%@$%@$%@$"(value: SetterService0x02) {
    this._demo02 = value;
  }

  onInit(): void {
    console.log(this._demo01);
  }

  public showMessage() {
    console.log(`service01 : ${this._demo01.showMessage()} ; service02 : ${this._demo02.showMessage()}`);
  }

}