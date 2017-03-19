import React from 'react'
import { connect } from 'react-redux'

import { openNewTaskModal } from '../modules/taskGrid'
import Toolbar from '../components/TaskGridToolbar'

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  openNewTaskModal : openNewTaskModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
