import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/PageLayout.js'

const Game = (props) => renderGame(props.game)

function pct(val) {
  return (val * 100).toPrecision(3) + '%'
}

function renderGame(game) {
  return (
    <Layout>
      <heading>{game.name}</heading>
      <stats>
        <stat>
          <label>Total Games Played</label>
          <value>{game.totalGamesPlayed}</value>
        </stat>

        <section className={`coop stats ${game.coOpGamesPlayedCount ? 'visible' : 'hidden'}`}>
          <heading>Co Op Stats</heading>
          <stat>
            <label>Co Op Games Played (Total)</label>
            <value>{game.coOpGamesPlayedCount}</value>
          </stat>
          <stat>
            <label>Co Op Games Played (%)</label>
            <value>{pct(game.coOpGamesPlayedPercentage)}</value>
          </stat>
          <stat>
            <label>Won</label>
            <value>{game.coOpGameWins}</value>
            <percentage>{pct(game.coOpWinRate)}</percentage>
          </stat>
          <stat>
            <label>Lost</label>
            <value>{game.coOpGameLoses}</value>
            <percentage>{pct(game.coOpLossRate)}</percentage>
          </stat>
        </section>

        <section className={`competitive stats ${game.winnableGamesTotal ? 'visible' : 'hidden'}`}>
          <heading>Competitive Stats</heading>
          <stat>
            <label>Competitive Games (Total)</label>
            <value>{game.winnableGamesTotal}</value>
          </stat>
          <stat>
            <label>Hannah</label>
            <value>{game.winCountHannah}</value>
            <percentage>{pct(game.winRateHannah)}</percentage>
          </stat>
          <stat>
            <label>John</label>
            <value>{game.winCountJohn}</value>
            <percentage>{pct(game.winRateJohn)}</percentage>
          </stat>
          <stat>
            <label>Draw</label>
            <value>{game.winCountDraw}</value>
            <percentage>{pct(game.winRateDraw)}</percentage>
          </stat>
          <stat>
            <label>Other</label>
            <value>{game.winCountOther}</value>
            <percentage>{pct(game.winRateOther)}</percentage>
          </stat>
          <stat>
            <label>Most Won Games</label>
            <value>{game.mostWonGames}</value>
          </stat>
        </section>
      </stats>
    </Layout>
  )
}

Game.getInitialProps = async function(context) {
  console.log('Get initial properties for Game :', context.query.id)
  const res = await fetch(`https://boardgames-api.calisaurus.net/api/boardgame/by/${context.query.id}`)
  const data = await res.json()

  return {
    game: data.game
  }
}

export default Game
