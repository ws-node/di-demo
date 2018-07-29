import {
  Constructor,
  InjectScope,
  DISystemContract,
  Nullable,
  InjectToken,
  ImplementFactory,
  ImplementType
} from "../declares";
import { DIContainer } from "./di-base";

export * from "./di-base";

export abstract class InjectSystemBase implements DISystemContract {

  protected abstract di: DIContainer;

  service<T>(service: Constructor<T>, scope?: InjectScope): DISystemContract;
  service<T, V>(token: InjectToken<T>, instance: V): DISystemContract;
  service<T, V>(token: InjectToken<T>, fac: ImplementFactory<V>, scope?: InjectScope): DISystemContract;
  service<T, V>(token: InjectToken<T>, imp: ImplementType<V>, scope?: InjectScope): DISystemContract;
  public service<T>(...args: any[]): DISystemContract {
    const [token, ...others] = args;
    if (!token) throw new Error("inject error : empty injection.");
    if (others.length === 0) {
      this.di.add(token, token, InjectScope.Singleton);
    } else if (others.length === 1) {
      if (typeof others[0] !== "number") {
        this.di.add(token, others[0], InjectScope.Singleton);
      } else {
        this.di.add(token, token, <InjectScope>others[0]);
      }
    } else if (others.length === 2) {
      const [imp, scope] = others;
      this.di.add(token, imp, scope);
    } else {
      throw new Error("inject error : too many injection parameters.");
    }
    return this;
  }

  public abstract get<T>(token: InjectToken<T>): T | null;

  public run() { }

}

