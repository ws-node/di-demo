import { ConstructorInjectSystem } from "./di-core/constructor/index";
import { CtorService02, CtorService01, CtorSingletonService01, InterfaceClass } from "./service";
import { InjectScope } from "./declares";

const cdi = new ConstructorInjectSystem();
cdi
  .service(CtorService01, InjectScope.New)
  .service(InterfaceClass, CtorService02, InjectScope.New)
  .service(CtorSingletonService01)
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