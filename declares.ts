
export interface Constructor<T> {
  new(...args: any[]): T;
}

export interface AbstractType<T> {
  prototype: T;
}

export type Exist<T> = Exclude<T, undefined>;

export type Nullable<T> = Exist<T> | null;
export interface DISystemContract {
  service<T>(service: Constructor<T>, scope?: InjectScope): DISystemContract;
  service<T, V>(token: InjectToken<T>, imp: ImplementType<V>, scope?: InjectScope): DISystemContract;
  service<T, V>(token: InjectToken<T>, fac: ImplementFactory<V>, scope?: InjectScope): DISystemContract;
  service<T, V>(token: InjectToken<T>, instance: ImplementInstance<V>, scope?: InjectScope): DISystemContract;
  get<T>(token: InjectToken<T>): Nullable<T>;
  run(): void;
}

export enum InjectScope {
  Singleton = "singleton",
  New = "new"
}

export type InjectToken<T = any> = Constructor<T> | AbstractType<T>;

export interface ImplementType<T extends any> {
  new(...args: any[]): T;
  prototype: T;
}

export interface ImplementInstance<T extends any> {
  prototype: T;
}

export type ImplementFactory<T> = () => T;

export type Implement<T> = ImplementFactory<T> | ImplementInstance<T> | ImplementType<T>;

export interface DepedencyResolveEntry<T = any> {
  token: InjectToken<T>;
  imp: any;
  depts: InjectToken<any>[];
  scope: InjectScope;
}

