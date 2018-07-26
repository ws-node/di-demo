import { Service } from "../di-core/constructor/decorator";
import { createUUID, setColor } from "../utils";

@Service()
export class CtorService0x01 {

  private id = createUUID();

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

@Service()
export class CtorService0x02 {

  private id = createUUID();

  constructor(private s0x01: CtorService0x01) { }

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

@Service()
export class CtorService011 {

  private id = createUUID();

  constructor(private s0x02: CtorService0x02) { }

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

@Service()
export class CtorService012 {

  private id = createUUID();

  constructor(private s0x02: CtorService0x02) { }

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

@Service()
export class CtorService013 {

  private id = createUUID();

  constructor(private s0x02: CtorService0x02) { }

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

@Service()
export class CtorService014 {

  private id = createUUID();

  constructor(private s0x02: CtorService0x02) { }

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

@Service()
export class CtorService015 {

  private id = createUUID();

  constructor(private s0x02: CtorService0x02) { }

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

@Service()
export class CtorService016 {

  private id = createUUID();

  constructor(private s0x02: CtorService0x02) { }

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

@Service()
export class CtorService01 {

  private id = createUUID();

  constructor(private s0x02: CtorService011) { }

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

export abstract class InterfaceClass {
  abstract showMessage(): string;
}

@Service()
export class CtorService02 implements InterfaceClass {

  private id = createUUID();

  constructor(
    private service0: CtorService01,
    private service011: CtorService011,
    private service012: CtorService012,
    private service013: CtorService013,
    private service014: CtorService014,
    private service015: CtorService015,
    private service016: CtorService016,
    private sService: CtorSingletonService01) {

  }

  public showMessage() {
    return `alaways new service02 [ ${setColor("cyan", this.id)} ] call(1) : ${this.sService.showMessage()}, call(2) : ${this.service0.showMessage()}`;
  }

}
