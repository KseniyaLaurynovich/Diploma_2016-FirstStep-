import React from 'react'
import Menu from '../../containers/MenuContainer'
import './CoreLayout.scss'
import '../../styles/core.scss'
import { Row, Col } from 'react-bootstrap'

export const CoreLayout = ({ children }) => (
  <div>
    <Menu/>
    <div className='container container--layout'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
