class Base {
  constructor() {

  }
  task = new Map();

  getUUID(len: number, radix: number): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    let i;
    radix = radix || chars.length;
    if (len) {
      for (i = 0; i < len; i++) {
        uuid[i] = chars[0 | (Math.random() * radix)];
      }
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  }

  getPrintersData() {
    return {
      cmd: 'getPrinters',
      requestID: this.getUUID(8, 16),
      version: '1.0',
    }
  }

  handleMessage(res: any) {
    let data = JSON.parse(res.data);
    let callback = this.task.get(data.taskID) || this.task.get(data.requestID);
    if (!callback) {
      return;
    }
    // let requestCallback = this.task.get(data.requestID);
    // let taskCallback = this.task.get(data.taskID);
    // if (!requestCallback && !requestCallback) {
    //   return;
    // }
    if (data.cmd === 'getPrinters') {
      // requestCallback(data);
      callback(data);
      this.task.delete(data.requestID);
    }
    /* cainiao Mac
      print status = success
      1. notifyTaskResult status = initial
      2. notifyDocResult status = rendered
      3. notifyDocResult status = printed
      4. notifyPrintResult taskStatus = rendered printStatus = [ { status: success } ]
      5. notifyTaskResult status = completeSuccess
      cainiao Windows
      print status = success
      1. notifyPrintResult taskStatus = rendered / failed?
      2. notifyPrintResult taskStatus = printed
    */
    /* pinduoduo Windows
      print status = success
      1. notifyPrintResult taskStatus = printed? failed
    */
    /* doudian Mac
      print status = success
      1. notifyPrintResult taskStatus = printed failed? printStatus = [ { status: success } ]
      doudian Windows
      print status = success
      1. notifyPrintResult taskStatus = printed printStatus = [ { status: success } ]
    */
    if (data.cmd === 'print') {
      callback(data);
    }
    if (data.cmd === 'notifyTaskResult') {
      callback(data);
    }
    if (data.cmd === 'notifyDocResult') {
      callback(data);
    }
    if (data.cmd === 'notifyPrintResult') {
      callback(data);
      if (data.taskStatus === 'printed' || data.taskStatus === 'failed') {
        this.task.delete(data.requestID);
      }
    }
    if (data.cmd === 'notifyTaskResult') {
      callback(data);
      data.status = 'completeSuccess' && this.task.delete(data.requestID); // 菜鸟Mac
    }
  }
}

export default new Base();