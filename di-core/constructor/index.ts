import { InjectSystemBase } from "../base";
import { di as container } from "./di";

export class ConstructorInjectSystem extends InjectSystemBase {

  protected di = container;

  public run() {
    this.di.complete();
    console.log(this.di.getConfig());
  }

}