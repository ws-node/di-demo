import { Inject } from "../di-core/setter/decorator";
import { OnInit } from "../di-core/setter/lifecycle";
import { createUUID, setColor } from "../utils";

export class Service0x01 {

  private id = createUUID();

  public showMessage(): string {
    return this.id;
  }

}

export class Service0x02 {

  private id = createUUID();
  private s0x01!: Service0x01;

  @Inject()
  private "@setService0x01"(service: Service0x01) {
    this.s0x01 = service;
  }

  public showMessage(): string {
    return this.id;
  }

}

export class Service011 {

  private id = createUUID();
  private s0x02!: Service0x02;

  @Inject()
  private "@setService0x02"(service: Service0x02) {
    this.s0x02 = service;
  }

  public showMessage(): string {
    return this.id;
  }

}

export class Service012 {

  private id = createUUID();
  private s0x02!: Service0x02;

  @Inject()
  private "@setService0x02"(service: Service0x02) {
    this.s0x02 = service;
  }

  public showMessage(): string {
    return this.id;
  }

}

export class Service013 {

  private id = createUUID();
  private s0x02!: Service0x02;

  @Inject()
  private "@setService0x02"(service: Service0x02) {
    this.s0x02 = service;
  }

  public showMessage(): string {
    return this.id;
  }

}

export class Service014 {

  private id = createUUID();
  private s0x02!: Service0x02;

  @Inject()
  private "@setService0x02"(service: Service0x02) {
    this.s0x02 = service;
  }

  public showMessage(): string {
    return this.id;
  }

}

export class Service015 {

  private id = createUUID();
  private s0x02!: Service0x02;

  @Inject()
  private "@setService0x02"(service: Service0x02) {
    this.s0x02 = service;
  }

  public showMessage(): string {
    return this.id;
  }

}

export class Service016 {

  private id = createUUID();
  private s0x02!: Service0x02;

  @Inject()
  private "@setService0x02"(service: Service0x02) {
    this.s0x02 = service;
  }

  public showMessage(): string {
    return this.id;
  }

}

export class SingletonService01 {

  private id = createUUID();

  public showMessage(): string {
    return this.id;
  }

}

export class Service01 {

  private id = createUUID();
  private service011!: Service011;

  @Inject()
  private set "@injectService011"(service: Service011) { this.service011 = service; }

  public showMessage(): string {
    return this.id;
  }

}

export abstract class InterfaceClass {
  abstract showMessage(): string;
}

export class Service02 implements InterfaceClass {

  private id = createUUID();

  private service0!: Service01;
  private service011!: Service011;
  private service012!: Service012;
  private service013!: Service013;
  private service014!: Service014;
  private service015!: Service015;
  private service016!: Service016;
  private sService!: SingletonService01;

  @Inject()
  private "@setService01"(service: Service01) {
    this.service0 = service;
  }

  @Inject()
  private "@setService011"(service: Service011) {
    this.service011 = service;
  }

  @Inject()
  private "@setService012"(service: Service012) {
    this.service012 = service;
  }

  @Inject()
  private "@setService013"(service: Service013) {
    this.service013 = service;
  }

  @Inject()
  private "@setService014"(service: Service014) {
    this.service014 = service;
  }

  @Inject()
  private "@setService015"(service: Service015) {
    this.service015 = service;
  }

  @Inject()
  private "@setService016"(service: Service016) {
    this.service016 = service;
  }

  @Inject()
  private "@setSingletonService01"(service: SingletonService01) {
    this.sService = service;
  }

  public showMessage() {
    return `this service       : [${setColor("red", this.id)}]
singleton service  : [${setColor("cyan", this.sService.showMessage())}]
newable service    : [${setColor("green", this.service0.showMessage())}]\n`;
  }

}