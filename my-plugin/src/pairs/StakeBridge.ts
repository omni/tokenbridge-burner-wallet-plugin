import { Mediator } from '@poanet/tokenbridge-bw-exchange'
import { Stake, xStake } from '../index'

export default class StakeBridge extends Mediator {
  constructor() {
    super({
      assetA: xStake.id,
      assetABridge: '0x', // TODO set address
      assetB: Stake.id,
      assetBBridge: '0x' // TODO set address
    })
  }
}
