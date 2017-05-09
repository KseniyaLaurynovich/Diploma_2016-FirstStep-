import React from 'react'
import { connect } from 'react-redux'
import { actions, changeGroupFilter, openStatisticForUser } from '../modules/statistic'

import Statistic from '../components/StatisticView'

const mapDispatchToProps = {
    changeGroupFilter   : changeGroupFilter,
    openStatisticForUser: openStatisticForUser
}

const mapStateToProps = (state) => ({
    groups          : state.statistic.groups,
    currentGroup    : state.statistic.filterGroup,
    currentUser     : state.statistic.currentUser,
    currentStatistic: state.statistic.currentStatistic
})

export default connect(mapStateToProps, mapDispatchToProps)(Statistic)
