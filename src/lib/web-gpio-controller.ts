'use strict';

import { requestGPIOAccess } from 'node-web-gpio';

export class WebGPIO {
  private listeningBtnPort;

  public async setNumToListeningBtnPort(port: number): Promise<void> {
    const gpioAccess = await requestGPIOAccess();
    this.listeningBtnPort = gpioAccess.ports.get(port);
  }

  public setFuncToListeningBtn(func: (state: 0 | 1) => unknown): void {
    this.listeningBtnPort.onchange = func;
  }
}
