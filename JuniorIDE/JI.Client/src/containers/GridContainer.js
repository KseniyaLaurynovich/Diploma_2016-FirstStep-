import React from 'react'
import Grid from '../components/Grid'

const GridContainer = React.createClass({
  render(){
    return(
      <div>
        <Grid
          itemComponent = {this.props.itemComponent}
          items         = {this.props.items}
          openEditModal = {this.props.openEditModal}
          filter        = {this.props.filter}
          md            = {this.props.md}
          sm            = {this.props.sm}
          xs            = {this.props.xs}/>
      </div>
    )
  }
})

export default GridContainer
