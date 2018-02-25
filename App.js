import React, {Component} from 'react'

import {

  StyleSheet,
  Switch,
  View,
  TextInput,
  Text,

  KeyboardAvoidingView,
  WebView,
  Platform,
  StatusBar as ReactNativeStatusBar,

  ImageEditor,
  TouchableOpacity,
  Image,

} from 'react-native'

import {ImagePicker} from 'expo'

import AddEntry from './components/AddEntry'

import History from './components/History'
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'

import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation'

import {FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'

import {purple, white, lightPurp} from './utils/colors'


import {Constants} from 'expo'

import { setLocalNotification } from './utils/helpers'

const Dashboard = ({ navigation }) => (
  <View>
    <Text>This is the Dashboard view</Text>
    <TouchableOpacity style={styles.iosSubmitBtn} onPress={() => navigation.navigate('DrawerOpen')}>
      <Text>open drawer</Text>
    </TouchableOpacity>
  </View>
);
function Home({navigation}){
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TouchableOpacity style={styles.iosSubmitBtn} onPress={() => navigation.navigate('DrawerOpen')}>
        <Text>open drawer</Text>
      </TouchableOpacity>
    </View>
  )
}
const Drawer = DrawerNavigator({
  Home: {
    screen: Home
  },
  Dashboard: {
    screen: Dashboard
  }
});
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
  },
  Live:{
    screen: Live,
    navigationOptions: {
      tabBarLabel: 'Live',
      tabBarIcon: ({tintColor})=><Ionicons name='ios-speedometer' size={30} color={tintColor} />
    }
  },


}, {
  navigationOptions:{
    header: null
  },
  tabBarOptions:{
    activeTintColor: Platform.OS === 'ios' ? lightPurp:white,
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

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,

  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {

      headerTintColor: 'red',
      headerStyle: {
        backgroundColor: purple
      }
    }
  },

})
export default class App extends Component {


  constructor(props){
    super(props)
    this.state={
      image:null
    }
  }

  componentDidMount() {
    setLocalNotification()
  }

  pickImage = ()=>{

    ImagePicker.launchImageLibraryAsync({
      allowEditing: true,
      aspect:[2:1]
    }).then(result=>{
      if (result.cancelled){
        return
      }
      ImageEditor.cropImage(result.uri, {
        offset:{x:0,y:0},
        size:{width:result.width, height:result.height},
        displaySize:{width:200, height:100},
        resizeMode:'contain',
      },
      (uri)=>{
        console.log("uri -> ", uri)
        this.setState({image:uri})
      },
      ()=>console.log("pickImage=>ImageEditor=>error"))
    })
  }

  render() {

    const {image} = this.state

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

        <MainNavigator />
      </View>

     </Provider>




      // <View style={{flex:1}}>

      //   <StatusBar backgroundColor={purple} barStyle='light-content'/>

      //   <TouchableOpacity onPress={this.pickImage}>
      //     <Text>Open Camera Roll</Text>
      //   </TouchableOpacity>

      //   {image && (
      //     <View>
      //     <Text>{image}</Text>
      //     <Image style={styles.img} source={{uri:image}}/>
      //     </View>
      //   )}
      // </View>



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
  iosSubmitBtn: {
    backgroundColor: lightPurp,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
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
    width: 150,
    height: 150,
    margin: 50
  },
})