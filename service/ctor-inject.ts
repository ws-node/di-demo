import { Service } from "./../di-core/constructor/decorator";
import { createUUID, setColor } from "../utils";

@Service()
export class CtorService01 {

  private id = createUUID();

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

@Service()
export class CtorSingletonService01 {

  private id = createUUID();

  public showMessage(): string {
    return `singleton-inject service ${setColor("green", this.id)}`;
  }

}

export abstract class InterfaceClass {
  abstract showMessage(): string;
}

@Service()
export class CtorService02 implements InterfaceClass {

  private id = createUUID();

  constructor(private service0: CtorService01, private sService: CtorSingletonService01) { }

  public showMessage() {
    return `alaways new service02 [ ${setColor("cyan", this.id)} ] call(1) : ${this.sService.showMessage()}, call(2) : ${this.service0.showMessage()}`;
  }

}
