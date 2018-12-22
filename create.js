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

  await clean(fromHere('content'))
  await make(fromHere('content/games'))

  const renderLinksTemplate = await readTemplate(fromHere('templates/links.html'))
  const linkIndexHtml = renderLinksTemplate(boardGameList)
  await write(fromHere(`content/index.html`), linkIndexHtml, 'utf8')

  const renderGameTemplate = await readTemplate(fromHere('templates/game.html'))
  const work = boardGameList.games.map(listEntry => {
    return async () => {
      report('Fetching', listEntry.name, ':', listEntry.boardGameApiId)
      const boardGame = await fetchJson(`https://boardgames-api.calisaurus.net/api/boardgame/by/${listEntry.boardGameApiId}`) || false
      if (boardGame) {
        const gameHtml = renderGameTemplate(boardGame)
        return write(fromHere(`content/games/${boardGame.game.boardGameApiId}.html`), gameHtml, 'utf8')
      }
      return false
    }
  })

  do {
    let count = 0
    const batch = []
    while (batch.length < 10 && work.length > 0) {
      const workItem = work.pop()
      batch.push(workItem)
      count++
    }
    await Promise.all(batch.map(n => n()))
    if (count >= 10) {
      return
    }
    while (batch.length > 0) {
      batch.pop()
    }
  } while (work.length > 0)
}

start()
