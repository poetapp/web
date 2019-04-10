import { pipe } from 'ramda'
import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Main } from 'components/templates/Main'
import { eventToValue } from 'helpers/eventToValue'
import { parseJwt } from 'helpers/jwt'
import { ApiContext } from 'providers/ApiProvider'

import classNames from './NewClaim.scss'

export const NewClaim = () => {
  const [api, isBusy, useApi] = useContext(ApiContext)
  const [createdWork, setCreatedWork] = useState(null)
  const tokens = useApi('getTokens')
  const token = selectToken(tokens)

  const onSubmit = claim => {
    api.createClaim(claim, token).then(setCreatedWork)
  }

  useEffect(() => {
    console.log('Using token for claim creation', token)
  }, [token])

  return (
    <Main>
      <section className={classNames.newClaim}>
        <h1>New Claim</h1>
        <h2>Create a New Claim on the Po.et Network</h2>
        { !token && tokens?.apiTokens && <h3>You need a mainnet <Link to="/tokens">API Token</Link> in order to create works.</h3> }
        { !createdWork
          ? <Form onSubmit={onSubmit} isBusy={isBusy} disabled={!token}/>
          : <Done workId={createdWork.workId}/> }
      </section>
    </Main>
  )
}

const Form = ({ onSubmit, disabled, isBusy }) => {
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [date, setDate] = useState(new Date().toISOString())
  const submitButtonText = isBusy ? 'Please wait...' : 'Submit'
  const onSubmitWrapper = event => {
    event.preventDefault();
    const claim = {
      name,
      datePublished: date,
      dateCreated: date,
      author,
      tags,
      content,
    }

    onSubmit(claim)
  }

  return (
    <form onSubmit={onSubmitWrapper} disabled={disabled || isBusy}>
      <label htmlFor="name">Title</label>
      <input type="text" id="name" value={name} onChange={pipe(eventToValue, setName)} required />
      <label htmlFor="author">Author Name</label>
      <input type="text" id="author" value={author} onChange={pipe(eventToValue, setAuthor)} required />
      <label htmlFor="content">Content</label>
      <textarea id="content" value={content} onChange={pipe(eventToValue, setContent)} required />
      <label htmlFor="tags">Tags</label>
      <input type="text" id="tags" value={tags} onChange={pipe(eventToValue, setTags)} />
      <label htmlFor="date">Date Created</label>
      <input type="text" id="date" value={date} onChange={pipe(eventToValue, setDate)} required />
      <button type="submit" disabled={disabled || isBusy}>{submitButtonText}</button>
    </form>
  )
}

const Done = ({ workId }) => (
  <section>
    <p>Thank you! Your submission has been received!</p>
    <p>It will be available at <Link to={`/works/${workId}`}>{`/works/${workId}`}</Link> as soon as it is confirmed on the blockchain.</p>
  </section>
)

const selectToken = tokens => tokens?.apiTokens?.filter(token => !token.startsWith('TEST_')).map(token => ({
  token,
  parsed: parseJwt(token),
})).filter(({ token, parsed }) => parsed.email)[0].token
