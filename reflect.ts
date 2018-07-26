import "reflect-metadata";
import { InjectToken } from "./declares";

/** Built-in metadata type: context type of the record attribute method */
export const TYPE_META_KEY = "design:type";
/** Built-in metadata type: params types of the record attribute method */
export const PARAMS_META_KEY = "design:paramtypes";
/** Built-in metadata type: return type of the record attribute method */
export const RETURN_META_KEY = "design:returntype";

export const INJECT_META_KEY = "di-demo::inject-setter";

export function getDependencies<T>(target: InjectToken<T>): InjectToken[] {
  return Reflect.getMetadata(PARAMS_META_KEY, target) || [];
}

export function setInjecttionMetadata<T>(proto: T, data: { key: string }) {
  return Reflect.defineMetadata(INJECT_META_KEY, data, proto);
}

export function getInjecttionMetadata<T>(proto: T) {
  return Reflect.getMetadata(INJECT_META_KEY, proto) || {};
}
