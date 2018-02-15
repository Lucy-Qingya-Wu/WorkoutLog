import React, {Component} from 'react'
import {View, Text, Slider as ReactNativeSlider, StyleSheet} from 'react-native'
import {gray} from '../utils/colors'

const Slider = ({max, step, value, onChange, unit}) => {


		return (
			<View style={styles.row}>
				<ReactNativeSlider
					style={{flex:1, marginRight:25 }}
					minimumValue={0}
					maximumValue={max}
					step={step}
					value={value}
					onValueChange={onChange}
				/>
				<View style={styles.metricCounter}>
					<Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
					<Text style={{fontSize:18, color:gray}}>{unit}</Text>
				</View>
			</View>
		)

}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center'
	},
	metricCounter: {
		width: 85,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default Slider
