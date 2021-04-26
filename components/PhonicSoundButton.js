// importing React from React
import * as React from 'react';
// Importing necessary components for this screen.
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
// Importing Audio so we can use sound clips.
import { Audio } from 'expo-av';

// exporting the class so other files can import it.
export default class PhonicSoundButton extends React.Component {
  // constructor will contain the states.
  constructor(props) {
    super(props);
    this.state = {pressButtonIndex: ""}
  } 

  // This async function will make the sounds.
  playSound = async soundChunk => {
    console.log(soundChunk);
    // Var to contain the link.
    var soundLink =
    // String concatenation is used to here by combining the link, the "soundChunk" variable, and ".mp3" to play the sound.
      'https://whitehatjrcontent.s3.ap-south-1.amazonaws.com/phones/' +
      soundChunk +
      '.mp3';
    // Creating async function to store the variable "soundLink" inside of uri, and setting "shouldPlay" as true. shouldPlay will decide whether it will play or not.
    await Audio.Sound.createAsync(
      {
        uri: soundLink,
      },
      { shouldPlay: true }
    );
  };
  render() {
    return (
      // This will be the buttons that pops up when the user clicks the "Break It Down" Button. Each button will make a sound when pressed based on the word typed in by he user.
      <TouchableOpacity
        style={
          // Using Ternary Operator to invert the button color if has been pressed.
          this.props.buttonIndex === this.state.pressButtonIndex
          ?[styles.chunkButton, {backgroundColor : "#FFFFFF"}]
          : [styles.chunkButton,{backgroundColor: "#008855"}]
        }
        // When the button is pressed, the function will call playSound to play the sound, and will set the state by storing "buttonIndex" inside of "pressButtonIndex" state.
        onPress={() => {
          this.setState({pressButtonIndex: this.props.buttonIndex})
          this.playSound(this.props.soundChunk);
        }}>
          
        <Text style={
          // Using Ternary Operator to invert the text color if has been pressed.
          this.props.buttonIndex === this.state.pressButtonIndex
          ?[styles.displayText, {color: "#008855"}]
          : [styles.displayText, {color: "#FFFFFF"}]
        }>{this.props.wordChunk}</Text>
      </TouchableOpacity>
    );
  }
}
// Stylesheet is used by storing certain styles in a container, and then giving the style as the container.
const styles = StyleSheet.create({
  displayText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontWeight: "bold"
  },
  chunkButton:{
    width: 220,
    height: 50,
    marginTop: 1,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: '#008855',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  }
});