import React, { Component } from "react";
import Home from "./HomeComponent";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import Reservation from "./ReservationComponent";
import Favorites from "./FavoritesComponent";
import { View, Platform, StyleSheet, Text, ScrollView, Image } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Icon } from "react-native-elements";
import SafeAreaView from "react-native-safe-area-view";
import { connect } from "react-redux";
import {
  fetchCampsites,
  fetchComments,
  fetchPromotions,
  fetchPartners,
} from "../redux/ActionCreators";

//The createStackNavigator is a function which return value we will store in the DirectoryNavigator. The function has 1 required argument called the routeConfig object.This object will hold the components which will be part of the navigation stack.
//The second argument of the createStackNavigator function is optional. The initialRoutName-sets the default view of whichever component we want displyed first when the app loads.
//The defaultNavigationOptions object will help to configure the settings for the header.These are built-in settings, not custom ones
//We will be passing the createStackNavigator(or rather tha variable DirectoryNavigator which holds it's return value) to the next function we imported-createAppContainer. We will assign the return value of createAppContainer to a variable named AppNavigator. The createAppContainer will return our top-level Navigator Component and connect it to the React-Native environment. Most often we will have to wrapp our top navigator component in a createAppContainer like this.
//We can specify specific navigationOptions for each screen. We are passing the navigation prop to the onPress event so we can use the built-in function toggleDrawer() of the navigation prop. That way when the icon is pressed it will open the side drawer.
//In the Home/About/Contact Navigators we can continue to use the default Navigations option as it is only one screen. We can destructure the navigation prop and use an arrow function. After the => we are using a set of () around the {} so the function doesn't think that we are entering a function body as we are not. We are defining an object literal. As that is also surrounded by {} the arrow function might consider it as the body of the function.
//After introducing redux and json server we are now needing to dispatch our action creators. Those listed action creators have been thunked in order to send async calls to json server to bring back data from the there.
//the mapDispatchToProps allows us to use these action creators as props just as mapStateToProps allows us to use state data as props. The action creators will be called in the componentDidMount method just above the render() method of the Main Component

const mapDispatchToProps = {
  fetchCampsites,
  fetchComments,
  fetchPromotions,
  fetchPartners
};


const DirectoryNavigator = createStackNavigator(
  {
    Directory: { 
      screen: Directory,
      navigationOptions: ({navigation}) => ({
        headerLeft: <Icon
            name="list"
            type="font-awesome"
            iconStyle={styles.stackIcon} 
            onPress={() => navigation.toggleDrawer()}
        />
      })
     },
    CampsiteInfo: { screen: CampsiteInfo },
  },
  {
    initialRouteName: "Directory",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: <Icon 
          name="home"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
      />
    }),
  }
);

const AboutNavigator = createStackNavigator(
  {
    About: { screen: About },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: <Icon 
          name="info-circle"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
      />
    }),
  }
);

const ContactNavigator = createStackNavigator(
  {
    Contact: { screen: Contact },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: <Icon
          name="address-card"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()} 
      />
    }),
  }
);

const ReservationNavigator = createStackNavigator(
  {
    Reservation: { screen: Reservation }
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: "#5637DD"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      },
        headerLeft: <Icon
            name="tree"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
    })
  }
);

const FavoritesNavigator = createStackNavigator(
  {
    Favorites: { screen: Favorites },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#5637DD",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="heart"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

//Creating the drawer navigator. The createDrawerNavigator function will have the first argument be an object that contains the screens(views) that will be in the drawer
//We want to route through the stack navigator, that is why we are setting up the screens to render the HomeNavigator and the DirectoryNavigator instead of just the Home and the Directory components.
//In the optional second argument for addl configuration we can set the drawer's background color
//In order to be able to display the icons for each screen in the drawer as well we are adding the navigationOptions to each screen. We will set it up as an object containing the drawerIcon prop.We need to give this prop a function. 
//We will pass this function the tintColor which is available through default. Inside that function body we can add the Icon. The color of that tintColor prop will vary depending on whether this is the active screen or not
//If it is the active screen by default the tintColor will change to blue, if it is inactive it will set it to dark gray.
//The CustomDrawerContentComponent will receive the props as the default parameter and it will return the View of our customized drawer
//The SafeAreaView is specifically for the IPhone X and it defines a safe area where nothing else will be laid out. Inside the SafeAreaView start tag those are the recomended properties to be used.
//The flex:1 style of the first inner View means that it'll take 1/3 of the space of the drawerHeader view, while flex: 2 will take 2/3 of that space
//The DrawerItem component that was imported is used to show all these items in the drawer which items will be passed to this component as props using the spread syntax
//After that we need to connect this CustomDrawerContectComponent to the MainNavigator. At the bottom of it we adding a prop called contentComponent and setting it to the CustomDrawerContectComponent. That will tell the MainNavigator to use the component we gave to render the content of the side drawer

const CustomDrawerContentComponent = props => (
    <ScrollView>
         <SafeAreaView
             style={styles.container}
             forceInset={{top: "always", horizontal: "never"}}
         >
            <View style={styles.drawerHeader}>
              <View style={{flex: 1}}>
                  <Image
                      source={require("./images/logo.png")}
                      style={styles.drawerImage}
                  />
              </View>
              <View style={{flex: 2}}>
                  <Text style={styles.drawerHeaderText}>Nucamp</Text>
              </View>
            </View>
            <DrawerItems {...props} />
         </SafeAreaView>
    </ScrollView>
)

const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    Directory: {
      screen: DirectoryNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="list" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    Reservation: {
      screen: ReservationNavigator,
      navigationOptions: {
        drawerLabel: "Reserve Campsite",
        drawerIcon: ({ tintColor }) => (
          <Icon name="tree" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    Favorites: {
      screen: FavoritesNavigator,
      navigationOptions: {
        drawerLabel: "My Favorites",
        drawerIcon: ({ tintColor }) => (
          <Icon name="heart" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        drawerLabel: "About Us",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="info-circle"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    Contact: {
      screen: ContactNavigator,
      navigationOptions: {
        drawerLabel: "Contact Us",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="address-card"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    drawerBackgroundColor: "#CEC8FF",
    contentComponent: CustomDrawerContentComponent,
  }
);

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

  componentDidMount() {
    this.props.fetchCampsites();
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchPartners();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop:
            Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: "#5637DD",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row"
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold"
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60
  },
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24
  }
});

//Since we don't have mapStateToProps here, the first argument in the connect method should be null, the second argument will be the mapDispatchToProps. This is how the Main component will get access to the action creators.

export default connect(null, mapDispatchToProps)(Main);
