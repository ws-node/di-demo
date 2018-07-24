import { Service } from "./../di-core/constructor/decorator";

@Service()
export class CtorService01 {

  public showMessage(): string {
    return "ctor-inject service instance";
  }

}

@Service()
export class CtorService02 {

  constructor(private service0: CtorService01, private obj: Object) { }

  public showMessage() {
    return `service02 call : ${this.service0.showMessage()}`;
  }

}
