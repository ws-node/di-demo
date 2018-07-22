namespace DI.CtorDI {
  export class ConstructorInjectSystem extends InjectSystemBase {

    protected di = cdi;

    public run() {
      this.di.complete();
      console.log(this.di.getConfig());
    }

  }
}
