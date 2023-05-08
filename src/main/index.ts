import '@common/utils/aop';
import { MainProcessController } from '@main/controller/main-process-controller';

// In this file you can include the rest of your app"s specific main process code.
// You can also put them in separate files and require them here.

const mainProcessController = new MainProcessController();

mainProcessController.init._before(() => {
  mainProcessController.checkSingleInstanceLock();
})();
console.log(8888888);
console.log(888888);
console.log(888888);
