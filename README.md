# TokenBridge Burner Wallet 2 Plugin Sample

This sample plugin defines a mediator extension exchange pair to be used in the Exchange Plugin in the burner wallet. 
It uses the resources from the `@poanet/tokenbridge-bw-exchange` npm package to define new assets and exchange pairs.

### Introduction
The [Burner Wallet 2.0](https://github.com/burner-wallet/burner-wallet-2) is a modular, extendable and customizable web application.
It provides a set of packages and plugins that allow you to extend the basic functionality. Here we will focus on the Assets package and the Exchange Plugin.

#### Assets
You can add any native or ERC20 token to track its balance and send transactions. For example you can define a new ERC20 and add it to the wallet:
```javascript
import { xdai, dai, eth, ERC20Asset } from '@burner-wallet/assets';

const test = new ERC20Asset({
  id: 'tst', // The internal ID used by the wallet.
  name: 'Test Token', // The display name that will be displayed to the user.
  network: '1', // The chain ID of the chain the token is deployed to.
  address: '0x52ad726d80dbb4A9D4430d03657467B99843406b' // Address where the token contract is deployed
});

const core = new BurnerCore({
  assets: [test, xdai, dai, eth],
});
```

The `ERC20Asset` class extends from the `Asset` class. The `Asset` class provides several methods to allow the wallet interact with the token.
The following are the most important to pay attention and that could be overridden if your token behaves differently.
- `getBalance`: Indicates how to get the balance of your asset.
- `startWatchingAddress`: Indicates how to listen to value transfers incoming into your account.
- `_send`: Indicates how to send value to another account.

#### Exchange Plugin
The `@burner-wallet/exchange` package is an extendable plugin for implementing asset exchanges and bridges.
The exchange module accepts an array of trading pairs.
```
const exchange = new Exchange({
  pairs: [new Pair1(), new Pair2()]
})
```

`Pair` is an abstract class that defines the interface for trading pairs. If you would like to add custom trading functionality, you can extend this class and implement it's methods:
- `estimateAtoB`: Indicates how to estimate the B Asset the user will receive for the amount of A Asset. For example Fees could be considered here.
- `estimateBtoA`: Indicates how to estimate the A Asset the user will receive for the amount of B Asset. For example Fees could be considered here.
- `exchangeAtoB`: Indicates how to send A Asset to be exchanged for B Asset. Here you can add logic to detect exchange finalization for example for a more complex exchange operation like bridges.
- `exchangeBtoA`: Indicates how to send B Asset to be exchanged for A Asset. Here you can add logic to detect exchange finalization for example for a more complex exchange operation like bridges.

### Project structure
There are three main folders in the project:
- `wallet` - is a burner wallet instance ready to use your plugin
- `test-wallet` - is a burner wallet instance ready to test your plugin and resources in testnets
- `my-plugin` - is the folder where the plugin code is located. To change the name of the plugin it is necessary to update the folder name `my-plugin` and all mentions to `my-plugin` to the new name of your plugin.

Inside `my-plugin` you can find the files that defines the resources to be exposed by the plugin to be used by the burner wallet in order to interact with the ERC677 to ERC677 bridge extension:
- `Stake` - extends from `ERC677Asset` defined in `@poanet/tokenbridge-bw-exchange`
- `xStake` - extends from `ERC677Asset` defined in `@poanet/tokenbridge-bw-exchange`
- `StakeBridge` - extends from `Mediator` defined in `@poanet/tokenbridge-bw-exchange`

The class `ERC677Asset` extends from `ERC20Asset` and overrides some methods:
- `_send`: In this case the method `transferAndCall` is used instead of the `transfer` method.
- `startWatchingAddress`: Add logic to correctly track the transfer events related to the wallet account.
- `getTx`: Overrides the logic to return the stored information about a transfer transaction to avoid errors on the information displayed.

The class `Mediator` extend from some other classes that has `Pair` as base. It implements the previous mentioned methods to estimate and exchange the assets. It also implements some methods to detect the exchange finalization.
Here are some details of the implemented methods:
- `estimateAtoB`: Get the fee and calculates the amount of B Asset the user will receive.
- `estimateBtoA`: Get the fee and calculates the amount of A Asset the user will receive.
- `exchangeAtoB`: Sends A Asset to the mediator contract. Then it calls `detectExchangeAToBFinished`.
- `exchangeBtoA`: Sends B Asset to the mediator contract. Then it calls `detectExchangeBToAFinished`.
- `detectExchangeAToBFinished`: Wait for events emitted by the mediator contract to detect the exchange finalization.
- `detectExchangeBToAFinished`: Wait for events emitted by the mediator contract to detect the exchange finalization.

In this repo example case, the class `StakeBridge` extends the `Mediator` class but has some differences on how to estimate the values and calculate the transfers fees.
That's why it overrides the methods:
- `estimateAtoB`: To add specific logic to get the fee from the A to B exchange and estimate the value that will be received.
- `estimateBtoA`: To avoid fee calculations since there are no fees for B to A exchange.

You can extend or replace these resources based on your use case.

Inside the wallet folder, the file `wallet/src/index.tsx` integrates the plugin into the wallet by importing the resources in the following line:

```
import { Stake, xStake, StakeBridge } from 'my-plugin'
```

To be able to use and to display the balances for Stake and xStake it is necessary to list them in the list of assets as follow:
```
const core = new BurnerCore({
    ...
  assets: [Stake, xStake]
})
```

Then, in order to perform exchange operations between the assets it is needed that the defined pair is included in the Exchange plugin as follows:
```
const exchange = new Exchange({
  pairs: [new StakeBridge()]
})
```

### Clone the sample repo 
Clone the sample repo to create a plugin project that uses the TokenBridge plugin. This sample repo contains a ready to publish plugin for a ERC677 to ERC677 bridge extension, but you can later modify it to define your own resources.


### Install dependencies
Run `yarn install`. This repo uses Lerna and Yarn Workspaces, so `yarn install` will install all dependencies and link modules in the repo.

### Build
To build the plugin package, from the root folder of project, you need to run the following command:
```
yarn build
```

### Test plugin and resources in testnets
The project includes a burner wallet instance where you can test the implementation of the plugin in testnet. For that, you have to make sure that the build step was performed and that the plugin resources you modified are correctly imported and used in the `src/index.tsx` file of the `test-wallet` folder.

1. Create `.env` file in `test-wallet` folder from `.env.example` and set the required parameters for the ERC677 to ERC677 bridge extension:
```
REACT_APP_INFURA_KEY=<your key from infura.com>
REACT_APP_HOME_NETWORK=
REACT_APP_HOME_TOKEN_NAME=
REACT_APP_HOME_TOKEN_ADDRESS=
REACT_APP_HOME_MEDIATOR_ADDRESS=

REACT_APP_FOREIGN_NETWORK=
REACT_APP_FOREIGN_TOKEN_NAME=
REACT_APP_FOREIGN_TOKEN_ADDRESS=
REACT_APP_FOREIGN_MEDIATOR_ADDRESS=
```

2. To start the burner wallet instance run:
```
yarn start-test-wallet
```

### Run plugin in Mainnet
The project includes a burner wallet instance where you can use the implementation of the plugin. For that, you have to make sure that the build step was performed and that the plugin resources you modified are correctly imported and used in the `src/index.tsx` file of the `wallet` folder.

1. Create `.env` file in `wallet` folder and set:
```
REACT_APP_INFURA_KEY=<your key from infura.com>
```

2. To start the burner wallet instances run:
```
yarn start-wallet
```

### Publish to npm
In order to make the plugin accessible it needs to be published in the npm registry. For that, you can follow these steps:

1. Create account in https://www.npmjs.com/

2. Go to `my-plugin` folder

3. Run `yarn build`. Make sure it generates the `dist` folder

4. Update `version` in `my-plugin/package.json`

5. Run `yarn publish` and fill login information if required.
The prompt will ask for the new version, complete it with the version from `my-plugin/package.json`


More information in https://classic.yarnpkg.com/en/docs/publishing-a-package/
