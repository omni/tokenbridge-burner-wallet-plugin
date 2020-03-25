import React from 'react'
import ReactDOM from 'react-dom'
import { NativeAsset, ERC20Asset } from '@burner-wallet/assets'
import BurnerCore from '@burner-wallet/core'
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers'
import { HTTPGateway } from '@burner-wallet/core/gateways'
import ModernUI from '@burner-wallet/modern-ui'
import Exchange from '@burner-wallet/exchange'
import { TestnetBridge } from 'tokenbridge-plugin'

const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner({ privateKey: process.env.REACT_APP_PK, saveKey: false })],
  gateways: [new HTTPGateway('https://sokol.poa.network', '77')],
  assets: [
    new ERC20Asset({
      id: 'wspoa',
      name: 'WSPOA',
      network: '42',
      // @ts-ignore
      address: process.env.REACT_APP_ERC20_ADDRESS
    }),
    new NativeAsset({
      id: 'spoa',
      name: 'sokol',
      network: '77'
    })
  ]
})

const exchange = new Exchange({
  pairs: [new TestnetBridge()]
})

const BurnerWallet = () => <ModernUI title="Local Wallet" core={core} plugins={[exchange]} />

ReactDOM.render(<BurnerWallet />, document.getElementById('root'))
