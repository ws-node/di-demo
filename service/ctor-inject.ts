import { Service } from "../di-core/constructor/decorator";
import { createUUID, setColor } from "../utils";

@Service()
export class Service0x01 {

  private id = createUUID();

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

@Service()
export class Service0x02 {

  private id = createUUID();

  constructor(private s0x01: Service0x01) { }

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

@Service()
export class Service011 {

  private id = createUUID();

  constructor(private s0x02: Service0x02) { }

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

@Service()
export class Service012 {

  private id = createUUID();

  constructor(private s0x02: Service0x02) { }

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

@Service()
export class Service013 {

  private id = createUUID();

  constructor(private s0x02: Service0x02) { }

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

@Service()
export class Service014 {

  private id = createUUID();

  constructor(private s0x02: Service0x02) { }

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

@Service()
export class Service015 {

  private id = createUUID();

  constructor(private s0x02: Service0x02) { }

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

@Service()
export class Service016 {

  private id = createUUID();

  constructor(private s0x02: Service0x02) { }

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

@Service()
export class SingletonService01 {

  private id = createUUID();

  public showMessage(): string {
    return `singleton-inject service ${setColor("green", this.id)}`;
  }

}

@Service()
export class Service01 {

  private id = createUUID();

  constructor(private s0x02: Service011) { }

  public showMessage(): string {
    return `always new service ${setColor("blue", this.id)}`;
  }

}

export abstract class InterfaceClass {
  abstract showMessage(): string;
}

@Service()
export class Service02 implements InterfaceClass {

  private id = createUUID();

  constructor(
    private service0: Service01,
    private service011: Service011,
    private service012: Service012,
    private service013: Service013,
    private service014: Service014,
    private service015: Service015,
    private service016: Service016,
    private sService: SingletonService01) {

  }

  public showMessage() {
    return `alaways new service02 [ ${setColor("cyan", this.id)} ] call(1) : ${this.sService.showMessage()}, call(2) : ${this.service0.showMessage()}`;
  }

}
