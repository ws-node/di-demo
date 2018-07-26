import { InjectSystemBase } from "../base";
import { sdi } from "./di";
import { InjectToken } from "../../declares";

export class SetterInjectSystem extends InjectSystemBase {

  protected di = sdi;

  public get<T>(token: InjectToken<T>) {
    return this.di.get(token);
  }

  public run() {
    this.di.complete();
    console.log(this.di.getConfig());
  }

}
