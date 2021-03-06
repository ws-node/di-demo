import "reflect-metadata";
import { InjectToken } from "./declares";

/** Built-in metadata type: context type of the record attribute method */
export const TYPE_META_KEY = "design:type";
/** Built-in metadata type: params types of the record attribute method */
export const PARAMS_META_KEY = "design:paramtypes";
/** Built-in metadata type: return type of the record attribute method */
export const RETURN_META_KEY = "design:returntype";

export const INJECT_META_KEY = "di-demo::inject-setter";

export function getDependencies<T>(target: T, key?: string): InjectToken[] {
  return Reflect.getMetadata(PARAMS_META_KEY, target, <string | symbol>key) || [];
}

export function getClassPropertyKeys<T>(target: T): string[] {
  return Reflect.getMetadata(INJECT_META_KEY, target) || [];
}
