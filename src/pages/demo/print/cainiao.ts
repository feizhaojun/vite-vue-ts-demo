/*
 * @Author: Mukti
 * @Date: 2022-01-14 15:36:06
 * @LastEditTime: 2022-01-16 22:54:38
 * @LastEditors: Mukti
 */
import base from './base';

class CainiaoCmpt {
  constructor() {
    this.connect();
  }

  private ws: any;

  connect() {
    this.ws = new WebSocket('ws://localhost:13528');
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
    base.task.get('cainiaoConnect') && base.task.get('cainiaoConnect')(res);
    base.task.delete('cainiaoConnect');
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