import React from 'react'

function Auth() {

  const isLogIn = false
  return (
    <div className='auth-container'>
      <div className='auth-container-box'>
        <form>
          <h2>{isLogIn ? 'Please login':'Please Signup'}</h2>
          <input type='email' placeholder='email'/>
          <input type='password' placeholder='password'/>
          {!isLogIn && <input type='password' placeholder='confirm password'/>}
          <input type='submit' className='create'/>
        </form>
      </div>
    </div>
  )
}

export default Auth