import React from 'react'
import LoadingBar from 'react-redux-loading-bar'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <LoadingBar />
    <h1>Junior IDE</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='route--active'>
      Counter
    </Link>
    {' · '}
    <Link to='/login' activeClassName='route--active'>
      Login
    </Link>
  </div>
)

export default Header
