import { DIContainer } from "../base";
import { InjectScope, InjectToken, Implement } from "../../declares";
import { getDependencies } from "../../reflect";

export class ConstructorDI extends DIContainer {

  public dependencyResolver = getDependencies;

  public add<K, V>(token: InjectToken<K>, imp: Implement<V>, scope: InjectScope) {
    console.log(token);
    console.log(getDependencies(token));
    this.set(token, {
      token,
      imp,
      scope,
      depts: getDependencies(token)
    });
  }

}

export const di = new ConstructorDI();
