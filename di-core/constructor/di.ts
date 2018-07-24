import { getDependencies } from "../../reflect";
import { DIContainer } from "../base";
import { InjectToken, Implement, InjectScope } from "../../declares";

export class ConstructorDI extends DIContainer {

  public add<K, V>(token: InjectToken<K>, imp: Implement<V>, scope: InjectScope) {
    this.set(token, {
      token,
      imp,
      scope,
      depts: getDependencies(imp)
    });
  }

}

export const cdi = new ConstructorDI();
