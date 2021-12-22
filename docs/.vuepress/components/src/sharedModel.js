import getParamsFromUrl from './getParamsFromUrl'

const state = {
  boardgamesApiUrl: 'https://boardgames-api.calisaurus.net',
  boardgamesSamApiUrl: 'https://nn58gn0krl.execute-api.eu-west-2.amazonaws.com/Prod',
  params: {}
}

function update() {
  state.params = getParamsFromUrl(document.location)
}

update()

export default { update, state }