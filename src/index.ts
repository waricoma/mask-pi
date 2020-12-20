'use strict';

import dotenv from 'dotenv';
import publicIp from 'public-ip';
import { ExpressServer } from './lib/express-controller';
import { ElectronController } from './lib/electron-controller';
import { WebGPIO } from './lib/web-gpio-controller';

dotenv.config();
const ENV = process.env;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
const SERVER_PORT: number = parseInt(ENV.SERVER_PORT || '5000', 10);
const DISPLAY_W: number = parseInt(ENV.DISPLAY_W || '2560', 10);
const DISPLAY_H: number = parseInt(ENV.DISPLAY_H || '635', 10);
const LISTEN_BTN_GPIO_NUM: number = parseInt(ENV.LISTEN_BTN_GPIO_NUM || '5', 10);

const expressServer = new ExpressServer();
const electronController = new ElectronController();
const webGPIO = new WebGPIO();

(async () => {
  await expressServer.listen(SERVER_PORT);
  await electronController.launchMaskPiDisplay({
    url: `http://${await publicIp.v4()}:${SERVER_PORT}/display/index.html`,
    w: DISPLAY_W,
    h: DISPLAY_H,
  });
  expressServer.setFuncToUpdateMaskMode((mode) => {
    electronController.updateMaskMode(mode);
  });
  expressServer.setFuncToUpdateMaskSpeech((speech) => {
    electronController.updateMaskSpeech(speech);
  });
  webGPIO.setNumToListeningBtnPort(LISTEN_BTN_GPIO_NUM);
  webGPIO.setFuncToListeningBtn((state) => {
    expressServer.setMaskBtn(state === 1);
  });
  // webGPIO.setFuncToUpdateMaskTemp((temp) => {
  //   expressServer.setMaskTemp(temp);
  // });
  // webGPIO.setFuncToUpdateMaskHum((hum) => {
  //   expressServer.setMaskHum(hum);
  // });
  // webGPIO.setFuncToUpdateMaskSmell((smell) => {
  //   expressServer.setMaskSmell(smell);
  // });
})();
