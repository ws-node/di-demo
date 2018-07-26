import { getDependencies, getClassPropertyKeys } from "../../reflect";
import { DIContainer } from "../base";
import { InjectToken, Implement, InjectScope } from "../../declares";

export class SetterDI extends DIContainer {

  public add<K, V>(token: InjectToken<K>, imp: Implement<V>, scope: InjectScope) {
    const { prototype } = <any>imp;
    console.log(Reflect.getMetadata("design:paramtypes", prototype));
    console.log(prototype);
    this.set(token, {
      token,
      imp,
      scope,
      depts: getClassPropertyKeys(prototype).map(key => {
        console.log(key);
        return getDependencies(prototype, key)[0];
      }).filter(i => !!i)
    });
  }

}

export const sdi = new SetterDI();
