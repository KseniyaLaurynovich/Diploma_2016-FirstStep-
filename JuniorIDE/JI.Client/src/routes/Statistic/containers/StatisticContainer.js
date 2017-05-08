import React from 'react'
import { connect } from 'react-redux'
import { actions, changeGroupFilter } from '../modules/statistic'

import Statistic from '../components/StatisticView'

const mapDispatchToProps = {
    changeGroupFilter   : changeGroupFilter
}

const mapStateToProps = (state) => ({
    groups          : state.statistic.groups,
    currentGroup    : state.statistic.filterGroup
})

export default connect(mapStateToProps, mapDispatchToProps)(Statistic)
