import React, { useState, useEffect } from 'react'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps'
import { scaleQuantile } from 'd3-scale'
import { csv } from 'd3-fetch'

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json'

const MapChart = () => {
  const [data, setData] = useState([])
  const [zoom] = useState(2.5)
  useEffect(() => {
    csv('https://texas-county-covid-19.herokuapp.com/casesbycounty').then(
      counties => {
        setData(counties)
      }
    )
  }, [])

  const colorScale = scaleQuantile()
    .domain([0, 29])
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

  if (data) {
    return (
      <div>
        <ComposableMap
          projection="geoAlbersUsa"
          style={{
            top: '0',
            height: '90vh',
            minWidth: '100%',
          }}
          fill={'lightgrey'}
        >
          <ZoomableGroup zoom={zoom} center={[-99.9, 31.96]}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const cur = data.find(s => s.id === geo.id)

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      stroke={'darkgrey'}
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: 'none' },
                        pressed: { outline: 'none' },
                      }}
                      fill={colorScale(cur ? cur.cases : '#FFFFF')}
                    />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  } else {
    return <h1>Loading</h1>
  }
}

export default MapChart
