import React from 'react'
import { connect } from 'react-redux'
import { saveTask, addNewTest } from '../modules/testGrid'

import Toolbar from '../components/TestGridViewToolbar'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  saveTask          : saveTask,
  addNewTest        : addNewTest
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
