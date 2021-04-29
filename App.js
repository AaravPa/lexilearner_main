// Open source platform for javascript developers to create apps.
// JSX - combination of Javascript and HTML & CSS
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Add this import for importing icons
import { Ionicons } from '@expo/vector-icons';
// importing all the classes from the other screens.
import PhonemeScreen from "./screens/Phoneme";
import TextToSpeechScreen from "./screens/TextToSpeech";
import ScannerScreen from "./screens/Scanner";
 const Tab = createBottomTabNavigator();

 // exporting the class here.
 export default function App() {
   return (
// Creating a container to contain all the navigation like stack and tab navigator.
<NavigationContainer>
     <Tab.Navigator
         screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // if statement where if the routename, or the name of the tab, is Audify, then the icon will be a headset.
          if (route.name === 'Audify') {
            // if the tab is being focused or not focused, it will be a headset.
            iconName = focused
            ? 'ios-headset'
            : 'ios-headset';
            // if statement where if the routename, or the name of the tab, is WordBreaker, then the icon will be a list.
          } else if (route.name === 'WordBreaker') {
            // if the tab is not being focused, it will be a list, but if it is focused, it will be a list, but it will be fully highlighted with a box around the icon.
            iconName = focused
            ? 'ios-apps' 
            : 'ios-apps';
            // if statement where if the routename, or the name of the tab, is Quiz, then the icon will be a question mark.
          } else if (route.name === 'Scanner') {
            iconName = focused
            ? 'ios-camera'
            : 'ios-camera';
          }
    
    // returning the icons to display it.
    return <Ionicons name={iconName} size={size} color={color}/>;
       },
    })}
    // if the icon is active, then the color will be blue. If it isn't, then it will be gray.
    tabBarOptions={{
    activeTintColor: 'blue',
    inactiveTintColor: 'gray',
    }}>
        <Tab.Screen name="Audify" component={TextToSpeechScreen} />
        <Tab.Screen name="Scanner" component={ScannerScreen}/>
        <Tab.Screen name="WordBreaker" component={PhonemeScreen}/>
     </Tab.Navigator>
 </NavigationContainer>
   );
 }
