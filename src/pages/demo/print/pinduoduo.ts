/*
 * @Author: Mukti
 * @Date: 2022-01-14 15:36:06
 * @LastEditTime: 2022-01-16 22:54:42
 * @LastEditors: Mukti
 */
import base from './base';

class CainiaoCmpt {
  constructor() {
    this.connect();
  }

  private ws: any;

  connect() {
    this.ws = new WebSocket('ws://localhost:5000');
    this.ws.onerror = (err: any) => {
      this.handleConnect(err);
    };
    this.ws.onmessage = (res: any) => {
      base.handleMessage(res);
    };
    this.ws.onopen = (res: any) => {
      this.handleConnect(res);
    };
  }

  handleConnect(res: any) {
    base.task.get('pinduoduoConnect') && base.task.get('pinduoduoConnect')(res);
    base.task.delete('pinduoduoConnect');
  }

  status(): boolean {
    return this.ws.readyState === 1;
  }

  getPrinters(req: string) {
    this.ws.send(req);
  }

  print(data: any) {
    this.ws.send(JSON.stringify(data));
  }
}

export default new CainiaoCmpt();