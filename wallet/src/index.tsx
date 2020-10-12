import React from 'react'
import ReactDOM from 'react-dom'
import BurnerCore from '@burner-wallet/core'
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers'
import { InfuraGateway, InjectedGateway, XDaiGateway } from '@burner-wallet/core/gateways'
import ModernUI from '@burner-wallet/modern-ui'
import Exchange, { XDaiBridge } from '@burner-wallet/exchange'
import MetamaskPlugin from '@burner-wallet/metamask-plugin'
import { MOON, xMOON, MOONBridge } from '@poanet/tokenbridge-bw-exchange'
import { Brick, xBrick, BRICKBridge } from 'my-plugin'

const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner({ privateKey: process.env.REACT_APP_PK, saveKey: false })],
  gateways: [new InjectedGateway(), new XDaiGateway(), new InfuraGateway(process.env.REACT_APP_INFURA_KEY)],
  assets: [MOON, Brick, xMOON, xBrick]
})

const exchange = new Exchange({
  pairs: [new MOONBridge(), new BRICKBridge()]
})

const BurnerWallet = () => <ModernUI title="Burner Wallet" core={core} plugins={[exchange, new MetamaskPlugin()]} />

ReactDOM.render(<BurnerWallet />, document.getElementById('root'))
