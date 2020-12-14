**[mask-pi](../README.md)**

> [Globals](../globals.md) / ["lib/express-controller"](../modules/_lib_express_controller_.md) / ExpressServer

# Class: ExpressServer

## Hierarchy

* **ExpressServer**

## Index

### Constructors

* [constructor](_lib_express_controller_.expressserver.md#constructor)

### Properties

* [app](_lib_express_controller_.expressserver.md#app)
* [maskHum](_lib_express_controller_.expressserver.md#maskhum)
* [maskSmell](_lib_express_controller_.expressserver.md#masksmell)
* [maskTemp](_lib_express_controller_.expressserver.md#masktemp)

### Methods

* [generateMaskStatusObj](_lib_express_controller_.expressserver.md#generatemaskstatusobj)
* [listen](_lib_express_controller_.expressserver.md#listen)
* [setMaskHum](_lib_express_controller_.expressserver.md#setmaskhum)
* [setMaskSmell](_lib_express_controller_.expressserver.md#setmasksmell)
* [setMaskTemp](_lib_express_controller_.expressserver.md#setmasktemp)

## Constructors

### constructor

\+ **new ExpressServer**(): [ExpressServer](_lib_express_controller_.expressserver.md)

*Defined in lib/express-controller.ts:13*

**Returns:** [ExpressServer](_lib_express_controller_.expressserver.md)

## Properties

### app

• `Private` **app**: any = express()

*Defined in lib/express-controller.ts:10*

___

### maskHum

• `Private` **maskHum**: number = -1

*Defined in lib/express-controller.ts:12*

___

### maskSmell

• `Private` **maskSmell**: number = -1

*Defined in lib/express-controller.ts:13*

___

### maskTemp

• `Private` **maskTemp**: number = -1

*Defined in lib/express-controller.ts:11*

## Methods

### generateMaskStatusObj

▸ **generateMaskStatusObj**(): object

*Defined in lib/express-controller.ts:40*

**Returns:** object

Name | Type |
------ | ------ |
`hum` | number |
`smell` | number |
`temp` | number |

___

### listen

▸ **listen**(`port`: number): Promise\<void>

*Defined in lib/express-controller.ts:44*

#### Parameters:

Name | Type |
------ | ------ |
`port` | number |

**Returns:** Promise\<void>

___

### setMaskHum

▸ **setMaskHum**(`hum`: number): void

*Defined in lib/express-controller.ts:32*

#### Parameters:

Name | Type |
------ | ------ |
`hum` | number |

**Returns:** void

___

### setMaskSmell

▸ **setMaskSmell**(`smell`: number): void

*Defined in lib/express-controller.ts:36*

#### Parameters:

Name | Type |
------ | ------ |
`smell` | number |

**Returns:** void

___

### setMaskTemp

▸ **setMaskTemp**(`temp`: number): void

*Defined in lib/express-controller.ts:28*

#### Parameters:

Name | Type |
------ | ------ |
`temp` | number |

**Returns:** void
