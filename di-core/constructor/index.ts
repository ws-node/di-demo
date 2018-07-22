import { InjectSystemBase } from "../base";
import { cdi } from "./di";
import { InjectToken } from "../../declares";

export class ConstructorInjectSystem extends InjectSystemBase {

  protected di = cdi;

  public get<T>(token: InjectToken<T>) {
    return this.di.get(token);
  }

  public run() {
    this.di.complete();
    console.log(this.di.getConfig());
  }

}
