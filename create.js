const path = require('path')
const { fetch, position } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('package.json')).logName} / ${path.parse(__dirname).base}]`, ...messages)

const fetchJson = async (path) => {
  const contents = await fetch(path)
  try {
    const data = JSON.parse(contents)
    return data
  }
  catch (ex) {
    report('Unable to fetch data from', path, ex, (contents + '').substring(0, 200), '...')
    return false
  }
}

async function start() {
  const boardGameList = await fetchJson('https://boardgames-api.calisaurus.net/api/boardgame/list') || { games: [] }

  report(boardGameList)
  boardGameList.games.forEach(boardGame => {
    report(boardGame.name, ':', boardGame.boardGameApiId)
  })
}

start()
