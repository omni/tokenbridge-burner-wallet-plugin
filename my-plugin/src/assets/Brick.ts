import { BridgeableERC20Asset } from '@poanet/tokenbridge-bw-exchange'

export default new BridgeableERC20Asset({
  id: 'brick',    //internal id of the asset
  name: 'BRICK',  //displayed name of the asset
  network: '4',  //chain id (ethereum mainnet)
  address: '0xe0d8d7b8273de14e628d2f2a4a10f719f898450a',
  icon: 'https://preview.redd.it/cbw6un5omly41.png?width=80&format=png&auto=webp&s=f36779c74e698e7136bb0b9dcc9f8e30d9260e24',
  bridgeModes: ['erc-to-erc-amb']
})