import React from 'react'
import ManagingTable from '../components/ManagingTable/ManagingTable'
import { getAllUsers } from '../utils/accountHelper'
import store from '../store'
import * as actions from '../actions/AccountActions'
import { connect } from 'react-redux'

var UsersManagingContainer = React.createClass({
  componentWillMount: function(){
    getAllUsers().then(function(response){
        console.log(response.data);
        store.dispatch(actions.getAllUsersSuccess(response.data));
      }
    )
  },
  render: function(){
    return (
      <div className="section">
        <ManagingTable
          items={this.props.users}
          fields={[{Key:'Email', Value:'Email'}]}
        />
      </div>
    );
  }
});


const mapStateToProps = store => {
    return {
        users: store.usersManaging.users
    };
};

export default connect(mapStateToProps)(UsersManagingContainer)
