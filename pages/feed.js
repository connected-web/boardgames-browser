import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/PageLayout.js'

const Feed = (props) => (
  <Layout>
    <h1>Board Games Feed</h1>
    <div className='feed'>
      {props.feed.map((game) => (
        <div className='feed item' key={game.name}>
          <h2>{game.name}</h2>
          <div className='stat date'>
            <label>Date</label>
            <div className='value'>{game.date}</div>
          </div>
          <div className='stat coOp'>
            <label>Co-op</label>
            <div className='value'>{game.coOp}</div>
          </div>
          <div className='stat coOpOutcome'>
            <label>Co-op Outcome</label>
            <div className='value'>{game.coOpOutcome}</div>
          </div>
          <div className='stat note'>
            <label>Note</label>
            <div className='value'>{game.note}</div>
          </div>
          <div className='stat winner'>
            <label>Winner</label>
            <div className='value'>{game.winner}</div>
          </div>
        </div>
      ))}
    </div>
  </Layout>
)

/*
"date": "2018-01-01",
"name": "Harry Potter: Hogwarts Battle",
"coOp": "Yes",
"coOpOutcome": "Won",
"note": "Game 1"
*/

Feed.getInitialProps = async function () {
  console.log('Get initial properties for Index')
  const res = await fetch('https://boardgames-api.calisaurus.net/api/boardgame/feed')
  const data = await res.json() || { feed: [] }

  console.log(`Game feed fetched. Count: ${data.feed.length}`)

  return {
    feed: data.feed
  }
}

export default Feed
