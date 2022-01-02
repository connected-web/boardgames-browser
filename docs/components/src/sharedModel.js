import getParamsFromUrl from './getParamsFromUrl'

const state = {
  boardgamesApiUrl: 'https://boardgames-api.calisaurus.net',
  boardgamesSamApiUrl: 'https://nn58gn0krl.execute-api.eu-west-2.amazonaws.com/Prod',
  params: {}
}

state.boardgamesApiUrlStatus = `${state.boardgamesApiUrl}/api/status`
state.boardgamesSamApiUrlStatus = `${state.boardgamesSamApiUrl}/status`

function update() {
  state.params = getParamsFromUrl(document.location)
}

function getAuthHeaders() {
  return {
    'calisaurus-user': localStorage.getItem('api-user-name'),
    'calisaurus-user-api-key': localStorage.getItem('api-user-key')
  }
}

update()

export default { update, state, getAuthHeaders }