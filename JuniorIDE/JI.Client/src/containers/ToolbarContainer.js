import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toolbar from '../components/Toolbar'

const ToolbarContainer = React.createClass({
  render(){
    return(
      <Toolbar
        children = {this.props.children}/>
    )
  }
})

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarContainer)
