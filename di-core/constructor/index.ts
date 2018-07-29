import { ConstructorInjectSystem } from "./system";
import {
  Service02, Service01,
  SingletonService01, InterfaceClass,
  Service011, Service012,
  Service013, Service014,
  Service015, Service016,
  Service0x01, Service0x02
} from "./../../service";
import { InjectScope } from "./../../declares";
import { setColor } from "./../../utils";

export function serverStart() {

  const cdi = new ConstructorInjectSystem();
  cdi
    .service(Service0x01, new Service0x01())
    .service(Service0x02, () => new Service0x02(new Service0x01()), InjectScope.New)
    .service(Service011, InjectScope.New)
    .service(Service012, InjectScope.New)
    .service(Service013, InjectScope.New)
    .service(Service014, InjectScope.New)
    .service(Service015, InjectScope.New)
    .service(Service016, InjectScope.New)
    // .service(Service0x01, InjectScope.Singleton)
    // .service(Service0x02, InjectScope.Singleton)
    // .service(Service011, InjectScope.Singleton)
    // .service(Service012, InjectScope.Singleton)
    // .service(Service013, InjectScope.Singleton)
    // .service(Service014, InjectScope.Singleton)
    // .service(Service015, InjectScope.Singleton)
    // .service(Service016, InjectScope.Singleton)
    .service(Service01, InjectScope.New)
    .service(InterfaceClass, Service02, InjectScope.New)
    .service(SingletonService01, InjectScope.Singleton)
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
    cdi.get(Service01);
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
}
