import React, {Component} from 'react'
import {View, Text, Slider as ReactNativeSlider} from 'react-native'


const Slider = ({max, step, value, onChange, unit}) => {


		return (
			<View>
				<ReactNativeSlider

					minimumValue={0}
					maximumValue={max}
					step={step}
					value={value}
					onValueChange={onChange}
				/>
				<View>
					<Text>{value}</Text>
					<Text>{unit}</Text>
				</View>
			</View>
		)

}

export default Slider
