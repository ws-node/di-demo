namespace DI.CtorDI {
  export function Service() {
    return function <T>(target: Constructor<T>) {
      return target;
    };
  }
}