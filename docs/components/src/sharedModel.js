/* global localStorage */
import getParamsFromUrl from './getParamsFromUrl'

const state = {
  boardgamesApiUrl: 'https://boardgames-api.calisaurus.net',
  boardgamesSamApiUrl: 'https://nn58gn0krl.execute-api.eu-west-2.amazonaws.com/Prod',
  params: {}
}

state.boardgamesApiUrlStatus = `${state.boardgamesApiUrl}/api/status`
state.boardgamesSamApiUrlStatus = `${state.boardgamesSamApiUrl}/status`

function update () {
  if (typeof document !== 'undefined') {
    state.params = getParamsFromUrl(document.location)
  }
}

function getAuthHeaders () {
  const ls = (typeof localStorage !== 'undefined') ? localStorage : { getItem () { return 'Local' } }
  return {
    'calisaurus-user': ls.getItem('api-user-name'),
    'calisaurus-user-api-key': ls.getItem('api-user-key')
  }
}

update()

export default { update, state, getAuthHeaders }
