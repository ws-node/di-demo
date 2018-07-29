import { getDependencies, getClassPropertyKeys } from "../../reflect";
import { DIContainer, DIContainerEntry } from "../base";
import { InjectToken, Implement, InjectScope, ImplementFactory } from "../../declares";

export class SetterDI extends DIContainer {

  private propertyDependencyMap = new Map<any, { [key: string]: InjectToken }>();

  public add<K, V>(token: InjectToken<K>, imp: Implement<V>, scope: InjectScope) {
    const { prototype } = <any>imp;
    this.set(token, {
      token,
      imp,
      scope,
      depts: this.resolveRelations(prototype || {})
    });
  }

  private resolveRelations(imp_proto: any) {
    return getClassPropertyKeys(imp_proto).map(key => {
      const dept = getDependencies(imp_proto, key)[0];
      const relation = this.propertyDependencyMap.get(imp_proto);
      if (!relation) {
        this.propertyDependencyMap.set(imp_proto, { [key]: dept });
      } else {
        relation[key] = dept;
      }
      return dept;
    });
  }

  public createFactory<T>(item: DIContainerEntry<T>) {
    const { imp, scope, depts } = item;
    if (!item.fac) {
      const { prototype } = <any>imp;
      item.fac = () => {
        const instance = new (imp)();
        const relation = this.propertyDependencyMap.get(prototype);
        if (relation) {
          Object.keys(relation).forEach(key => {
            const dept = relation[key];
            if (typeof instance[key] === "function") {
              instance[key](this.get(dept));
            } else {
              instance[key] = this.get(dept);
            }
          });
        }
        if (prototype && prototype["onInit"] && typeof instance["onInit"] === "function") {
          instance["onInit"]();
        }
        return instance;
      };
    }
    return item.fac;
  }

}

export const sdi = new SetterDI();
