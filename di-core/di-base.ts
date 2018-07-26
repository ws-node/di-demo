import {
  InjectScope,
  DepedencyResolveEntry,
  Nullable,
  InjectToken,
  Implement,
  ImplementFactory
} from "../declares";
import { TypeCheck, setColor } from "../utils";

export interface DIContainerEntry<T> extends DepedencyResolveEntry<T> {
  fac: Nullable<ImplementFactory<any>>;
  getInstance: Nullable<() => T>;
  level: number;
}

type DeptNode = DIContainerEntry<any>;

export abstract class DIContainer {

  private sections: Array<DeptNode[]> = [];
  private map = new Map<any, DeptNode>();
  private sorted: DeptNode[] = [];

  public abstract add<K, V>(token: InjectToken<K>, imp: Implement<V>, scope: InjectScope): void;
  public abstract createFactory<T>(imp: DIContainerEntry<T>): ImplementFactory<T>;

  protected set<T>(token: InjectToken<T>, entry: DepedencyResolveEntry) {
    const { imp } = entry;
    const isFactory = TypeCheck.isFunction(imp || {});
    const isConstructor = !!((<any>imp).prototype);
    this.map.set(token, {
      ...entry,
      fac: isFactory ? <ImplementFactory<any>>imp : !isConstructor ? () => imp : null,
      getInstance: null,
      level: -1
    });
  }

  public complete(): void {
    this.resolve();
  }

  public get<T>(token: InjectToken<T>): T | null {
    const value = this.map.get(token) || null;
    if (value === null || value.getInstance === null) return null;
    return value.getInstance() || null;
  }

  public getConfig() {
    return this.sorted.map(i => ({
      contract: i.token && (<any>i.token).name,
      implement: (i.imp && (<any>i.imp.name)) || "[factory or instance]",
      scope: i.scope,
      level: i.level,
      dependencies: i.depts.map(i => (<any>i).name)
    }));
  }

  public getDepedencies<T>(depts: InjectToken[]) {
    return depts.length === 0 ? [] : depts.map(i => this.get(i));
  }

  private resolve() {
    const queue = Array.from(this.map.values());
    this.sort(queue)
      .forEach(item =>
        item.getInstance = scopeMark(item.scope, this.createFactory(item)));
  }

  private sort(queue: DeptNode[]): DeptNode[] {
    this.sections[0] = queue.filter(i => i.depts.length === 0);
    this.decideSection(queue.filter(i => i.depts.length > 0), queue, this.sections, 1);
    this.sections.forEach((each, index) => {
      each.forEach(i => i.level = index + 1);
    });
    return this.sorted = this.sections.reduce((pre, cur) => ([...pre, ...cur]));
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

function scopeMark(scope: InjectScope, fac: ImplementFactory<any>) {
  if (scope === InjectScope.New) return () => fac();
  return (() => {
    let instance: any;
    return () => {
      if (instance) return instance;
      return instance = fac();
    };
  })();
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
