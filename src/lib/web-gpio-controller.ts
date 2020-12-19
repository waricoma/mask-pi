'use strict';

import { requestGPIOAccess } from 'node-web-gpio';

import { requestI2CAccess } from 'node-web-i2c';
import SHT30 from '@chirimen/sht30';
import adc from 'mcp-spi-adc';
import delay from 'delay';

// function sleep (time: number): void{
// 	const d1: Date = new Date();
// 	while(true){
// 		const d2: Date = new Date();
// 		if(d2.getDate()- d1.getDate() > time){
// 			return;
// 		}
// 	}
// }

async function measure(sht30) {
  const { humidity, temperature } = await sht30.readData();
  const temperature_result: number = temperature.toFixed(2);
  const humidity_result: number = humidity.toFixed(2);
  await delay(50);
  return [temperature_result, humidity_result];
}

async function measureadc(): Promise<number> {
  try {
    const gas = adc.openMcp3002(0, async (err) => {
      if (err) throw err;
      await gas.read((err, reading) => {
        if (err) throw err;
        //console.log((reading.value * 3.3));
        const smell_result: number = reading.value * 5;
        return smell_result;
      });
    });
  } catch (err) {
    console.log(err.message);
    return;
  }
}

export class WebGPIO {
  private listeningBtnPort;
  private updateMaskTemp: (temp: number) => void;
  private updateMaskHum: (temp: number) => void;
  private updateMaskSmell: (temp: number) => void;

  public async setNumToListeningBtnPort(port: number): Promise<void> {
    const gpioAccess = await requestGPIOAccess();
    this.listeningBtnPort = gpioAccess.ports.get(port);
  }

  public setFuncToListeningBtn(func: (state: 0 | 1) => unknown): void {
    this.listeningBtnPort.onchange = func;
  }

  public setFuncToUpdateMaskTemp(func: (temp: number) => void): void {
    this.updateMaskTemp = func;
  }

  public setFuncToUpdateMaskHum(func: (temp: number) => void): void {
    this.updateMaskHum = func;
  }

  public setFuncToUpdateMaskSmell(func: (temp: number) => void): void {
    this.updateMaskSmell = func;
  }

  public async launchSencers(): Promise<void> {
    const gpioAccess = await requestGPIOAccess();
    const port3 = gpioAccess.ports.get(19);
    const port4 = gpioAccess.ports.get(26);
    await port3.export('out');
    await port4.export('out');

    const i2cAccess = await requestI2CAccess();
    const i2c1 = i2cAccess.ports.get(1);
    const sht30 = new SHT30(i2c1, 0x44);
    await sht30.init();
    let i = 0;
    setInterval(async () => {
      await port3.write(1);
      await delay(0.003);
      const smell_result = await measureadc();
      await delay(0.002);
      await port3.write(0);
      await port4.write(1);
      await delay(0.008);
      await port4.write(0);
      console.log(smell_result);
      this.updateMaskSmell(smell_result);
      if (i == 3) {
        const measure_result = await measure(sht30);
        console.log(measure_result[0]);
        this.updateMaskTemp(measure_result[0]);
        console.log(measure_result[1]);
        this.updateMaskHum(measure_result[1]);
        i = 0;
      }
      i++;
    }, 237);
  }
}
