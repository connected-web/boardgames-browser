const path = require('path')
const handlebars = require('handlebars')
const { read, write, fetch, position, make, clean } = require('promise-path')
const fromHere = position(__dirname)
const report = (...messages) => console.log(`[${require(fromHere('package.json')).logName} / ${path.parse(__dirname).base}]`, ...messages)

async function readTemplate(path) {
  const templateString = await read(path, 'utf8')
  report('Template', templateString.length, 'bytes')
  try {
    const template = handlebars.compile(templateString)
    template({})
    return template
  } catch(ex) {
    report('Unable to compile handlebars template', path, ex)
  }
}

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

  await clean(fromHere('content/games'))
  await make(fromHere('content/games'))

  const renderLinksTemplate = await readTemplate(fromHere('templates/links.html'))
  const linkIndexHtml = renderLinksTemplate(boardGameList)
  await write(fromHere(`content/index.html`), linkIndexHtml, 'utf8')

  const renderGameTemplate = await readTemplate(fromHere('templates/game.html'))
  const work = boardGameList.games.map((listEntry, index) => {
    return async () => {
      report(index, 'Fetching', listEntry.name, ':', listEntry.boardGameApiId)
      const boardGame = await fetchJson(`https://boardgames-api.calisaurus.net/api/boardgame/by/${listEntry.boardGameApiId}`) || false
      if (boardGame) {
        Object.entries(boardGame.game).map(kvp => {
          if (kvp[0].toLowerCase().indexOf('rate') !== -1) {
            boardGame.game[kvp[0]] = (kvp[1] * 100).toPrecision(3) + '%'
          }
        })
        const gameHtml = renderGameTemplate(boardGame)
        report(index, 'Rendering', listEntry.name, ':', listEntry.boardGameApiId)
        return write(fromHere(`content/games/${boardGame.game.boardGameApiId}.html`), gameHtml, 'utf8')
      }
      return false
    }
  })

  do {
    const batch = []
    while (batch.length < 10 && work.length > 0) {
      const workItem = work.shift()
      batch.push(workItem)
    }
    await Promise.all(batch.map(n => n()))
    while (batch.length > 0) {
      batch.pop()
    }
  } while (work.length > 0)
}

start()
