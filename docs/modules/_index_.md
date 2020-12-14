**[mask-pi](../README.md)**

> [Globals](../globals.md) / "index"

# Module: "index"

## Index

### Variables

* [DISPLAY\_H](_index_.md#display_h)
* [DISPLAY\_W](_index_.md#display_w)
* [ENV](_index_.md#env)
* [SERVER\_PORT](_index_.md#server_port)
* [expressServer](_index_.md#expressserver)
* [puppeteerCoreCtrl](_index_.md#puppeteercorectrl)

## Variables

### DISPLAY\_H

• `Const` **DISPLAY\_H**: number = parseInt(ENV.DISPLAY\_H \|\| '635', 10)

*Defined in index.ts:11*

___

### DISPLAY\_W

• `Const` **DISPLAY\_W**: number = parseInt(ENV.DISPLAY\_W \|\| '2560', 10)

*Defined in index.ts:10*

___

### ENV

• `Const` **ENV**: ProcessEnv = process.env

*Defined in index.ts:8*

___

### SERVER\_PORT

• `Const` **SERVER\_PORT**: number = parseInt(ENV.SERVER\_PORT \|\| '5000', 10)

*Defined in index.ts:9*

___

### expressServer

• `Const` **expressServer**: [ExpressServer](../classes/_lib_express_controller_.expressserver.md) = new ExpressServer()

*Defined in index.ts:13*

___

### puppeteerCoreCtrl

• `Const` **puppeteerCoreCtrl**: [PuppeteerCoreController](../classes/_lib_puppeteer_core_controller_.puppeteercorecontroller.md) = new PuppeteerCoreController()

*Defined in index.ts:14*
