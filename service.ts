import { Service } from "./di-core/constructor/decorator";

//#region Constructor inject region
@Service()
export class CtorService01 {

  public showMessage(): string {
    return "ctor-inject service instance";
  }

}

@Service()
export class CtorService02 {

  constructor(private service0: CtorService01) { }

  public showMessage() {
    return `service02 call : ${this.service0.showMessage()}`;
  }

}
//#endregion

//#region Interface inject region
export class InterfaceInjectService {

  public showMessage(): string {
    return "interface service instance";
  }

}
//#endregion

//#region Setter inject region
export class SetterInjectService {

  public showMessage(): string {
    return "setter service instance";
  }

}
  //#endregion

