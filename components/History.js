import React, {Component} from 'react'
import {View, ScrollView, Text} from 'react-native'

import {connect} from 'react-redux'
import {receiveEntries, addEntry} from '../actions'

import {timeToString, getDailyReminderValue} from '../utils/helpers'
import {fetchCalendarResults} from '../utils/api'
class History extends Component{

	componentDidMount(){
		const {dispatch} = this.props

		fetchCalendarResults()
			.then(entries=>dispatch(receiveEntries(entries)))
			.then(({entries})=>{

				if (!entries[timeToString()]){
					dispatch(addEntry({
						[timeToString()]:getDailyReminderValue()
					}))
				}
			})
	}
	render(){
		return (
			<ScrollView>
				<Text>{this.props}</Text>
			</ScrollView>
		)
	}
}


function mapStateToProps(entries){
	return {
		entries
	}
}
export default connect(mapStateToProps)(History)