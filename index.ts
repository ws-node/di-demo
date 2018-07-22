///<reference path="./di-core/constructor/index.ts"/>
///<reference path="./service.ts"/>
namespace MAIN {

  import S = DIService;

  const cdi: DI.DISystemContract = new DI.CtorDI.ConstructorInjectSystem();
  cdi.service(S.CtorService01);
  cdi.service(S.CtorService02);
  cdi.run();
  console.log("running");

}
