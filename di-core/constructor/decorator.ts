import { Constructor } from "../../declares";

export function Service() {
  return function <T>(target: Constructor<T>) {
    return target;
  };
}
