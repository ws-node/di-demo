///<reference path="./di-core/constructor/index.ts"/>
///<reference path="./service.ts"/>
namespace MAIN {

  const cdi: DI.DISystemContract = new DI.ConstructorInjectSystem();
  cdi.service(DI.CtorService01);
  cdi.service(DI.CtorService02);
  cdi.run();
  console.log("running");

}
