import { getDependencies } from "../../reflect";
import { DIContainer } from "../base";
import { InjectToken, Implement, InjectScope } from "../../declares";

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

export const cdi = new ConstructorDI();
