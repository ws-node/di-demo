import { getDependencies } from "../../reflect";
import { DIContainer } from "../base";
import { InjectToken, Implement, InjectScope, ImplementFactory } from "../../declares";
import { DIContainerEntry } from "../di-base";

export class ConstructorDI extends DIContainer {

  public add<K, V>(token: InjectToken<K>, imp: Implement<V>, scope: InjectScope) {
    this.set(token, {
      token,
      imp,
      scope,
      depts: getDependencies(imp)
    });
  }

  public createFactory<T>(item: DIContainerEntry<T>) {
    const { token, imp, scope, depts } = item;
    if (!item.fac) {
      item.fac = () => new (imp)(...this.getDepedencies(depts));
    }
    return item.fac;
  }

}

export const cdi = new ConstructorDI();
