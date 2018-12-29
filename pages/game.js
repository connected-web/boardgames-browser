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
      <h1>{game.name}</h1>
      <div className="description">{game.description.map((line, idx) => (<p key={'line' + idx}>{line}</p>))}</div>
      <div className="stats">
        <div className="stat">
          <label>Total Games Played</label>
          <div className="value">{game.totalGamesPlayed}</div>
        </div>

        <section className={`coop stats ${game.coOpGamesPlayedCount ? 'visible' : 'hidden'}`}>
          <h2>Co Op Stats</h2>
          <div className="stat">
            <label>Co Op Games Played (Total)</label>
            <div className="value">{game.coOpGamesPlayedCount}</div>
          </div>
          <div className="stat">
            <label>Co Op Games Played (%)</label>
            <div className="value">{pct(game.coOpGamesPlayedPercentage)}</div>
          </div>
          <div className="stat">
            <label>Won</label>
            <div className="value">{game.coOpGameWins}</div>
            <div className="percentage">{pct(game.coOpWinRate)}</div>
          </div>
          <div className="stat">
            <label>Lost</label>
            <div className="value">{game.coOpGameLoses}</div>
            <div className="percentage">{pct(game.coOpLossRate)}</div>
          </div>
        </section>

        <section className={`competitive stats ${game.winnableGamesTotal ? 'visible' : 'hidden'}`}>
          <h2>Competitive Stats</h2>
          <div className="stat">
            <label>Competitive Games (Total)</label>
            <div className="value">{game.winnableGamesTotal}</div>
          </div>
          <div className="stat">
            <label>Hannah</label>
            <div className="value">{game.winCountHannah}</div>
            <div className="percentage">{pct(game.winRateHannah)}</div>
          </div>
          <div className="stat">
            <label>John</label>
            <div className="value">{game.winCountJohn}</div>
            <div className="percentage">{pct(game.winRateJohn)}</div>
          </div>
          <div className="stat">
            <label>Draw</label>
            <div className="value">{game.winCountDraw}</div>
            <div className="percentage">{pct(game.winRateDraw)}</div>
          </div>
          <div className="stat">
            <label>Other</label>
            <div className="value">{game.winCountOther}</div>
            <div className="percentage">{pct(game.winRateOther)}</div>
          </div>
          <div className="stat">
            <label>Most Won Games</label>
            <div className="value">{game.mostWonGames}</div>
          </div>
        </section>
      </div>
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
