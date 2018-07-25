import {
  InjectScope,
  DepedencyResolveEntry,
  Nullable,
  InjectToken,
  Implement,
  ImplementFactory
} from "../declares";
import { TypeCheck, setColor } from "../utils";
import { DICache, GenerateRule } from "./di-cache";
import { ENETUNREACH } from "constants";

export interface DIContainerEntry<T> extends DepedencyResolveEntry<T> {
  fac: Nullable<ImplementFactory<any>>;
  getInstance: Nullable<() => T>;
  level: number;
}

type DeptNode = DIContainerEntry<any>;

const USE_CACHE = Symbol("di-core::cacheEnabled");

export abstract class DIContainer {

  //#region cache
  private [USE_CACHE] = false;
  private cache = new DICache(this);

  public get useCache() { return this[USE_CACHE]; }
  public set useCache(value: boolean) { this[USE_CACHE] = value; }
  //#endregion

  private sections: Array<DeptNode[]> = [];
  private map = new Map<any, DeptNode>();
  private sorted: DeptNode[] = [];

  public abstract add<K, V>(token: InjectToken<K>, imp: Implement<V>, scope: InjectScope): void;

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
    if (!this.useCache) {
      const value = this.map.get(token) || null;
      return (value && value.getInstance && value.getInstance()) || null;
    }
    //#region cache
    const rule = this.cache.load(token);
    if (rule && rule.fac !== null) {
      return rule.fac();
    } else {
      return null;
    }
    //#endregion
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

  private resolve() {
    const queue = Array.from(this.map.values());
    //#region cahce
    const createMapDepts: (item: GenerateRule | null) => GenerateRule = (item: GenerateRule | null) => {
      return <GenerateRule>(item === null ? null : {
        token: item.token,
        enable: item.fac !== null,
        fac: item.fac,
        depts: <GenerateRule[]>(item.depts.map(i => createMapDepts(this.cache.load(i.token))).filter(i => !!i))
      });
    };
    //#endregion
    this.sort(queue).forEach(item => {
      const { token, imp, scope, depts } = item;
      //#region cache
      if (this.useCache) {
        const deptRules = <GenerateRule[]>depts.map(i => createMapDepts(this.cache.load(i))).filter(i => !!i);
        console.log(scope);
        deptRules.map(i => console.log(i.fac && i.fac.toString()));
        this.cache.save(token, {
          token,
          enable: true,
          fac: createFactory(scope,
            item.fac === null ? (() => new (imp)(...deptRules.map(i => (i.fac && i.fac()) || null))) : item.fac),
          depts: deptRules,
        });
      }
      //#endregion
      if (!item.fac) {
        item.fac = () => new (imp)(...this.getDepedencies(depts));
      }
      item.getInstance = createFactory(scope, item.fac);
    });
  }

  private getDepedencies<T>(depts: InjectToken[]) {
    return depts.length === 0 ? [] : depts.map(i => this.get(i));
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

function createFactory(scope: InjectScope, fac: ImplementFactory<any>) {
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
