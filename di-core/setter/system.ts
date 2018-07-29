import { InjectSystemBase } from "../base";
import { sdi } from "./di";
import { InjectToken } from "../../declares";

export class SetterInjectSystem extends InjectSystemBase {

  protected di = sdi;

  public get<T>(token: InjectToken<T>, scopeId?: string) {
    return !scopeId ?
      this.di.get(token) :
      this.di.getScopeInstance(token, scopeId);
  }

  public run() {
    this.di.complete();
    console.log(this.di.getConfig());
  }

}
