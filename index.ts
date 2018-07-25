import { ConstructorInjectSystem } from "./di-core/constructor/index";
import {
  CtorService02, CtorService01,
  CtorSingletonService01, InterfaceClass,
  CtorService011, CtorService012,
  CtorService013, CtorService014,
  CtorService015, CtorService016, CtorService0x01, CtorService0x02
} from "./service";
import { InjectScope } from "./declares";
import { setColor } from "./utils";

const cdi = new ConstructorInjectSystem();
cdi
  .service(CtorService0x01, InjectScope.New)
  .service(CtorService0x02, InjectScope.New)
  .service(CtorService011, InjectScope.New)
  .service(CtorService012, InjectScope.New)
  .service(CtorService013, InjectScope.New)
  .service(CtorService014, InjectScope.New)
  .service(CtorService015, InjectScope.New)
  .service(CtorService016, InjectScope.New)
  // .service(CtorService0x01, InjectScope.Singleton)
  // .service(CtorService0x02, InjectScope.Singleton)
  // .service(CtorService011, InjectScope.Singleton)
  // .service(CtorService012, InjectScope.Singleton)
  // .service(CtorService013, InjectScope.Singleton)
  // .service(CtorService014, InjectScope.Singleton)
  // .service(CtorService015, InjectScope.Singleton)
  // .service(CtorService016, InjectScope.Singleton)
  .service(CtorService01, InjectScope.New)
  .service(InterfaceClass, CtorService02, InjectScope.New)
  .service(CtorSingletonService01, InjectScope.Singleton)
  .run();
console.log("running");
const s02 = cdi.get(InterfaceClass);
if (s02) {
  console.log(s02.showMessage());
}
const s0202 = cdi.get(InterfaceClass);
if (s0202) {
  console.log(s0202.showMessage());
}
const s0203 = cdi.get(InterfaceClass);
if (s0203) {
  console.log(s0203.showMessage());
}

// test service01
const beforeTime01 = new Date().getTime();
for (let i = 0; i < 10000; i++) {
  cdi.get(CtorService01);
}
const afterTime01 = new Date().getTime();
console.log(`10^4-service01-calling cost ${setColor("green", afterTime01 - beforeTime01)}ms`);

// test service02
const beforeTime = new Date().getTime();
for (let i = 0; i < 10000; i++) {
  cdi.get(InterfaceClass);
}
const afterTime = new Date().getTime();
console.log(`10^4-service02-calling cost ${setColor("red", afterTime - beforeTime)}ms`);