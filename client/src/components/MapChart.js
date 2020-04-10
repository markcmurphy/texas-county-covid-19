import React, { useState, useEffect, Component } from 'react'
import {
  ComposableMap,
  ZoomableGroup,
  ZoomableGroupProps,
  Geographies,
  Geography,
} from 'react-simple-maps'
import { scaleQuantile } from 'd3-scale'
import { csv } from 'd3-fetch'
import { csvFormatRows } from 'd3-dsv'
import axios from 'axios'

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json'

const MapChart = () => {
  const [data, setData] = useState([])
  const [zoom, setZoom] = useState(2.5)
  console.log(zoom)
  useEffect(() => {
    csv('https://texas-county-covid-19.herokuapp.com/casesbycounty').then(
      counties => {
        setData(counties)
      }
    )
    console.log(data)
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

  return (
    <div>
      <ComposableMap
        projection="geoAlbersUsa"
        style={{
          top: '0',
          height: '90vh',
          minWidth: '100%',
        }}
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
}

export default MapChart
