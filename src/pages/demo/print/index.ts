/*
 * @Author: Mukti
 * @Date: 2022-01-14 14:00:09
 * @LastEditTime: 2022-01-16 23:02:31
 * @LastEditors: Mukti
 */
import base from './base';
import cainiao from './cainiao';
import pinduoduo from './pinduoduo';
import doudian from './doudian';

// interface CmptList {
//   cainiao: boolean;
//   pinduoduo: boolean;
//   doudian: boolean;
// }
class PrintBrigde {
  constructor() {
    console.log('PrintBrigde');
  }
  // TODO:
  task() {
    console.log(base.task);
  }

  connect(cmpt: string, callback: (arg0: any) => unknown) {
    if (cmpt === 'cainiao' && !cainiao.status()) {
      typeof callback === 'function' && base.task.set('cainiaoConnect', callback);
      cainiao.connect();
    } else if (cmpt === 'pinduoduo' && !pinduoduo.status()) {
      typeof callback === 'function' && base.task.set('pinduoduoConnect', callback);
      pinduoduo.connect();
    } else if (cmpt === 'doudian' && !doudian.status()) {
      typeof callback === 'function' && base.task.set('doudianConnect', callback);
      doudian.connect();
    } else {
      typeof callback === 'function' && callback({
        msg: 'Already connected',
        status: 'connected',
      });
    }
  } 

  getCmpts(callback: any) {
    typeof callback !== 'function' && (callback = callback?.callback);
    typeof callback === 'function' &&
      callback({
        cainiao: cainiao.status(),
        pinduoduo: pinduoduo.status(),
        doudian: doudian.status(),
      });
  }

  getPrinters(callback: any) {
    let cmpt = '';
    if (typeof callback !== 'function') {
      cmpt = callback?.cmpt || '';
      callback = callback?.callback;
    }
    let data = base.getPrintersData();
    let req = JSON.stringify(data);
    typeof callback === 'function' && base.task.set(data.requestID, callback);
    if (cmpt === 'cainiao' && cainiao.status()) {
      cainiao.getPrinters(req);
    } else if (cmpt === 'pinduoduo' && pinduoduo.status()) {
      pinduoduo.getPrinters(req);
    } else if (cmpt === 'doudian' && doudian.status()) {
      doudian.getPrinters(req);
    } else if (cainiao.status()) {
      cainiao.getPrinters(req);
    } else if (pinduoduo.status()) {
      pinduoduo.getPrinters(req);
    } else if (doudian.status()) {
      doudian.getPrinters(req);
    } else {
      base.task.delete(data.requestID);
    }
  }

  print(req: { cmpt: string; printer: string; callback: (arg0: any) => unknown; documents: any[]; }) {
    const cmpt: string = req.cmpt || 'cainiao';
    let data = {
      cmd: 'print',
      requestID: base.getUUID(8, 16),
      version: '1.0',
      task: {
        taskID: base.getUUID(7, 10),
        preview: false,
        printer: req.printer,
        // previewType: 'pdf', // pdf image
        // firstDocumentNumber: 0,
        // totalDocumentCount: 0,
        documents: req.documents,
        // notifyType: ['render','print'],
        
      }
    };
    // typeof req.callback === 'function' && base.task.set(data.task.taskID, req.callback);
    if (cmpt === 'cainiao') {
      if (cainiao.status()) {
        typeof req.callback === 'function' && base.task.set(data.requestID, req.callback);
        cainiao.print(data);
      } else {
        typeof req.callback === 'function' && req.callback({ msg: 'Cmpt unconnected' });
      }
    }
    if (cmpt === 'pinduoduo') {
      if (pinduoduo.status()) {
        typeof req.callback === 'function' && base.task.set(data.requestID, req.callback);
        pinduoduo.print(data);
      } else {
        typeof req.callback === 'function' && req.callback({ msg: 'Cmpt unconnected' });
      }
    }
    if (cmpt === 'doudian') {
      if (doudian.status()) {
        typeof req.callback === 'function' && base.task.set(data.requestID, req.callback);
        doudian.print(data);
      } else {
        typeof req.callback === 'function' && req.callback({ msg: 'Cmpt unconnected' });
      }
    }
  }

}
export default new PrintBrigde();
