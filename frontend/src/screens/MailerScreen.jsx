import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { mailer } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_MAILER_RESET } from '../constants/userConstants'

const MailerScreen = ({ history, match }) => {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userMailer = useSelector((state) => state.userMailer)
  const { loading, success, error } = userMailer

  useEffect(() => {
    dispatch({ type: USER_MAILER_RESET })
  }, [history, dispatch])

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push('/')
    } else if (!userInfo) {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(mailer(message, subject, userInfo))
  }

  return (
    <>
      {success && <Message variant='success'>Mail has been sent!</Message>}
      {error && <Message variant='danger'>Email could not be sent.</Message>}
      {loading && <Loader />}
      <h1>Mail signed up customers</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='subject'>
          <Form.Label>Email Subject</Form.Label>
          <Form.Control
            type='text'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control
            as='textarea'
            rows={15}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {message.length > 0 && subject.length > 0 ? (
          <Button
            type='submit'
            variant='primary'
            className='btn-lg'
            style={{
              width: '100%',
              marginTop: '25px',
            }}
          >
            Send
          </Button>
        ) : (
          <Button
            type='submit'
            variant='primary'
            className='btn-lg'
            disabled
            style={{
              width: '100%',
              marginTop: '25px',
            }}
          >
            Send
          </Button>
        )}
      </Form>
    </>
  )
}

export default MailerScreen
