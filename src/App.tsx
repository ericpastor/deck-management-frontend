import React from 'react'
import { useQuery } from '@apollo/client'
import { CREW_LIST } from './graphql/crew-queries'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  const { data: crewData, loading: crewLoading, error: crewError } = useQuery(CREW_LIST)

  if (crewLoading) return <p>Loading...</p>;
  if (crewError) return <p>Error loading crew: {crewError.message}</p>

  const contextValue = {
    crew: crewData.allCrewMembers,
  }
  return (
    <>
      <Navbar />
      <Outlet context={contextValue} />
    </>

  )

}

export default App
