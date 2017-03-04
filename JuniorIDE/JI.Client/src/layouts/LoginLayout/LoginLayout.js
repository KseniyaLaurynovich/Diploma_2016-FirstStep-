import React from 'react'
import './LoginLayout.scss'

export const LoginLayout = ({ children }) => (
  <div className='login-layout'>
    {children}
  </div>
)

LoginLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default LoginLayout
