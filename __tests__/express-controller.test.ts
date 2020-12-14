'use strict';

import { ExpressServer } from '../lib/express-controller';

test('Initialized statuses are -1', () => {
  const expressServer = new ExpressServer();
  const maskStatus = expressServer.generateMaskStatusObj();

  expect(maskStatus.temp).toBe(-1);
  expect(maskStatus.hum).toBe(-1);
  expect(maskStatus.smell).toBe(-1);
});

test('If set 0 to mask status, statuses are 0', () => {
  const expressServer = new ExpressServer();

  expressServer.setMaskTemp(0);
  expressServer.setMaskHum(0);
  expressServer.setMaskSmell(0);

  const maskStatus = expressServer.generateMaskStatusObj();

  expect(maskStatus.temp).toBe(0);
  expect(maskStatus.hum).toBe(0);
  expect(maskStatus.smell).toBe(0);
});
