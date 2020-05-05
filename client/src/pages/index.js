import React, { Component } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import MapChart from '../components/mapchart'

class App extends Component {
  render() {
    return (
      <>
        <Layout>
          <SEO
            title="Home"
            keywords={[`covid19`, `coronavisus`, `TX`, `Texas Counties`]}
          />
          <MapChart />
        </Layout>
      </>
    )
  }
}

export default App
