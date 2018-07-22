///<reference path="./di.ts"/>
namespace DI {
  export class ConstructorInjectSystem extends InjectSystemBase {

    protected di = cdi;

    public run() {
      this.di.complete();
      console.log(this.di.getConfig());
    }

  }
}
