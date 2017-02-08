import React from 'react'
import Griddle  from 'griddle-react'
import { connect } from 'react-redux'
import { fetchUsers } from '../modules/usersgrid'
import UserGridRowView from '../components/UserGridRowView'
import UserEditFormView from '../components/UserEditFormView'

const UsersGridContainer = React.createClass({
  getInitialState(){
    this.props.getUsers()
    return {
      showEditModal: false
    }
  },
  setEditModaShowing(show){
    this.setState(Object.assign({}, this.state, { showEditModal: show }))
  },
  render() {
    return  (
      <div>
      <Griddle
        results={this.props.users}
        showFilter={true}
        useCustomRowComponent={true}
        customRowComponent={UserGridRowView}
        enableInfiniteScroll={true}
        globalData={{openEditModal: () => this.setEditModaShowing(true)}}/>

      <UserEditFormView
        showModal={this.state.showEditModal}
        close={() => this.setEditModaShowing(false)}/>
    </div>);
  }
})

const mapDispatchToProps = {
  getUsers  : fetchUsers
}

const mapStateToProps = (state) => ({
  users     : state.usersGrid.users
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersGridContainer)
