import React, {Component} from 'react'
import {
			ScrollView,
			View,
			Text,
			TouchableOpacity,
			StyleSheet,
			Slider as ReactNativeSlider,
			Platform
       } from 'react-native'
import {getMetricMetaInfo, timeToString, getDailyReminderValue} from '../utils/helpers'

import Stepper from './Stepper'
import Slider from './Slider'
import DateHeader from './DateHeader'
import TextButton from './TextButton'
import {Ionicons} from '@expo/vector-icons'

import {submitEntry, removeEntry} from '../utils/api'
import {connect} from 'react-redux'
import {addEntry} from '../actions'

import {white, purple} from '../utils/colors'
import styled from 'styled-components'
import {NavigationActions} from 'react-navigation'

const SubmitBtnText = styled.Text`
		color: white;
		font-size: 20;
		text-align: center;
`


function SubmitBtn ({onPress}) {
	return (

		<TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn} onPress={onPress}>
			<SubmitBtnText>
				SUBMIT
			</SubmitBtnText>
		</TouchableOpacity>

	)
}
class AddEntry extends Component {


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

        this.toHome()

		this.props.dispatch(addEntry({
			[key]:entry
		}))

		this.setState({
			bike: 0,
			swim: 0,
			run: 0,
			sleep: 0,
			eat: 0
		})

		// navigate to home


		submitEntry({key, entry})

		// clearn local notification

	}

	reset = () => {
		const key = timeToString()

		this.props.dispatch(addEntry({
			[key]: getDailyReminderValue()
		}))
		// route to home

		this.toHome()

		removeEntry(key)
	}
    toHome = () => {
    	const {navigation} = this.props
    	navigation.dispatch(NavigationActions.back({
    		key: 'AddEntry'
    	}))
    }
	increment = (metric) => {
		const {max, step} = getMetricMetaInfo(metric)

		this.setState(state=>{
			const count = state[metric]+step

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

		if (this.props.alreadyLogged){
			return (
				<View style={styles.center}>
					<Ionicons
						name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
						size={100}
					/>
					<Text>
						You already logged your information for today
					</Text>
					<TextButton style={{padding: 10}} onPress={this.reset}>
						Reset
					</TextButton>
				</View>
			)
		}
		return (
			<ScrollView style={styles.container}>

			    <DateHeader date={(new Date()).toLocaleDateString()}/>

				{Object.keys(metaInfo).map(key=>{
					const {getIcon, type, ...rest} = metaInfo[key]



					let value = this.state[key]

					return (
						<View key={key} style={styles.row}>

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


	          {Platform.OS === 'ios' ? <Ionicons name='ios-pizza' size={100} color='red' />
	            : <Ionicons name='md-pizza' size={100} color='red' />
	          }

			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white

	},
	iosSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40
	},
	androidSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 2,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center'
	},

	row: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center'
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 30,
		marginLeft: 30
	}
})

function mapStateToProps(state){
	const key = timeToString()

	return {
		alreadyLogged: state[key] && typeof state[key].today === 'undefined'
	}
}

export default connect(mapStateToProps)(AddEntry)