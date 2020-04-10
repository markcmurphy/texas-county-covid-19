import React, { Component } from 'react'
import { MDBContainer, MDBNavbar } from 'mdbreact'
import { Link } from 'gatsby'

class NavbarPage extends Component {
  render() {
    return (
      <MDBNavbar color="indigo" dark expand="md">
        <MDBContainer>
          <strong className="ml-3 white-text">
            Texas Covid19 Choropleth by County
          </strong>
        </MDBContainer>
      </MDBNavbar>
    )
  }
}

export default NavbarPage
