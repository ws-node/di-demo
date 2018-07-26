import { SetterInjectSystem } from "./system";
import { InjectScope } from "../../declares";
import { SetterService0x01, SetterService01, SetterService0x02 } from "../../service/setter-inject";

export function serverStart() {

  const sdi = new SetterInjectSystem();
  sdi
    .service(SetterService0x01, InjectScope.New)
    .service(SetterService0x02, InjectScope.New)
    .service(SetterService01, InjectScope.New)
    .run();

  const service01 = sdi.get(SetterService01);
  if (service01 !== null) {
    service01.showMessage();
  }
}
