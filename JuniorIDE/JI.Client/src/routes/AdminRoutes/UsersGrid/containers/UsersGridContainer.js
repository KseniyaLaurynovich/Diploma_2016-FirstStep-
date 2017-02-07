import React from 'react'
import Griddle  from 'griddle-react'
import { connect } from 'react-redux'
import { fetchUsers } from '../modules/usersgrid'

const UsersGridContainer = React.createClass({
  getInitialState(){
    this.props.getUsers()
    return {}
  },
  render() {
    return  (
      <Griddle
        results={this.props.users}
        showFilter={true}
        showSettings={true}/>);
  }
})

const mapDispatchToProps = {
  getUsers  : fetchUsers
}

const mapStateToProps = (state) => ({
  users     : state.usersGrid.users
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersGridContainer)
