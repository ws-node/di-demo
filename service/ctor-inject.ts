import { Service } from "../di-core/constructor/decorator";
import { createUUID, setColor } from "../utils";

@Service()
export class Service0x01 {

  private id = createUUID();

  public showMessage(): string {
    return this.id.substring(0, 8);
  }

}

@Service()
export class Service0x02 {

  private id = createUUID();

  constructor(private s0x01: Service0x01) { }

  public showMessage(): string {
    return `${this.id.substring(0, 8)} - ${setColor("yellow", this.s0x01.showMessage())}`;
  }

}

@Service()
export class Service011 {

  private id = createUUID();

  constructor(private s0x02: Service0x02) { }

  public showMessage(): string {
    return `${this.id.substring(0, 8)} - ${setColor("magenta", this.s0x02.showMessage())}`;
  }

}

@Service()
export class Service012 {

  private id = createUUID();

  constructor(private s0x02: Service0x02) { }

  public showMessage(): string {
    return this.id.substring(0, 8);
  }

}

@Service()
export class Service013 {

  private id = createUUID();

  constructor(private s0x02: Service0x02) { }

  public showMessage(): string {
    return this.id.substring(0, 8);
  }

}

@Service()
export class Service014 {

  private id = createUUID();

  constructor(private s0x02: Service0x02) { }

  public showMessage(): string {
    return this.id.substring(0, 8);
  }

}

@Service()
export class Service015 {

  private id = createUUID();

  constructor(private s0x02: Service0x02) { }

  public showMessage(): string {
    return this.id.substring(0, 8);
  }

}

@Service()
export class Service016 {

  private id = createUUID();

  constructor(private s0x02: Service0x02) { }

  public showMessage(): string {
    return this.id.substring(0, 8);
  }

}

@Service()
export class SingletonService01 {

  private id = createUUID();

  public showMessage(): string {
    return this.id.substring(0, 8);
  }
}

@Service()
export class Service01 {

  private id = createUUID();

  constructor(private s0x02: Service011) { }

  public showMessage(): string {
    return `${this.id.substring(0, 8)} - ${setColor("blue", this.s0x02.showMessage())}`;
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
    return `this service       : ${setColor("red", this.id.substring(0, 8))}
singleton service  : ${setColor("cyan", this.sService.showMessage())}
newable service    : ${setColor("green", this.service0.showMessage())}\n`;
  }

}
