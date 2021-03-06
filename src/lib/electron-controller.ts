'use strict';

import electron from 'electron';
import qr from 'qr-image';
import fs from 'fs';

export class ElectronController {
  private win: electron.BrowserWindow;
  private app = electron.app;
  private maskSpeech = 'white';
  readonly wordToColor = {
    white: '#000000',
    black: '#FFFFFF',
    red: '#FF0000',
    green: '#008000',
    blue: '#0000FF',
    yellow: '#FFFF00',
  };

  public async generateQrCode(url: string): Promise<void> {
    const qrPng = qr.imageSync(url, { type: 'png' });
    fs.writeFileSync(`${__dirname}/../../public/display/image`, qrPng);
  }

  public async launchMaskPiDisplay(ops: { url: string; w: number; h: number }): Promise<void> {
    await this.generateQrCode(ops.url);

    let win: electron.BrowserWindow;

    await new Promise<void>((resolve) => {
      this.app.on('ready', () => {
        win = new electron.BrowserWindow({
          width: ops.w,
          height: ops.h,
          x: 0,
          y: 0,
          fullscreen: true,
          frame: false,
          webPreferences: {
            nodeIntegration: true,
          },
        });

        // win.webContents.openDevTools();
        win.loadURL(`file://${__dirname}/../../public/display/index.html`);

        win.on('closed', () => {
          win = null;
        });

        win.webContents.on('did-finish-load', () => {
          resolve();
        });
      });
    });

    this.win = win;
  }

  public updateMaskMode(mode: 'image' | 'voice'): void {
    if (mode === 'image') {
      this.updateMaskModeToImage();
      return;
    }

    this.updateMaskModeToVoice();
  }

  readonly updateMaskModeToImage = (): void => {
    this.win.webContents.send('reload-mask-image');
  };

  private updateMaskModeToVoice(): void {
    this.updateMaskSpeech(this.maskSpeech);
  }

  public updateMaskSpeech(speech: string): void {
    this.maskSpeech = speech;
    if (this.wordToColor[speech]) {
      this.win.webContents.send('update-background-color', this.wordToColor[speech]);
      return;
    }

    console.log(`recognized: ${speech}`);
  }
}
