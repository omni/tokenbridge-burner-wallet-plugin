import { BurnerPluginContext, Plugin } from '@burner-wallet/types'

export default class AmbMediator implements Plugin {
  private pluginContext?: BurnerPluginContext

  initializePlugin(pluginContext: BurnerPluginContext) {
    this.pluginContext = pluginContext
  }
}
