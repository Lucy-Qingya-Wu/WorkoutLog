import React, {Component} from 'react'

import {
  StyleSheet,
  Switch,
  View,
  TextInput,
  Text,
  Image,
  KeyboardAvoidingView,
  WebView,
  Platform,
  StatusBar as ReactNativeStatusBar
} from 'react-native'

import AddEntry from './components/AddEntry'
import History from './components/History'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'

import {TabNavigator} from 'react-navigation'

import {FontAwesome, Ionicons} from '@expo/vector-icons'

import {purple, white} from './utils/colors'


import {Constants} from 'expo'

// function Dashboard(){
//   return (
//     <View>
//       <Text>Dashboard</Text>

//     </View>
//   )
// }
// function Home(){
//   return (
//     <View>
//       <Text>HOME</Text>
//     </View>
//   )
// }

function StatusBar({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height:Constants.statusBarHeight}}>
      <ReactNativeStatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({tintColor})=><Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'AddEntry',
      tabBarIcon: ({tintColor})=><FontAwesome name='plus-square' size={30} color={tintColor} />
    }

  }
}, {
  navigationOptions:{
    header: null
  },
  tabBarOptions:{
    activeTintColor: Platform.OS === 'ios' ? purple:white,
    style:{
      height:56,
      backgroundColor:Platform.OS === 'ios' ? white:purple,
      shadowColor:'rgba(0,0,0,0.24)',
      shadowOffset:{
        width:0,
        height:3
      },
      shadowRadius:6,
      shadowOpacity:1
    }
  }
})

export default class App extends Component {

  // constructor(props){
  //   super(props)
  //   this.state={
  //     input: "hi Sam",
  //     showInput: false

  //   }
  // }
  // handleToggleSwitch = () => {
  //   this.setState(state=>({
  //     showInput: !state.showInput
  //   }))
  // }




  render() {


    return (
    	// <KeyboardAvoidingView behavior='padding' style={styles.container}>

     //    <Image
     //      source={{uri:'https://tylermcginnis.com/tylermcginnis_glasses-300.png'}}
     //      style={styles.img}
     //    />
     //    <Switch
     //      value={showInput}
     //      onValueChange={this.handleToggleSwitch}
     //    />
     //    {showInput === true && (
     //      <View>

     //        <TextInput
     //          value={input}
     //          style={styles.input}
     //          onChangeText={input=>this.setState({input})}

     //        />
     //      </View>
     //    )}
     //  </KeyboardAvoidingView>




     <Provider store={createStore(reducer)}>

      <View style={{flex:1}}>

        <StatusBar backgroundColor={purple} barStyle='light-content'/>
        <Tabs />
      </View>

     </Provider>

    );
  }
}

// justifyContent
// flex-start - align every child element towards the start of the the Main Axis
// center -
// flex-end
// space-around
// space-between

// alignItems : specify how children align themselves along the Cross Axis
// flex-start
// center
// flex-end
// stretch

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: '#e76e63',
    margin: 10,
  },
  input: {
    width:200,
    height:44,
    padding: 8,
    borderWidth: 1,
    color: 'red',
    borderColor: '#757575',
    margin: 50
  },
  img: {
    width: 100,
    height: 100,
    margin: 50
  }
})