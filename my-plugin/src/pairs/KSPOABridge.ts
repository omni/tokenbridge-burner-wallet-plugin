import { Mediator } from '@poanet/tokenbridge-bw-exchange'
import { sPOA, ksPOA } from '../index'

export default class KSPOABridge extends Mediator {
  constructor() {
    super({
      assetA: sPOA.id,
      assetABridge: '0x867949C3F2f66D827Ed40847FaA7B3a369370e13',
      assetB: ksPOA.id,
      assetBBridge: '0x99FB1a25caeB9c3a5Bf132686E2fe5e27BC0e2dd'
    })
  }
}
