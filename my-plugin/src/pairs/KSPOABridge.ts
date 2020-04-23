import Bridge from './Bridge'

export default class KSPOABridge extends Bridge {
  constructor() {
    super({
      assetA: 'spoa',
      assetABridge: '0x867949C3F2f66D827Ed40847FaA7B3a369370e13',
      assetB: 'kspoa',
      assetBBridge: '0x99FB1a25caeB9c3a5Bf132686E2fe5e27BC0e2dd'
    })
  }
}
