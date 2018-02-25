import React, {Component} from 'react'
import {View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated} from 'react-native'
import {Foundation} from '@expo/vector-icons'
import {purple, white} from '../utils/colors'
import { Location, Permissions } from 'expo'
import {calculateDirection} from '../utils/helpers'


export default class Live extends Component{
	constructor(props){
		super(props)
		this.state={
			coords: null,
			status: null,
			direction: '',
			bounceValue: new Animated.Value(1)
		}
	}

	componentDidMount(){
		Permissions.getAsync(Permissions.LOCATION)
			.then(({status}) => {
				//console.log("componentDidMount status: ", status)
				if (status === 'granted'){
					return this.setLocation()
				}
				this.setState({status})
			})
			.catch(err=>{
				console.log("error getting location permission: ", err)
				this.setState({status:'undetermined'})
			})
	}

	askPermission = () => {
		Permissions.askAsync(Permissions.LOCATION)
			.then(({status}) => {
				if (status === 'granted'){
					return this.setLocation()
				}
				this.setState({status})
			})
			.catch(err=>{
				console.log("error asking location permission: ", err)
			})
	}

	setLocation = () => {
		Location.watchPositionAsync({
			enableHighAccuracy:true,
			timeInterval:1,
			distanceInterval:1
		}, (data)=>{
			//console.log("Location.watchPositionAsync: ", data)
			const {coords} = data
			const newDirection = calculateDirection(coords.heading)
			// console.log("newDirection: ", newDirection)
			const {direction, bounceValue} = this.state

			if (newDirection !== direction){
				Animated.sequence([

					Animated.timing(bounceValue, {duration:200, toValue:1.04}),
					Animated.spring(bounceValue, {toValue:1, friction:5})

				]).start()
			}
			this.setState({
				coords,
				status: 'granted',
				direction: newDirection
			})
		})
	}
	render(){
		const {coords, status, direction, bounceValue} = this.state

		if (status === null){
			return (<ActivityIndicator style={{marginTop:30}} />)
		}
		if (status === 'denied'){
			return (
				<View style={styles.center}>
					<Foundation size={30} name='alert' />
					<Text>
						You denied your location. You can fix this by visiting your settings and enabling location services for this app.
					</Text>
				</View>)
		}
		if (status === 'undetermined'){
			return (
				<View style={styles.center}>
					<Foundation size={30} name='alert' />
					<Text>
						You need to enable location services for this app.
					</Text>
					<TouchableOpacity onPress={this.askPermission} style={styles.button}>
						<Text style={styles.buttonText}>
							Enable
						</Text>

					</TouchableOpacity>
				</View>
			)
		}

		return (

			<View style={styles.container}>
				<View style={styles.directionContainer}>
					<Text style={styles.header}>You are heading</Text>
					<Animated.Text
						style={[ styles.direction, {transform:[{scale:bounceValue}]} ]}>
						{direction}
					</Animated.Text>
				</View>
				<View style={styles.metricContainer}>
					<View style={styles.metric}>
						<Text style={[styles.header, {color:white}]}>
							Altitude
						</Text>
						<Text style={[styles.subHeader, {color:white}]}>
							{Math.round(coords.altitude)} meters
						</Text>
					</View>
					<View style={styles.metric}>
						<Text style={[styles.header, {color:white}]}>
							Speed
						</Text>
						<Text style={[styles.subHeader, {color:white}]}>
							{coords.speed.toFixed(1)} m/s
						</Text>
					</View>
				</View>
			</View>
		)
	}
}

const styles= StyleSheet.create({
	container:{
		flex:1,
		justifyContent: 'space-between'
	},
	center:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		marginLeft:30,
		marginRight:30
	},
	button:{
		padding:10,
		backgroundColor: purple,
		alignSelf: 'center',
		borderRadius: 5,
		margin:20
	},
	buttonText:{
		color:white,
		fontSize:20
	},
	directionContainer:{
		flex:1,
		justifyContent:'center'
	},
	header:{
		fontSize:35,
		textAlign:'center'
	},
	direction:{
		color:purple,
		fontSize:120,
		textAlign:'center'
	},
	metricContainer:{
		flexDirection:'row',
		justifyContent:'space-around',
		backgroundColor:purple
	},
	metric:{
		flex:1,
		paddingTop:15,
		paddingBottom: 15,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		marginTop:20,
		marginRight:10,
		marginLeft:10,
		marginBottom:20
	},
	subHeader:{
		fontSize:25,
		textAlign:'center',
		marginTop:5
	}
})





