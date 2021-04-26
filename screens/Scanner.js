// importing React
import React from 'react';
// Importing all the necessary components.
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native';
// Importing "Speech" to say what the user typed in.
import * as Speech from "expo-speech";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { firebase } from '../config';
import { Camera } from "expo-camera";


export default class TextToSpeechScreen extends React.Component {
  constructor(props) {
    super(props);
    // state will contain what the user typed.
    this.state = {
      name: "",
      status: '',
      isSelectPictureVisible:true,
      isListenAndResetVisible:false,
      isTextVisible:false,
      isTakePhotoVisible:true,
      isCameraVisible:false,
      startCamera: false,
      wasTakePhotoPressed:false, 
    }
  } 
  chooseFile = async() => {

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      this.uploadImage(result.uri);
};

uploadImage = async (uri) => {
  this.setState({status : "uploading..", isSelectPictureVisible:false, isTextVisible:true, isListenAndResetVisible:true, isTakePhotoVisible:false });
  var response = await fetch(uri);
  var blob = await response.blob();
  var fileName = Date.now()+".png"
  var ref = firebase
    .storage()
    .ref()
    .child("files/"+fileName);

  return ref.put(blob).then((response) => {
    this.fetchImage(fileName);
  });
};

fetchImage = (fileName) => {
  var storageRef = firebase
    .storage()
    .ref()
    .child("files/" + fileName);

  // Get the download URL
  storageRef
    .getDownloadURL()
    .then((url) => {
      this.setState({ status: "fetching..."});
      this.performOCR(url);
    })
    .catch((error) => {
      this.setState({ status: "#" });
    });
};

startCamera = async() => {
  const {status} = await Camera.requestPermissionsAsync();
  this.setState({
    startCamera: status === "granted"
  })
}

  // function that will say whatever is inside of "name" state.
  speak = () => {
    var thingToSay = this.state.status; 
    Speech.speak(thingToSay);
  }

  performOCR = async(url) => {
    try {
    let body = JSON.stringify({
      requests: [
        {
          "image": {
              "source": {
                "imageUri": url
              }
          },
          features: [
            { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
          ]
        }
      ]
    });
    console.log(body);
    let response = await fetch(
      'https://vision.googleapis.com/v1/images:annotate?key='+'AIzaSyDs33U1Dwj_k2i-D_vZbkzAdAtGkGeqDKI',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: body
      }
    );

    var responseJson = await response.json();
    var stringifiedResponse = JSON.stringify(responseJson)
    var array = JSON.parse(stringifiedResponse)
    var text = array.responses[0].fullTextAnnotation.text;
    this.setState({status:text}) 
 
  } catch (error) {
    console.log(error); 
    this.setState({status:error}) 
  }
}
 render() {
    return (
    <View style={styles.container}>
       {this.state.startCamera ? ( 
        <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={(ref) => {this.camera = ref}}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button3}  
               onPress={async() => { 
                 const {uri} = await this.camera.takePictureAsync();
                 this.setState({startCamera:false})
                 this.uploadImage(uri)
              }}>
                <Image style={{width:"65%", height:"65%",marginLeft:12.5, marginTop:-5}} source={require('../camera.png')}/>
            </TouchableOpacity>
          </View>
        </Camera>
        ) : (
          <View style={styles.container}>
            <View style={styles.profileContainer}>
              <Text style={styles.title}>Scanner</Text>
            </View>
            <View style={styles.buttonContainer}>
            {this.state.isSelectPictureVisible && 
          <TouchableOpacity style={styles.button}
          onPress={()=> {
            this.chooseFile();
          }}>   
            <Text style ={styles.buttonText}>Select A Picture</Text>
          </TouchableOpacity>
          }
          {this.state.isTextVisible && 
          <Text style ={styles.text}>{this.state.status}</Text>
          }
          {this.state.isListenAndResetVisible && 
          <TouchableOpacity style={styles.button2}
          // onPress will call the speak function, as well as dismiss the keyboard of the phone.
          onPress ={()=> {
            this.speak();     
            Keyboard.dismiss();
          }}>
            
            <Text style ={styles.buttonText}>Listen</Text>
            
          </TouchableOpacity>
          }
          {this.state.isTakePhotoVisible && 
          <TouchableOpacity style={styles.button2}
          // onPress will call the speak function, as well as dismiss the keyboard of the phone.
          onPress ={()=> {
            this.startCamera();
              this.setState({wasTakePhotoPressed:true})
            //this.setState({ isCameraVisible:true})
            
          }}>
            <Text style={styles.buttonText}>Take A Photo</Text>
          </TouchableOpacity>
          }
          {this.state.isListenAndResetVisible && 
          <TouchableOpacity style={styles.button2}
          // onPress will call the speak function, as well as dismiss the keyboard of the phone.
          onPress ={()=> { 
              this.setState({isSelectPictureVisible:true, isListenAndResetVisible:false,
                isTextVisible:false, isTakePhotoVisible:true, isCameraVisible:false,})
          }}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          }
            </View>
          </View>
          )
      } 
      </View>
     
    )
  }
 }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdb469',
  },
  camera: {
    flex:1
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontSize: 55,
    fontWeight: "200",
    paddingBottom: 25,
    color: '#f98003',
    marginTop: -90
  },
  button: {
    width: 300,
    height: 50,
    marginTop: -50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#f98003',
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
      marginTop:20,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 64,
      backgroundColor: '#f98003',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  button3: {
    width: 70,
    height: 70,
    marginTop:700,
    justifyContent: 'center',
    textAlign:"center",
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
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
    marginTop:-120,
    marginBottom:20,
    fontSize: 18,
    color: '#a15202',
    borderRadius:1,
    borderWidth:0.8,
    borderColor:"#a15202"
  },
  text2: {
    marginTop:10,
    marginBottom:20,
    fontSize: 18,
    color: '#000',
    textAlign:"center",
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
