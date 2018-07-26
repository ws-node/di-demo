import { SetterInjectSystem } from "./system";
import { InjectScope } from "../../declares";
import { SetterService0x01, SetterService01, SetterService0x02 } from "../../service/setter-inject";
import { setColor } from "../../utils";

export function serverStart() {

  const sdi = new SetterInjectSystem();
  sdi
    .service(SetterService0x01, InjectScope.Singleton)
    .service(SetterService0x02, InjectScope.New)
    .service(SetterService01, InjectScope.New)
    .run();

  const service01 = sdi.get(SetterService01);
  if (service01 !== null) {
    service01.showMessage();
  }

  const service011 = sdi.get(SetterService01);
  if (service011 !== null) {
    service011.showMessage();
  }

  const service012 = sdi.get(SetterService01);
  if (service012 !== null) {
    service012.showMessage();
  }

  // test service0x02
  const beforeTime01 = new Date().getTime();
  for (let i = 0; i < 10000; i++) {
    sdi.get(SetterService0x02);
  }
  const afterTime01 = new Date().getTime();
  console.log(`10^4-service0x-calling cost ${setColor("green", afterTime01 - beforeTime01)}ms`);

  // test service01
  const beforeTime = new Date().getTime();
  for (let i = 0; i < 10000; i++) {
    sdi.get(SetterService01);
  }
  const afterTime = new Date().getTime();
  console.log(`10^4-service01-calling cost ${setColor("red", afterTime - beforeTime)}ms`);

}
