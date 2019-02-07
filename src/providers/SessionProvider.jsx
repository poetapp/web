import React, { createContext, useState, useEffect } from 'react'

export const SessionContext = createContext()

const SessionToken = 'session_token'

export const SessionProvider = props => {
  const [token, setToken] = useState(window.localStorage.getItem(SessionToken))

  useEffect(() => {
    if (token)
      window.localStorage.setItem(SessionToken, token)
    else
      window.localStorage.removeItem(SessionToken)
  }, [token])

  return (
    <SessionContext.Provider value={[token, setToken]}>
      { props.children }
    </SessionContext.Provider>
  )
}