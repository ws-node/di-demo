export * from "./ctor-inject";

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
