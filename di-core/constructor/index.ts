import { ConstructorInjectSystem } from "./system";
import {
  Service02, Service01,
  SingletonService01, InterfaceClass,
  Service011, Service012,
  Service013, Service014,
  Service015, Service016,
  Service0x01, Service0x02
} from "./../../service/ctor-inject";
import { InjectScope } from "./../../declares";
import { setColor } from "./../../utils";
export function serverStart() {

  const di = new ConstructorInjectSystem();
  di
    .service(Service0x01, () => new Service0x01())
    .service(Service0x02, Service0x02, InjectScope.New)
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
    .service(InterfaceClass, Service02, InjectScope.Scope)
    .service(SingletonService01, InjectScope.Singleton)
    .run();

  console.log("running");

  console.log("\n========TEST MANUALLY PERFORMANCE==========\n");

  const mbefore01 = new Date().getTime();
  const singleton_s0x01 = new Service0x01();
  const singleton_s01 = new SingletonService01();
  for (let i = 0; i < 10000; i++) {
    new Service01(new Service011(new Service0x02(singleton_s0x01)));
  }
  const mafter01 = new Date().getTime();
  console.log(`10^4-service01-calling cost ${setColor("green", mafter01 - mbefore01)}ms`);

  const mbefore02 = new Date().getTime();
  for (let i = 0; i < 10000; i++) {
    const srv01 = new Service01(new Service011(new Service0x02(singleton_s0x01)));
    new Service02(
      srv01,
      new Service011(new Service0x02(singleton_s0x01)),
      new Service012(new Service0x02(singleton_s0x01)),
      new Service013(new Service0x02(singleton_s0x01)),
      new Service014(new Service0x02(singleton_s0x01)),
      new Service015(new Service0x02(singleton_s0x01)),
      new Service016(new Service0x02(singleton_s0x01)),
      singleton_s01
    );
  }
  const mafter02 = new Date().getTime();
  console.log(`10^4-service02-calling cost ${setColor("red", mafter02 - mbefore02)}ms`);

  console.log("\n========TEST DI PERFORMANCE==========\n");

  // test service01
  const beforeTime01 = new Date().getTime();
  for (let i = 0; i < 10000; i++) {
    di.get(Service01);
  }
  const afterTime01 = new Date().getTime();
  console.log(`10^4-service01-calling cost ${setColor("green", afterTime01 - beforeTime01)}ms`);

  // test service02
  const beforeTime = new Date().getTime();
  for (let i = 0; i < 10000; i++) {
    di.get(InterfaceClass);
  }
  const afterTime = new Date().getTime();
  console.log(`10^4-service02-calling cost ${setColor("red", afterTime - beforeTime)}ms`);

  console.log("\n========TEST GET==========\n");

  const s02 = di.get(InterfaceClass);
  if (s02) {
    console.log(s02.showMessage());
  }
  const s0202 = di.get(InterfaceClass);
  if (s0202) {
    console.log(s0202.showMessage());
  }
  const s0203 = di.get(InterfaceClass);
  if (s0203) {
    console.log(s0203.showMessage());
  }

  console.log("\n========TEST SCOPE==========\n");

  const scopeId01 = "scope-id-01";
  const scopeId02 = "scope-id-02";

  const s01s02 = di.get(InterfaceClass, scopeId01);
  if (s01s02) {
    console.log(s01s02.showMessage());
  }
  const s01s0202 = di.get(InterfaceClass, scopeId01);
  if (s01s0202) {
    console.log(s01s0202.showMessage());
  }
  const s02s0203 = di.get(InterfaceClass, scopeId02);
  if (s02s0203) {
    console.log(s02s0203.showMessage());
  }

}
