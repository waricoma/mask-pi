'use strict';

import dotenv from 'dotenv';
import { ExpressServer } from './lib/express-controller';
import { PuppeteerCoreController } from './lib/puppeteer-core-controller';

dotenv.config();
const ENV = process.env;
const SERVER_PORT: number = parseInt(ENV.SERVER_PORT || '5000', 10);
const DISPLAY_W: number = parseInt(ENV.DISPLAY_W || '2560', 10);
const DISPLAY_H: number = parseInt(ENV.DISPLAY_H || '635', 10);

const expressServer = new ExpressServer();
const puppeteerCoreCtrl = new PuppeteerCoreController();

(async () => {
  await expressServer.listen(SERVER_PORT);
  await puppeteerCoreCtrl.launchMaskPiDisplay({
    url: `http://localhost:${SERVER_PORT}/display/index.html`,
    w: DISPLAY_W,
    h: DISPLAY_H,
  });
})();
