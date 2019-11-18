import * as execa from 'execa'

it('should pass a noop', () => {
  expect(1+1).toBe(2)
})

it('should have our packages locally', async () => {
  const { stdout: bins } = await execa.command(`ls -l node_modules/.bin`)
  console.log({bins})
  expect(bins).toMatch(/definitely-not-there/)
})