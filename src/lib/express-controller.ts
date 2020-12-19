'use strict';

import L from './logger';
import http from 'http';
import express from 'express';
import fileUpload from 'express-fileupload';
import os from 'os';
import fs from 'fs';

export class ExpressServer {
  private app = express();
  private maskTemp = -1;
  private maskHum = -1;
  private maskSmell = -1;
  private maskBtn = false;
  private maskMode: 'image' | 'voice' = 'voice';
  private updateMaskMode: (mode: 'image' | 'voice') => void;
  private updateMaskSpeech: (speech: string) => void;

  constructor() {
    this.app.use(express.static(`${__dirname}/../../public/mask-client/build/`));
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.get('/api/status', (req, res): void => {
      res.status(200).send(this.generateMaskStatusObj());
    });

    this.app.post('/api/image', (req, res): void => {
      if (!req.files) {
        res.status(400).send({ message: 'plz set a data of image' });
        return;
      }
      if (!req.files['files[image]']) {
        res.status(400).send({ message: 'plz set a image' });
        return;
      }
      if (['image/jpeg', 'image/png'].indexOf(req.files['files[image]'].mimetype) === -1) {
        res.status(400).send({ message: 'plz set a jpeg/png' });
        return;
      }

      fs.writeFileSync(`${__dirname}/../../public/display/image`, req.files['files[image]'].data);
      this.maskMode = 'image';
      this.updateMaskMode(this.maskMode);
      res.status(200).send({ message: 'updated' });
    });

    this.app.post('/api/speech', (req, res): void => {
      if (!('speech' in req.body)) {
        res.status(400).send({ message: 'plz set a value of speech' });
        return;
      }

      const speech = req.body.speech.trim().toLowerCase();

      this.maskMode = 'voice';
      this.updateMaskMode(this.maskMode);
      this.updateMaskSpeech(speech);
      res.status(200).send({ message: 'received a speech' });
    });

    this.app.post('/api/mode', (req, res): void => {
      if (!('mode' in req.body)) {
        res.status(400).send({ message: 'plz set a value of mode', mode: this.maskMode });
        return;
      }

      const mode = req.body.mode.trim().toLowerCase();

      if (['image', 'voice'].indexOf(mode) === -1) {
        res.status(400).send({ message: 'a value of mode is only image/voice', mode: this.maskMode });
        return;
      }

      this.maskMode = mode;
      this.updateMaskMode(this.maskMode);
      res.status(200).send({ message: 'updated', mode: this.maskMode });
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

  public setMaskBtn(btn: boolean): void {
    this.maskBtn = btn;
  }

  public generateMaskStatusObj(): { temp: number; hum: number; smell: number; btn: boolean } {
    return { temp: this.maskTemp, hum: this.maskHum, smell: this.maskSmell, btn: this.maskBtn };
  }

  public setFuncToUpdateMaskMode(func: (mode: 'image' | 'voice') => void): void {
    this.updateMaskMode = func;
  }

  public setFuncToUpdateMaskSpeech(func: (speech: string) => void): void {
    this.updateMaskSpeech = func;
  }

  public async listen(port: number): Promise<void> {
    const welcome = (p: number) => (): void =>
      L.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`);

    http.createServer(this.app).listen(port || 5000, welcome(port || 5000));
  }
}
