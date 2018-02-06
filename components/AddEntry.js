import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Slider as ReactNativeSlider} from 'react-native'
import {getMetricMetaInfo, timeToString} from '../utils/helpers'

import Stepper from './Stepper'
import Slider from './Slider'
import DateHeader from './DateHeader'


function SubmitBtn ({onPress}) {
	return (

		<TouchableOpacity style={styles.btn} onPress={onPress}>
			<Text style={styles.btnText}>SUBMIT</Text>
		</TouchableOpacity>

	)
}
export default class AddEntry extends Component {


	constructor(props){
		super(props)
		this.state = {
			bike: 0,
			swim: 0,
			run: 0,
			sleep: 0,
			eat: 0
		}

	}

	submit = () => {

		const key = timeToString()
		const entry = this.state

		// update redux

		this.setState({
			bike: 0,
			swim: 0,
			run: 0,
			sleep: 0,
			eat: 0
		})

		// navigate to home

		// save to database

		// clearn local notification

	}

	increment = (metric) => {
		const {max, step} = getMetricMetaInfo(metric)
		console.log("in increment: max-> ", max, " step-> ", step)
		this.setState(state=>{
			const count = state[metric]+step
			console.log("count ", count)
			return {
				...state,
				[metric]: count > max ? max:count
			}
		})
	}

	decrement = (metric) => {
		const {step} = getMetricMetaInfo(metric)
		this.setState(state=>{
			const count = state[metric]-step
			console.log("count ", count)
			return {
				...state,
				[metric]: count < 0 ? 0:count
			}
		})
	}

	slide = (metric, value) => {
		this.setState({[metric]:value})
	}

	render() {
		const metaInfo = getMetricMetaInfo()

		return (
			<View>

			    <DateHeader date={(new Date()).toLocaleDateString()}/>
			    <Text>{JSON.stringify(this.state)}</Text>
				{Object.keys(metaInfo).map(key=>{
					const {getIcon, type, ...rest} = metaInfo[key]



					let value = this.state[key]

					return (
						<View key={key}>

							{getIcon()}

							{type === 'stepper' ?
								<Stepper
									value={value}
									onIncrement={()=>this.increment(key)}
									onDecrement={()=>this.decrement(key)}
									{...rest}
								/> : <Slider
									value={value}
									{...rest}
									onChange={(value)=>this.slide(key, value)}
								/>
							}

						</View>
					)
				})}
				<SubmitBtn onPress={this.submit}/>


			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	btn: {
		backgroundColor: '#E53224',
		padding: 10,
		paddingLeft: 50,
		paddingRight: 50,
		justifyContent : 'center',
		alignItems: 'center',
		borderRadius: 5
	},
	btnText: {
		color: '#fff'
	}
})