import { Inject } from "../di-core/setter/decorator";

export class SetterService01 {

  private _demo: any;

  public set demo(value: any) { this._demo = value; }
  @Inject()
  public get demo(): any { return this._demo; }

}