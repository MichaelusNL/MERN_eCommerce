import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3 col-12'>
            Copyright &copy; Blessed Soy Candles - Created by Mike Ruigrok
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
