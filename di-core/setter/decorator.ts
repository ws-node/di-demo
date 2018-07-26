import { INJECT_META_KEY, getClassPropertyKeys } from "../../reflect";

export function Inject() {
  return function <T>(target: T, propertyKey: string) {
    const setters = getClassPropertyKeys(target);
    Reflect.defineMetadata(INJECT_META_KEY, [...setters, propertyKey], target);
  };
}