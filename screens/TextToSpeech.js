// importing React
import * as React from 'react';
// Importing all the necessary components.
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native';
// Importing "Speech" to say what the user typed in.
import * as Speech from "expo-speech";

export default class TextToSpeechScreen extends React.Component {
  constructor() {
    super();
    // state will contain what the user typed.
    this.state = {
      name: ""
    }
  }

// getFileName(name, path) {
//     if (name != null) { return name; }

//     if (Platform.OS === "ios") {
//         path = "~" + path.substring(path.indexOf("/Documents"));
//     }
//     return path.split("/").pop();
// }
/**
 * Get platform specific value from response
 */
// getPlatformPath({ path, uri }) {
//     return Platform.select({
//         android: { "value": path },
//         ios: { "value": uri }
//     })
// }

// getPlatformURI(imagePath) {
//     let imgSource = imagePath;
//     if (isNaN(imagePath)) {
//         imgSource = { uri: this.state.imagePath };
//         if (Platform.OS == 'android') {
//             imgSource.uri = "file:///" + imgSource.uri;
//         }
//     }
//     return imgSource
// }


  // function that will say whatever is inside of "name" state.
  
  // selectPicture = async() => {
  // const result  = await ImagePicker.launchImageLibraryAsync({
  //   mediaTypes: ImagePicker.MediaTypeOptions.All,
  //   allowsEditing: true,
  //   aspect: [4, 3],
  //   quality: 1,
  // });
  // console.log(result.uri);

 

  // const {imageName, uploadUri} = this.state;
  // let reference = storage().ref(result.fileName);
  // let task = reference.putFile(result.uri);
  // task.then(() => {
  //   setState({ name : "image uploaded"});
  //   console.log('Image uploaded to the bucket!');
  //   //this.setState({ isLoading: false, status: 'Image uploaded successfully' });
  // }).catch((e) => {
  //     setState({ name : "image upload failed"});
  //     //status = 'Something went wrong';
  //     console.log('uploading image error => ', e);
  //     //this.setState({ isLoading: false, status: 'Something went wrong' });
  // });
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
      <View>       
      <TextInput style ={styles.inputBox} placeholder={"type/paste text here"}
      onChangeText= {(text) => {
        this.setState({ name: text});
      }}
      // User can write multiple lines inside of the Text Input.
      multiline={true}
      value= {this.state.text}>
      </TextInput>
      </View>
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.listenButton}
      // onPress will call the speak function, as well as dismiss the keyboard of the phone.
      onPress ={()=> {
        this.setState({isHidden:true, isHidden4:true, isHidden5:false, isHidden6:false})
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
    marginTop: -90
  },
  inputBox: {
    fontSize:20,
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: '#005588',
    fontSize: 20,
    margin: 10,
    marginTop: -130,
    //paddingLeft: 10,
    textAlign:"center"
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
    opacity: 1,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  shadowOpacity: 0.3,
  shadowRadius: 10.32,
  elevation: 16,
},
listenButton: {
  width: 300,
  height: 50,
  marginTop: -50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 25,
  backgroundColor: '#005588',
  shadowColor: '#000',
  opacity: 1,
  shadowOffset: {
    width: 0,
    height: 8,
  },
shadowOpacity: 0.3,
shadowRadius: 10.32,
elevation: 16,
},
    button2: {
      width: 240,
      height: 40,
      marginTop: 30,
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
  text: {
    marginTop:12,
    marginBottom:-5,
    fontSize: 18,
    color: '#005588',
    textAlign:"center",
  },
  text2: {
    marginTop:-35,
    marginBottom:50,
    fontSize: 18,
    color: '#005588',
    textAlign:"center",
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
