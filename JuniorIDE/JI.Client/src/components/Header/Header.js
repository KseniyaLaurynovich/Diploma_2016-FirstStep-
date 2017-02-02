import React from 'react'
import LoadingBar from 'react-redux-loading-bar'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <LoadingBar />
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='route--active'>
      Counter
    </Link>
    {' · '}
    <Link to='/login' activeClassName='route--active'>
      Log in
    </Link>
    {' · '}
    <Link to='/registration' activeClassName='route--active'>
      Sign up
    </Link>
  </div>
)

export default Header
