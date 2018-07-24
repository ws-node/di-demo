import { Service } from "./../di-core/constructor/decorator";

@Service()
export class CtorService01 {

  public showMessage(): string {
    return "ctor-inject service instance";
  }

}

@Service()
export class CtorAlwaysNewService01 {

  public showMessage(): string {
    return "ctor-always-new-inject service instance";
  }

}

export abstract class InterfaceClass {
  abstract showMessage(): string;
}

@Service()
export class CtorService02 implements InterfaceClass {

  constructor(private service0: CtorService01, private newService: CtorAlwaysNewService01) { }

  public showMessage() {
    return `service02 call : ${this.service0.showMessage()}`;
  }

}
