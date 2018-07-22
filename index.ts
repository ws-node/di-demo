import { CtorService01, CtorService02 } from "./service";
import { DISystemContract } from "./declares";
import { ConstructorInjectSystem } from "./di-core/constructor";

const cdi: DISystemContract = new ConstructorInjectSystem();
cdi.service(CtorService01);
cdi.service(CtorService02);
cdi.run();
console.log("running");