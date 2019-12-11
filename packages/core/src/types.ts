import { ProtoFab } from './models/ProtoFab'

export interface PluginArgs {
  [arg_name: string]: string | number | RegExp | undefined
}

export interface BuildConfig {
  [plugin_name: string]: PluginArgs
}

export interface FabConfig {
  build: BuildConfig
  runtime: string[]
  settings?: {
    [env_name: string]: {
      [var_name: string]: string
    }
  }
}

export interface PluginMetadata {
  [plugin_name: string]: {
    [metadata_name: string]: any
  }
}

export type FabBuilder<T extends PluginArgs, U extends PluginMetadata> = (
  args: T,
  proto_fab: ProtoFab<U>
) => Promise<void>

export type FabRenderer<T extends PluginArgs, U extends PluginMetadata> = (
  args: T,
  metadata: U
) => (request: Request) => Response

export interface FabPlugin<T extends PluginArgs, U extends PluginMetadata> {
  build: FabBuilder<T, U>
  render: FabRenderer<T, U>
}

export type FabFiles = Map<string, string>
