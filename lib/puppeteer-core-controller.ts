'use strict';

import puppeteer from 'puppeteer-core';

export class PuppeteerCoreController {
  private browser;
  private page;

  public async launchMaskPiDisplay(ops: { url: string; w: number | 2560; h: number | 635 }): Promise<void> {
    /**
     * Recommended: `sudo apt install chromium-browser chromium-codecs-ffmpeg`
     */
    this.browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser',
      args: [
        '--start-fullscreen',
        '--window-position=0,0',
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
      ],
    });
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: ops.w, height: ops.h });
    await this.page.goto(ops.url, { waitUntil: 'networkidle2' });
  }
}
