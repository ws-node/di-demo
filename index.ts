import { ConstructorInjectSystem } from "./di-core/constructor/index";
import { CtorService02, CtorService01 } from "./service";

const cdi = new ConstructorInjectSystem();
cdi.service(CtorService01);
cdi.service(CtorService02);
cdi.run();
console.log("running");
const s02 = cdi.get(CtorService02);
if (s02) {
  console.log(s02.showMessage());
}
