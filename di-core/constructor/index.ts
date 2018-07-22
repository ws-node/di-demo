import { InjectSystemBase } from "../base";
import { cdi } from "./di";

export class ConstructorInjectSystem extends InjectSystemBase {

  protected di = cdi;

  public run() {
    this.di.complete();
    console.log(this.di.getConfig());
  }

}
