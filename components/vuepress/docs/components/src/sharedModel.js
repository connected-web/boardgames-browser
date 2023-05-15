import getParamsFromUrl from './getParamsFromUrl'
import localStorage from './localStorage'

const state = {
  boardgamesApiUrl: 'https://boardgames-api.calisaurus.net',
  boardgamesSamApiUrl: 'https://nn58gn0krl.execute-api.eu-west-2.amazonaws.com/Prod',
  params: {},
  lastDateCode: false
}

state.boardgamesApiUrlStatus = `${state.boardgamesApiUrl}/api/status`
state.boardgamesSamApiUrlStatus = `${state.boardgamesSamApiUrl}/status`

function getStoredState () {
  let storedState
  try {
    storedState = JSON.parse(localStorage.getItem('sharedModel') || '{}')
  } catch (ex) {
    console.log('Invalid stored state found:', ex.message)
  }
  return storedState || {}
}

function saveStoredState () {
  const body = JSON.stringify(state)
  localStorage.setItem('sharedModel', body)
}

function update () {
  const storedState = getStoredState()
  Object.assign(state, storedState)
  if (typeof document !== 'undefined') {
    state.params = getParamsFromUrl(document.location)
  }
  if (state.params?.dateCode) {
    state.lastDateCode = state.params.dateCode
  }
  saveStoredState()
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
