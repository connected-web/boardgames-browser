import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/PageLayout.js'

const Index = (props) => (
  <Layout>
    <h1>Board Games Browser</h1>
    <div className="stats">
      {props.games.map((game) => (
        <div className="stat" key={game.boardGameApiId}>
          <Link href={`/game?id=${game.boardGameApiId}`}>
            <a>{game.name}</a>
          </Link>
        </div>
      ))}
    </div>
  </Layout>
)

Index.getInitialProps = async function() {
  console.log('Get initial properties for Index')
  const res = await fetch('https://boardgames-api.calisaurus.net/api/boardgame/list')
  const data = await res.json() || { games: [] }

  console.log(`Game list fetched. Count: ${data.games.length}`)

  return {
    games: data.games
  }
}

export default Index
