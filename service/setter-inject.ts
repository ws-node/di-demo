import { Inject } from "../di-core/setter/decorator";
import { OnInit } from "../di-core/setter/lifecycle";
import { createUUID, setColor } from "../utils";

export class SetterService0x01 {

  private id = createUUID();

  public showMessage() {
    return `service-setter-01 : [ ${setColor("green", this.id)} ]`;
  }

}

export class SetterService0x02 {

  private id = createUUID();

  public showMessage() {
    return `service-setter-02 : [ ${setColor("cyan", this.id)} ]`;
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

  private id = createUUID();

  onInit(): void {
    // console.log(this._demo01);
  }

  public showMessage() {
    console.log(`servoce00: ${setColor("red", this.id)}\nservice01 : ${this._demo01.showMessage()}\nservice02 : ${this._demo02.showMessage()}`);
  }

}