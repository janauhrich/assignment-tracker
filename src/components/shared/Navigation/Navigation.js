import React from 'react'

import AuthenticatedLinks from './Navigation.AuthenticatedLinks'
import AuthenticatedAdminLinks from './Navigation.AuthenticatedAdminLinks'
import UnauthenticatedLinks from './Navigation.UnauthenticatedLinks'


const NavigationFinder = ({ currentUserId, isAdmin, logoutUser }) => { 
  if (isAdmin) {
    return <AuthenticatedAdminLinks currentUserId={currentUserId} isAdmin={isAdmin} logoutUser={logoutUser} />
  } else if (currentUserId) {
    return <AuthenticatedLinks currentUserId={currentUserId} logoutUser={logoutUser} />
  } else { 
    return <UnauthenticatedLinks />
  }
}

export default ({ currentUserId, isAdmin, logoutUser }) => (


  <section className='bg-light border-bottom mb-4'>
    <div className='container'>
      <NavigationFinder currentUserId={currentUserId} isAdmin={isAdmin} logoutUser={logoutUser}/>
    </div>
  </section>
)
