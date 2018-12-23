import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/PageLayout.js'

const About = (props) => (
  <Layout>
    <h1>About</h1>
    <p>About the board games browser.</p>
  </Layout>
)

export default About
