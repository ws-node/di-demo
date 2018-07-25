import { InjectToken, Nullable } from "../declares";
import { DIContainer } from "./di-base";

export interface GenerateRule<T = any> {
  token: InjectToken<T>;
  fac: (...depts: InjectToken[]) => T;
  depts: GenerateRule[];
}

export class DICache {

  private cache = new Map<InjectToken, GenerateRule>();

  constructor(private di: DIContainer) { }

  public save<T>(token: InjectToken<T>, rule: GenerateRule): void {
    this.cache.set(token, rule);
  }

  public load<T>(token: InjectToken<T>): Nullable<GenerateRule<T>> {
    return this.cache.get(token) || null;
  }

}