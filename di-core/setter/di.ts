import { getDependencies, getClassPropertyKeys } from "../../reflect";
import { DIContainer, DIContainerEntry } from "../base";
import { InjectToken, Implement, InjectScope, ImplementFactory } from "../../declares";

export class SetterDI extends DIContainer {

  public add<K, V>(token: InjectToken<K>, imp: Implement<V>, scope: InjectScope) {
    const { prototype } = <any>imp;
    this.set(token, {
      token,
      imp,
      scope,
      depts: getClassPropertyKeys(prototype).map(key => getDependencies(prototype, key)[0])
    });
  }

  public createFactory<T>(item: DIContainerEntry<T>) {
    const { imp, scope, depts } = item;
    if (!item.fac) {
      const { prototype } = <any>imp;
      item.fac = () => {
        const instance = new (imp)();
        getClassPropertyKeys(prototype).forEach((key, index) => {
          if (typeof instance[key] === "function") {
            instance[key](this.get(depts[index]));
          } else {
            instance[key] = this.get(depts[index]);
          }
        });
        if (prototype && prototype["onInit"]) {
          instance["onInit"]();
        }
        return instance;
      };
    }
    return item.fac;
  }

}

export const sdi = new SetterDI();
