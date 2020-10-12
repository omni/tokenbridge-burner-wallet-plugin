import { ERC677Asset } from '@poanet/tokenbridge-bw-exchange'

export default new ERC677Asset({
  id: 'xbrick',    //internal id of the asset
  name: 'xBRICK',  //displayed name of the asset
  network: '100', //chain id (xdai chain)
  address: '0x2f9ceBf5De3bc25E0643D0E66134E5bf5c48e191', //token contract address
  icon: 'https://preview.redd.it/cbw6un5omly41.png?width=80&format=png&auto=webp&s=f36779c74e698e7136bb0b9dcc9f8e30d9260e24'
})