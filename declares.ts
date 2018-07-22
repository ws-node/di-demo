declare global {
  interface Constructor<T> {
    new(...args: any[]): T;
  }

  interface AbstractType<T> {
    prototype: T;
  }

  type Exist<T> = Exclude<T, undefined>;

  type Nullable<T> = Exist<T> | null;
}

export interface DISystemContract {
  service<T>(service: Constructor<T>): DISystemContract;
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