import React, { useState, useEffect, Component } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { scaleQuantize } from 'd3-scale'
import { csv } from 'd3-fetch'
import { csvFormatRows } from 'd3-dsv'
import axios from 'axios'

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json'

const MapChart = () => {
  const [data, setData] = useState([])

  // class MapChart extends Component {
  //   constructor(props) {
  //     super(props)
  //     this.state = { apiResponse: '' }
  //   }
  // const [data, setData] = useState([]);

  // const csvString = csvFormatRows(
  //   rows.concat(
  //     data.map(function(d, i) {
  //       return [d.id, d.name, d.cases]
  //     })
  //   )

  // )
  // callAPI() {
  //   fetch('http://localhost:3000/casesbycounty')
  //     .then(res => res.text())
  //     }

  // async function getData() {
  //   const res = await fetch('http://localhost:3000/casesbycounty')
  //   // console.log(res)
  //   const data = await res.text()
  //   console.log(data)
  //   setData(data)
  // }
  // data =
  //   'data:text/csv;charset=utf-8,' + data.map(e => e.join(',')).join('\n')

  // console.log(Data)

  // 'data:text/csv;charset=utf-8,' + data.map(e => e.join(',')).join('\n')

  useEffect(() => {
    // this.callAPI()
    // getData()
    // fetch().then(res => res.text())
    // getData('http://localhost:3000/casesbycounty')
    // console.log(data)

    // fetch('http://localhost:3000/casesbycounty')
    // .then(res => res.text())
    // .then(console.log(res.text()))

    csv('http://localhost:3000/casesbycounty').then(counties => {
      setData(counties)
    })
  }, [])

  // componentWillMount() {
  //   this.callAPI()
  //   csv(this.state.apiResponse).then(counties => {
  //     setData(counties)
  //   })
  // }
  const colorScale = scaleQuantize()
    .domain([1, 10])
    .range([
      '#ffedea',
      '#ffcec5',
      '#ffad9f',
      '#ff8a75',
      '#ff5533',
      '#e2492d',
      '#be3d26',
      '#9a311f',
      '#782618',
    ])
  return (
    <div>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const cur = data.find(s => s.id === geo.id)
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(cur ? cur.cases : '#EEE')}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}

export default MapChart
