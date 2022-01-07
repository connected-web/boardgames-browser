const { position } = require('promise-path')
const generatePlugins = require('./generatePlugins')
const generateSidebar = require('./generateSidebar')
const { name, logName } = require('../../package.json')

async function generateVueConfig() {
  const fromHere = position(__dirname)
  const vueConfig = {
    base: `/${name}/`,
    title: logName,
    themeConfig: {
      sidebar: await generateSidebar(),
      nav: [
        { text: 'Browser', link: '/browser/' },
        { text: 'Grids', link: '/grids/' },
        { text: 'Tags', link: '/tags/' },
        { text: 'Review', link: '/playrecords/review-records.md'},
        { text: 'Track', link: '/playrecords/boardgame-tracker.md'},
        { text: 'Github', link: 'https://github.com/connected-web/boardgames-browser' }
      ],
      siteRoot: fromHere('../'),
    },
    plugins: await generatePlugins()
  }
  return vueConfig
}

module.exports = generateVueConfig