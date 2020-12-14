'use strict';

import L from './logger';
import http from 'http';
import express from 'express';
import fileUpload from 'express-fileupload';
import os from 'os';

export class ExpressServer {
  private app = express();
  private maskTemp = -1;
  private maskHum = -1;
  private maskSmell = -1;

  constructor() {
    this.app.use(express.static('../public/'));
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );

    this.app.get('/api/status', (req, res): void => {
      res.status(200).send(this.generateMaskStatusObj());
    });
  }

  public setMaskTemp(temp: number): void {
    this.maskTemp = temp;
  }

  public setMaskHum(hum: number): void {
    this.maskHum = hum;
  }

  public setMaskSmell(smell: number): void {
    this.maskSmell = smell;
  }

  public generateMaskStatusObj(): { temp: number; hum: number; smell: number } {
    return { temp: this.maskTemp, hum: this.maskHum, smell: this.maskSmell };
  }

  public async listen(port: number): Promise<void> {
    const welcome = (p: number) => (): void =>
      L.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`);

    http.createServer(this.app).listen(port || 5000, welcome(port || 5000));
  }
}
