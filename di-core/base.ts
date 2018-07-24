import {
  Constructor,
  InjectScope,
  DISystemContract,
  DepedencyResolveEntry,
  Nullable,
  InjectToken,
  Implement,
  ImplementInstance,
  ImplementFactory,
  ImplementType
} from "../declares";
import { TypeCheck, setColor } from "../utils";

export abstract class InjectSystemBase implements DISystemContract {

  protected di!: DIContainer;

  service<T>(service: Constructor<T>, scope?: InjectScope): DISystemContract;
  service<T, V>(token: InjectToken<T>, imp: ImplementType<V>, scope?: InjectScope): DISystemContract;
  service<T, V>(token: InjectToken<T>, fac: ImplementFactory<V>, scope?: InjectScope): DISystemContract;
  service<T, V>(token: InjectToken<T>, instance: ImplementInstance<V>, scope?: InjectScope): DISystemContract;
  public service<T>(...args: any[]): DISystemContract {
    const [token, ...others] = args;
    if (!token) throw new Error("inject error : empty injection.");
    if (others.length === 0) {
      this.di.add(token, token, InjectScope.Singleton);
    } else if (others.length === 1) {
      if (typeof others[0] !== "string") {
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

  public abstract get<T>(token: InjectToken<T>): Nullable<T>;

  public run() { }

}

export interface DIContainerEntry<T> extends DepedencyResolveEntry {
  fac: Nullable<ImplementFactory<any>>;
  getInstance: Nullable<() => T>;
}

type DeptNode = DIContainerEntry<any>;

export abstract class DIContainer {

  private sections: Array<DeptNode[]> = [];
  private map = new Map<any, DeptNode>();

  public abstract dependencyResolver: <T>(token: InjectToken<T>) => InjectToken[];
  public abstract add<K, V>(token: InjectToken<K>, imp: Implement<V>, scope: InjectScope): void;

  protected set<T>(token: InjectToken<T>, entry: DepedencyResolveEntry) {
    const { imp } = entry;
    const isFactory = TypeCheck.isFunction(imp || {});
    const isConstructor = !!((<any>imp).prototype);
    this.map.set(token, {
      ...entry,
      fac: isFactory ? <ImplementFactory<any>>imp : !isConstructor ? () => imp : null,
      getInstance: null
    });
  }

  public complete(): void {
    this.resolve();
  }

  public get<T>(token: InjectToken<T>): Nullable<T> {
    const value = this.map.get(token) || null;
    return (value && value.getInstance && value.getInstance()) || null;
  }

  public getConfig() {
    const result: { [key: string]: any } = {};
    Array.from(this.map.values()).forEach((item, index) => {
      result[index] = item;
    });
    return result;
  }

  private resolve() {
    const queue = Array.from(this.map.values());
    this.sort(queue.filter(item => item.fac === null)).forEach(item => {
      item.fac = () => new (item.imp)(...this.getDepedencies(item.imp));
    });
    queue.forEach(item => {
      const { fac, scope } = item;
      item.getInstance = fac && createFactory(scope, fac);
    });
  }

  /**
   * * The `imp_type`(`ImplementType<T>`) should be implement class constructor instead of interface token.
   * @description
   * @author Big Mogician
   * @private
   * @template T
   * @param {ImplementType<T>} token
   * @returns
   * @memberof DIContainer
   */
  private getDepedencies<T>(imp_type: ImplementType<T>) {
    return this.dependencyResolver(imp_type).map(i => this.get(i));
  }

  private sort(queue: DeptNode[]): DeptNode[] {
    this.sections[0] = queue.filter(i => i.depts.length === 0);
    this.decideSection(queue.filter(i => i.depts.length > 0), queue, this.sections, 1);
    return this.sections.reduce((pre, cur) => ([...pre, ...cur]));
  }

  private decideSection(queue: DeptNode[], sourceQueue: DeptNode[], sections: Array<DeptNode[]>, current: number) {
    if (queue.length === 0) return;
    const wants = queue.filter(item => resolveUnder(item, sections, current - 1, sourceQueue));
    if (wants.length === 0) return;
    sections[current] = wants;
    this.decideSection(queue.filter(i => !wants.includes(i)), sourceQueue, sections, current + 1);
  }

}

function resolveUnder(node: DeptNode, sections: Array<DeptNode[]>, checkIndex: number, sourceQueue: DeptNode[]) {
  const checkArr: DeptNode[] = [];
  if (checkIndex < 0) return false;
  let index = checkIndex;
  while (index >= 0) {
    checkArr.push(...sections[index]);
    index--;
  }
  const isresolved = node.depts.every(i => checkArr.map(m => m.token).includes(i));
  if (!isresolved && !node.depts.every(i => sourceQueue.map(m => m.token).includes(i))) throw resolveError(node.imp, node.depts);
  return isresolved;
}

function createFactory(scope: InjectScope, fac: ImplementFactory<any>) {
  if (scope === InjectScope.New) return () => fac();
  return () => {
    let instance: any;
    if (instance) return instance;
    return instance = fac();
  };
}

function resolveError(el: any, depts: any[]) {
  return invalidOperation(
    `Resolve dependency error : the dependency queue is broken caused by [${setColor("green", (el && el.name) || "unknown name")}]. ` +
    `the depedency list is [${setColor("blue", (depts || []).map(i => i.name || "??").join(", "))}]`
  );
}

function duplicateError(el: any) {
  return invalidOperation(
    `register service error : the inject token is duplicate : [${(el && el.name) || "unknown name"}]. `
  );
}

export function invalidOperation(error: string, more?: any) {
  return ERROR(`[ ${setColor("red", "INVALID OPERATION")} ] : ${error}`, more);
}

export function ERROR(error: string, more?: any) {
  return new Error(`${setColor("cyan", error)} \n[ ${setColor("magenta", "more details")} ] : ${(JSON.stringify(more)) || "none"}`);
}

