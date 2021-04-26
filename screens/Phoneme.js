// Importing React from react.
import * as React from 'react';
// importing all the necessary components for this screen.
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView
} from 'react-native';
// importing local database here.
import db2 from '../localdb';
// importing Phonic SoundButton here.
import PhonicSoundButton from '../components/PhonicSoundButton';

// exporting the class so other files can import it.
export default class PhonemeScreen extends React.Component {
  // Constructor will contain all the states.
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Word Breaker</Text>
        </View>
        <View style={styles.buttonContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder={"type/paste text here"}
          onChangeText={(text) => {
            this.setState({ text: text });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // The word that is typed in by the user will be converted to lowercase, and then will be trimmed incase the user hit space before or after typing 
            var word = this.state.text.toLowerCase().trim()
            // If "word" is in the database, then it will go to the chunks and phones in the database. If it isn't in the database, then an alert will pop up.
            db2[word]
              ? (this.setState({ chunks: db2[word].chunks }),
                this.setState({ phonicSounds: db2[word].phones }))
              : alert("Word doesn't exist in database.");
              // Keyboard will dismiss after clicking the "Break It Down" button.
              Keyboard.dismiss();
          }}>
          <Text style={styles.buttonText}>Break It Down</Text>
        </TouchableOpacity>
        </View>
        <View >
          {this.state.chunks.map((item, index) => {
            return (
              // Creating "PhonicSoundButton" into a component.
              <PhonicSoundButton style={{marginBottom: 40, marginTop: 50}}
              //Setting the values of "wordChunk", "soundChunk", and "buttonIndex" to the states.
                wordChunk={this.state.chunks[index]}
                soundChunk={this.state.phonicSounds[index]}
                buttonIndex = {index}
              />
            );
          })}
        </View>
        </ScrollView>
      </View>   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90EE90',
    justifyContent: "center"
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
    color: '#008855',
    marginTop: 95
  },
  inputBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: '#008855',
    textAlign:"center",
    fontSize: 20,
    margin: 20,
    marginBottom: 20,
    marginTop:50,
    paddingLeft: 10,
  },
  button: {
    width: 300,
    height: 50,
    marginTop: 20,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
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