import Bridge from './Bridge'

export default class TestnetBridge extends Bridge {
  constructor() {
    super({
      assetA: 'spoa',
      assetABridge: '',
      assetB: 'wspoa',
      assetBBridge: ''
    })
  }
}
