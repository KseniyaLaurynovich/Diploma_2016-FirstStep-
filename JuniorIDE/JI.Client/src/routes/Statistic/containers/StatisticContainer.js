import React from 'react'
import { connect } from 'react-redux'
import { actions, changeGroupFilter, openStatisticForUser, saveMark, changeProject, loadFile } from '../modules/statistic'

import Statistic from '../components/StatisticView'

const mapDispatchToProps = {
    changeGroupFilter   : changeGroupFilter,
    openStatisticForUser: openStatisticForUser,
    setMarkEditMode     : actions.setMarkEditMode,
    saveMark            : saveMark,
    handleMarkChange    : actions.handleMarkChange,
    changeProject       : changeProject,
    loadFile            : loadFile
}

const mapStateToProps = (state) => ({
    groups          : state.statistic.groups,
    currentGroup    : state.statistic.filterGroup,
    currentUser     : state.statistic.currentUser,
    currentStatistic: state.statistic.currentStatistic,
    markEditModeUser: state.statistic.markEditModeUser,
    markIsEditMode  : state.statistic.markIsEditMode,
    markNewValue    : state.statistic.markNewValue,
    currentProject  : state.statistic.currentProject,
    currentFile     : state.statistic.currentFile,
    mode            : state.statistic.mode
})

export default connect(mapStateToProps, mapDispatchToProps)(Statistic)
