import React, { Component } from "react";
import Home from "./HomeComponent";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import { View, Platform} from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

//The createStackNavigator is a function which will store in the DirectoryNavigator. The function has 1 required argument called the routeConfig object.This object will hold the components which will be part of the navigation stack.
//The second argument of the createStackNavigator function is optional. The initialRoutName-sets the default view of whichever component we want displyed first when the app loads.
//The defaultNavigationOptions object will help to configure the settings for the header.These are built-in settings, not custom ones
//We will be passing the createStackNavigator(or rather tha variable DirectoryNavigator which holds it's return value) to the next function we imported-createAppContainer. We will assign the return value of createAppContainer to a variable named AppNavigator. The createAppContainer will return our top-level Navigator Component and connect it to the React-Native environment. Most often we will have to wrapp our top navigator component in a createAppContainer like this.

const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory },
        CampsiteInfo: { screen:CampsiteInfo }
    },
    {
        initialRouteName: "Directory",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#5637DD"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff"
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home},
        
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#5637DD"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff"
            }
        }
    }
);

//Creating the drawer navigator. The createDrawerNavigator function will have the first argument be an object that contains the screens(views) that will be in the drawer
//We want to route through the stack navigator, that is why we are setting up the screens to render the HomeNavigator and the DirectoryNavigator instead of just the Home and the Directory components.
//In the optional second argument for addl configuration we can set the drawer's background color

const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator }
    },
    {
        drawerBackgroundColor: "#CEC8FF"
    }
)

const AppNavigator = createAppContainer(MainNavigator);

//The flex: 1 in the View start tag is to make a flexible component of normal size
//The second prop in the Dircetory component-onPress-we will pass it an arrow function that takes the campsiteId as a parameter, and it containes the onCampsiteSelect event handler inside the funnction's body.
//We are not calling the onCampsiteSelect function here, we are just passing it to the Directory component, so it can be triggered from there.
//We are also rendering the CampsiteInfo component. We are passing a prop "campsite" but we need to pass the whole campsites array and filter through it to find the matching camspite id that was chosen from the user and triggered the onCampsiteSelect function.
//Filter method always returns an array so we will grab the first item with index 0 by adding- [0]

class Main extends Component {
    //constructor(props) {
       // super(props);
       // this.state = {
         //   campsites: CAMPSITES,
           // selectedCampsite: null
        //};
    //}

    //onCampsiteSelect(campsiteId) {                       //This was comennted out from here as we will have this be handled now in the Directory component
        //this.setState({selectedCampsite: campsiteId})
    //}

    //The Directory and the CampsiteInfo components rendered below are replaced by the AppNavigator variable which now holds the container that holds the DirectoryNavigator, which in it's turn holds both the screens for the Directory and the CampsiteInfo components.
    //The paddingTop property of the style object will need to utilize the Platform API we imported from react-native. That will help us set some conditions to check if the devise is IOS or not using the ternary operator. The reason is that on different devices the padding will render differently so we need to be able to handle both cases.
    //If the Platform Operating System is "ios" the padding will be 0, if not, we will use the value given to us by Expo which sets the statusBarHight dinamically


    render() {
        return (
            <View style={{
                    flex: 1,
                    paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
                }}
            >

                <AppNavigator />

               {/* <Directory 
                    campsites={this.state.campsites} 
                    onPress={campsiteId => this.onCampsiteSelect(campsiteId)}
                />
                <CampsiteInfo
                    campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]}
               />*/}

            </View>
        );
    }
}

export default Main;