import { Command, flags } from '@oclif/command'
import { DEFAULT_CONFIG_FILENAME } from '@fab/core'
import Packager from '../actions/Packager'

export default class Deploy extends Command {
  static description = 'Package a FAB to be uploaded to a hosting provider manually'

  static examples = [`$ fab package --target=aws-lambda-edge fab.zip`]

  static flags = {
    help: flags.help({ char: 'h' }),
    config: flags.string({
      char: 'c',
      description: 'Path to config file',
      default: DEFAULT_CONFIG_FILENAME,
    }),
    target: flags.string({
      char: 't',
      description: `Hosting provider (currently one of 'aws-lambda-edge', 'cf-workers')`,
    }),
    'output-path': flags.string({
      description: 'Where to save the packaged FAB (default .fab/deploy/[target].zip)',
    }),
    'asset-url': flags.string({
      description:
        'A URL for where the assets can be accessed, for server deployers that need it',
    }),
  }

  static args = [{ name: 'file' }]

  async run() {
    const { args, flags } = this.parse(Deploy)
    const { file } = args
    if (!file) {
      this.error(`You must provide a FAB file to package (e.g. fab.zip)`)
    }
    if (!flags.target) {
      this.error(`You must provide a target.`)
    }
    await Packager.package(file, flags.target, flags['output-path'], flags['asset-url'])
  }
}