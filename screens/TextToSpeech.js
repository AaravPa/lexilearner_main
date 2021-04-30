// importing React
import * as React from 'react';
// Importing all the necessary components.
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard } from 'react-native';
// Importing "Speech" to say what the user typed in.
import * as Speech from "expo-speech";

// exporting the class so other files can import it.
export default class TextToSpeechScreen extends React.Component {
  constructor() {
    super();
    // state will contain what the user typed.
    this.state = {
      name: ""
    }
  }
  // function that will say whatever is inside of "name" state.
  speak = () => {
  var thingToSay = this.state.name;
  Speech.speak(thingToSay);
}
 render() {
  return (
    // giving style to everything inside of View Component
    <View style={styles.container}>
      <View style={styles.profileContainer}>
          <Text style={styles.title}>Audify</Text>
        </View>
      <View style={styles.buttonContainer}>
      <KeyboardAvoidingView>
      <TextInput style ={styles.inputBox}
      onChangeText= {(text) => {
        this.setState({ name: text});
      }}
      // User can write multiple lines inside of the Text Input.
      multiline={true}
      value= {this.state.text}>
      </TextInput>
      </KeyboardAvoidingView>
      <TouchableOpacity style ={styles.button}
      // onPress will call the speak function, as well as dismiss the keyboard of the phone.
      onPress ={()=> {
        this.speak(); 
        Keyboard.dismiss();
      }}>
        <Text style ={styles.buttonText}>Listen</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 55,
    fontWeight: "200",
    paddingBottom: 25,
    color: '#005588',
    marginTop: 10,
  },
  inputBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: '#005588',
    fontSize: 20,
    margin: 10,
    marginTop: -20,
    paddingLeft: 10,
  },
  button: {
    width: 300,
    height: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#005588',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: '#FFFF',
    fontWeight: "200",
    fontSize: 25,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
