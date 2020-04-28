import React from 'react'
import ReactDOM from 'react-dom'
import BurnerCore from '@burner-wallet/core'
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers'
import { InfuraGateway, InjectedGateway } from '@burner-wallet/core/gateways'
import ModernUI from '@burner-wallet/modern-ui'
import Exchange from '@burner-wallet/exchange'
import MetamaskPlugin from '@burner-wallet/metamask-plugin'
import { ERC677Asset, Mediator, TokenBridgeGateway } from '@poanet/tokenbridge-bw-exchange'

const sStake = new ERC677Asset({
  id: 'sstake',
  name: 'sStake',
  network: '77',
  address: '0x' // TODO set address
})

const kStake = new ERC677Asset({
  id: 'kstake',
  name: 'kStake',
  network: '42',
  address: '0x' // TODO set address
})

const StakeBridgePair = new Mediator({
  assetA: sStake.id,
  assetABridge: '0x', // TODO set address
  assetB: kStake.id,
  assetBBridge: '0x' // TODO set address
})

const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner({ privateKey: process.env.REACT_APP_PK, saveKey: false })],
  gateways: [new InjectedGateway(), new TokenBridgeGateway(), new InfuraGateway(process.env.REACT_APP_INFURA_KEY)],
  assets: [sStake, kStake]
})

const exchange = new Exchange({
  pairs: [StakeBridgePair]
})

const BurnerWallet = () => <ModernUI title="Burner Wallet" core={core} plugins={[exchange, new MetamaskPlugin()]} />

ReactDOM.render(<BurnerWallet />, document.getElementById('root'))
