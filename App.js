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
  Ionicons,
  Platform
} from 'react-native'
import AddEntry from './components/AddEntry'
import History from './components/History'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'

export default class App extends Component {

  constructor(props){
    super(props)
    this.state={
      input: "hi Sam",
      showInput: false

    }
  }
  handleToggleSwitch = () => {
    this.setState(state=>({
      showInput: !state.showInput
    }))
  }
  render() {
    const {input, showInput} = this.state
    console.log("haha")
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
        <History />

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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',


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