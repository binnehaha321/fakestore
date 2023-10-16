import React from 'react'
import Header from '../components/Home/Menu'

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
  )
}

export default DefaultLayout