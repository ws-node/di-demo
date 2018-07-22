import { ConstructorInjectSystem } from "./di-core/constructor/index";
import { CtorService02, CtorService01 } from "./service";

const cdi = new ConstructorInjectSystem();
cdi.service(CtorService01);
cdi.service(CtorService02);
cdi.run();
console.log("running");

