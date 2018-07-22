namespace DI {

  import S = DIService;

  const cdi: DISystemContract = new CtorDI.ConstructorInjectSystem();
  cdi.service(S.CtorService01);
  cdi.service(S.CtorService02);
  cdi.run();
  console.log("running");

}
