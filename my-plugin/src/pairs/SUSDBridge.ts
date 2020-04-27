import { Mediator } from '@poanet/tokenbridge-bw-exchange'
import { sUSD, xsUSD } from '../index'

export default class SUSDBridge extends Mediator {
  constructor() {
    super({
      assetA: xsUSD.id,
      assetABridge: '0xD9a3039cfC70aF84AC9E566A2526fD3b683B995B',
      assetB: sUSD.id,
      assetBBridge: '0x71F12d03E1711cb96E11E1A5c12Da7466699Db8D'
    })
  }
}
