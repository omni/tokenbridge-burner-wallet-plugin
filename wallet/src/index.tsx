import React from 'react'
import ReactDOM from 'react-dom'
import BurnerCore from '@burner-wallet/core'
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers'
import { HTTPGateway, InfuraGateway, InjectedGateway } from '@burner-wallet/core/gateways'
import ModernUI from '@burner-wallet/modern-ui'
import Exchange from '@burner-wallet/exchange'
import { sPOA, ksPOA, KSPOABridge } from 'my-plugin'
import MetamaskPlugin from '@burner-wallet/metamask-plugin'

const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner({ privateKey: process.env.REACT_APP_PK, saveKey: false })],
  gateways: [
    new InjectedGateway(),
    new HTTPGateway('https://sokol.poa.network', '77'),
    new InfuraGateway(process.env.REACT_APP_INFURA_KEY)
  ],
  assets: [sPOA, ksPOA]
})

const exchange = new Exchange({
  pairs: [new KSPOABridge()]
})

const BurnerWallet = () => <ModernUI title="Local Wallet" core={core} plugins={[exchange, new MetamaskPlugin()]} />

ReactDOM.render(<BurnerWallet />, document.getElementById('root'))
