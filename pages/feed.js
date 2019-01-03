import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/PageLayout.js'
import Chart from 'react-chartjs2'

const Feed = (props) => (
  <Layout>
    <h1>Board Games Feed</h1>
    <div className='feed'>
      <Chart data={props.chartData} options={props.chartOptions} type='bar' />
      {props.feed.map((game, index) => (
        <div className='feed item' key={[game.name, '_', index].join('')}>
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

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const gamesPlayedByMonth = data.feed.reduce((acc, item) => {
    const monthCode = item.date.substring(5, 7)
    const month = acc[monthCode] || { monthCode, items: [] }
    month.items.push(item)
    acc[monthCode] = month
    return acc
  }, {})

  const sortByMonthCode = (a, b) => Number.parseInt(a.monthCode) - Number.parseInt(b.monthCode)
  const coOpGamesPlayedByMonth = Object.values(gamesPlayedByMonth).sort(sortByMonthCode).map(n => n.items.filter(x => x.coOp === 'Yes').length)

  const chartData = {
    labels: months,
    datasets: [{
      label: "Co-op Games Played",
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: coOpGamesPlayedByMonth
    }]
  }

  const chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 0
        }
      }]
    }
  }

  return {
    feed: data.feed,
    chartData,
    chartOptions
  }
}

export default Feed
