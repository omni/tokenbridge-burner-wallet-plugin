import { Mediator } from '@poanet/tokenbridge-bw-exchange'
import { Brick, xBrick } from '../index'

// Mediator contract address at the xDai chain
const homeMediatorAddress = '0xf85b17E64Bc788D0CB1A8c8C87c0d74e520c2A54'
// Mediator contract at the Ethereum Mainnet
const foreignMediatorAddress = '0xD925002f88279776dEB4907bA7F8dC173e2EA7a7'

export default class BRICKBridge extends Mediator {
  constructor() {
    super({
      assetA: Brick.id,
      assetABridge: foreignMediatorAddress,
      assetB: xBrick.id,
      assetBBridge: homeMediatorAddress
    })
  }
}