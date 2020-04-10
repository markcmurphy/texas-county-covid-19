import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact'

const Footer = () => {
  return (
    <MDBFooter className="font-small pt-0">
      <MDBContainer>
        <MDBRow className="d-flex text-center justify-content-center mb-md-0 mb-4">
          <MDBCol md="8" sm="12" className="mt-5">
            <p style={{ lineHeight: '1.7rem' }}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur.
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
