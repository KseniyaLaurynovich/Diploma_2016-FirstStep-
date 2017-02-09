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
      showEditModal : false,
      currentUser   : null
    }
  },
  setEditModalShowing(userId, show){
    var user = this.props.users.find((element) => {
      return element.id === userId
    });
    this.setState(Object.assign({}, this.state, { showEditModal: show, currentUser: user }))
  },
  render() {
    return  (
      <div className='usersGridPage'>
      <Griddle
        results={this.props.users}
        showFilter={true}
        useCustomRowComponent={true}
        customRowComponent={UserGridRowView}
        enableInfiniteScroll={true}
        globalData={{openEditModal: (userId) => this.setEditModalShowing(userId, true)}}/>

      <UserEditFormView
        user={this.state.currentUser}
        showModal={this.state.showEditModal}
        close={() => this.setEditModalShowing(false)}/>
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
