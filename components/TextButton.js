import React, {Component} from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import {purple} from '../utils/colors'

const TextButton = ({onPress, children, style=[]}) => {
	console.log("onPress: ", onPress)
	console.log("children: ", children)
	console.log("style: ", style)

	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={[styles.reset, style]}>{children}</Text>
		</TouchableOpacity>
	)
}
const styles=StyleSheet.create({
	reset:{
		textAlign: 'center',
		color: purple
	}
})
export default TextButton