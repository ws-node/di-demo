import { InjectToken } from "../declares";

export class DIScopePool {

  private instanceMap = new Map<InjectToken, any>();

  setInstance<T>(token: InjectToken<T>, instance: T): void {
    this.instanceMap.set(token, instance);
  }

  getInstance<T>(token: InjectToken<T>): T | null {
    const instance = this.instanceMap.get(token);
    return instance || null;
  }

  update(newMaps: Array<[InjectToken, any]>): void;
  update(resolver: <T>(token: InjectToken<T>) => T | null): void;
  update(args: any): void {
    if (args instanceof Array) {
      const newMaps: Array<[InjectToken, any]> = args;
      newMaps.forEach(([key, instance]) => {
        this.instanceMap.set(key, instance);
      });
    } else {
      const resolver: <T>(token: InjectToken<T>) => T | null = args;
      Array.from(this.instanceMap.keys()).forEach(key => {
        this.instanceMap.set(key, resolver(key));
      });
    }
  }

  dispose() {

  }

}