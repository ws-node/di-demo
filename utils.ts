
namespace DI {

  function isObject(target: any) {
    return Object.prototype.toString.call(target) === "[object Object]";
  }

  function isArray(target: any) {
    return Object.prototype.toString.call(target) === "[object Array]";
  }

  function isFunction(target: any) {
    return Object.prototype.toString.call(target) === "[object Function]";
  }

  function getPrototypeConstructor(obj: any) {
    const proto = Object.getPrototypeOf(obj);
    return proto && proto.constructor;
  }

  function isCustomClassInstance(obj: any, type?: any) {
    return !type ?
      (getPrototypeConstructor(obj) !== Object) :
      (getPrototypeConstructor(obj) === type);
  }

  export const TypeCheck = {
    IsObject(target: any) { return isObject(target); },
    IsArray(target: any) { return isArray(target); },
    isFunction(target: any) { return isFunction(target) && !target.prototype && target !== Object; },
    getClass(target: any) { return getPrototypeConstructor(target); },
    isFromCustomClass(target: any, type?: any) { return isCustomClassInstance(target, type); }
  };

  export const Colors: { [key: string]: string } = {
    reset: "\x1b[0m",
    red: "\x1b[31m\x1b[1m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
    magenta: "\x1b[35m",
    white: "\x1b[37m"
  };

  export function setColor(name: string, value: any): string {
    return `${Colors[name]}${value}${Colors.reset}`;
  }
}
