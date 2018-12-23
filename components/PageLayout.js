import Header from './Header'
import Head from 'next/head'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const PageLayout = (props) => (
  <div style={layoutStyle}>
    <Head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato" type="text/css" />
      <link rel="stylesheet" href="/static/design/reset.css" type="text/css" />
      <link rel="stylesheet" href="/static/design/style.css" type="text/css" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous" />
    </Head>
    <Header />
    {props.children}
  </div>
)

export default PageLayout
