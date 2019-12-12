import { InputStaticArgs, InputStaticMetadata } from './types'
import { FabRenderer } from '@fab/core'

export const render: FabRenderer<InputStaticArgs, InputStaticMetadata> = (
  args: InputStaticArgs,
  metadata: InputStaticMetadata
) => {
  console.log('I am render time')

  async function respond(request: Request) {
    return new Response('OK', {
      status: 200,
    })
  }

  return function handle(request: Request) {
    if (request.url === '/some-exact-path') {
      return respond(request)
    }
    return undefined
  }
}