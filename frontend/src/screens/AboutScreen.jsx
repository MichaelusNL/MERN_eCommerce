import React from 'react'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

const AboutScreen = () => {
  return (
    <div>
      <h2>Story</h2>
      <p>
        Blessed soy candles was started in kaiwaka north of Auckland by myself
        and my daughter who at the time was around 14 years old. It was an
        opportunity for us to spend more time together and create something
        beautiful at the same time. Whenever I have a candle burning in my home
        it makes me feel blessed and lucky to be able to enjoy a simple yet
        luxury treat. Our soy candles are all hand poured at home using a
        natural plant based wax that is GMO FREE and contains NO paraffin, NO
        unnatural additives and is also VEGAN and KOSHER.
      </p>
      <Row className='m-5'>
        <Col xs={6} md={4} className='mx-5'>
          <Image src='/images/elipic.jpg' roundedCircle fluid />
        </Col>
        <Col xs={6} md={4} className='mx-5'>
          <Image src='/images/addpp.jpg' roundedCircle fluid />
        </Col>
      </Row>
      <h2>Contact</h2>
      <p className='mb-0'>
        Email: <a href='mailto:mikeruigrok@live.nl'>Liz.gibbens@icloud.com</a>
      </p>
      <p className='mt-0'>
        Mobile: <a href='callto:02041949713'>0211795058</a>
      </p>
    </div>
  )
}

export default AboutScreen
