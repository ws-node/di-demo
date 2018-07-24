import { ConstructorInjectSystem } from "./di-core/constructor/index";
import { CtorService02, CtorService01, CtorAlwaysNewService01, InterfaceClass } from "./service";
import { InjectScope } from "./declares";

const cdi = new ConstructorInjectSystem();
cdi
  .service(CtorService01)
  .service(InterfaceClass, CtorService02)
  .service(CtorAlwaysNewService01, InjectScope.New)
  .run();
console.log("running");
const s02 = cdi.get(InterfaceClass);
if (s02) {
  console.log(s02.showMessage());
}
