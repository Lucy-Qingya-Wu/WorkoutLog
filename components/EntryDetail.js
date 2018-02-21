import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {white} from '../utils/colors'
import MetricCard from './MetricCard'
import {addEntry} from '../actions/index'
import {removeEntry} from '../utils/api'
import {timeToString, getDailyReminderValue} from '../utils/helpers'
import TextButton from './TextButton'

class EntryDetail extends Component{

	static navigationOptions = ({ navigation }) => {
	   const { entryId } = navigation.state.params

	   return {
	     title: entryId
	   }
	}


  reset = () => {
    console.log("EntryDetail, function reset, this.props: ", this.props)
    const {remove, goBack, entryId} = this.props


    remove()
    goBack()
    removeEntry(entryId)
  }


  shouldComponentUpdate(nextProps){
    return nextProps.metrics !== null && !nextProps.metrics.today
  }


	render(){
    console.log("EntryDetail, function render, this.props: ", this.props)
		const {metrics} = this.props




		return (
			<View style={styles.container}>

				<MetricCard metrics={metrics} />
				<TextButton onPress={this.reset} style={{margin: 20}}>
          RESET
				</TextButton>
			</View>
		)
	}

}

function mapStateToProps(entries, {navigation}){
	const {entryId} = navigation.state.params
	return {
		entryId,
		metrics: entries[entryId]
	}
}

function mapDispatchToProps(dispatch, {navigation}){
	console.log("navigation", navigation)
	const {entryId} = navigation.state.params
	return {
		remove: ()=>dispatch(addEntry({
			[entryId]:timeToString() === entryId ? getDailyReminderValue() : null
		})),
		goBack: ()=>navigation.goBack()
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:white,
		padding: 15
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)