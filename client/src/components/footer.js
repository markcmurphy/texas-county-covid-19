import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact'

const Footer = () => {
  return (
    <MDBFooter className="font-small pt-0">
      <MDBContainer>
        <MDBRow className="d-flex text-center justify-content-center mb-md-0 mb-4">
          <MDBCol md="8" sm="12" className="mt-5">
            <p style={{ lineHeight: '1.7rem' }}>
              Texas Covid-19 cases by county scraped from
              https://www.dshs.texas.gov/news/updates.shtm. On March 22, 2020,
              Texas Health and Human Services released their own map of Covid-19
              cases and stopped using the chart my info was being scraped from.
              As a result, info is being scraped from
              https://web.archive.org/web/20200322105233/https://www.dshs.texas.gov/news/updates.shtm
              to demonstrate how the app initially functioned. The information
              is out of date and won't be updated beyond March 22.
            </p>
          </MDBCol>
        </MDBRow>
        <hr
          className="clearfix d-md-none rgba-white-light"
          style={{ margin: '10% 15% 5%' }}
        />
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:
          <a href="https://murphymark.me" alt="">
            {' '}
            Mark Murphy{' '}
          </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  )
}

export default Footer
