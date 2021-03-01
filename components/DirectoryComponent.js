import React, { Component } from "react";
import { FlatList } from "react-native";
import { ListItem} from "react-native-elements";
import { CAMPSITES } from "../shared/campsites";

//FlatList is somewhat simillar to <ol> tag and ListItem - to <li>
//FlatList has several props: data expects and array of data;renderItem-will specify how to render each item in the list. It will do that by using a call back function
//keyExtractor prop is simillar to "key" in React. It will need a unique identifier for every item in the array. This will be provided by the id property of each array item. Since keyExtractor expects a string we need to chain the .toString() method to convert the id from a number to a string.
//The 1 parameter gets passed by default from FlatList to renderDirectoryItem. The parameter that gets passed is actually an object. We need only 1 of the properties of this object and that is why we are desctructuring it inside the parameter list and using just the "item" property.
//Simillar to the map() method, FlatList will iterate over every item of the array we have provided to it's data prop. Then it will run the function we gave to it's renderItem prop on every single one of those items. So in the rednerDirectoryItem function we can access every item that has been iterated over as "item".
//In the renderDirectoryComponent we will return the <ListItem> component. It comes with it's own props:title-for the name of each item;subtitle-for the description; leftAvatar prop requires an object(that is why we are using 2 sets of {}-the first one to embed JS inside JSX and the second set- for the object.).
//This object has a property of source and for it's value we are setting up a function called "require()"- it is provided to us from node.js. We will give the require function as an argument the location of the image we want to use
// The ListItem component comes with it's own onPress built in prop.So when this component is pressed on a mobile device, the function we give to the onPress prop will automatically fire. This is how we will trigger the onCampsiteSelect event handler that we passed as props to the Directory component from the Main component.
//In that function we have access to the id of the pressed campsite

//With the static JS keyword we will be able to set the title that will show in the navigation(in the header)
//Each screen component in our app is provided with the "navigation" prop automatically. This prop has many functions that dispatch navigation actions on the Route's router.
// Since we set the Directory component as a "screen" in the DirectoryNavigator component, that way the Directory component has automatically received the navigation prop and all if it's functions including "navigate".
// We will use that specific function to route the user to a campsite when he presses on it.
//Since the "navigate" function is all that is needed here from the navigation prop, we can destructure it.
//The onPress attribute that was calling the onPress function which was calling the onCampsite select function had to be changed as we are no longer using the last function from the Main component.
//Instead we will use the navigate function which will take 2 arguments. The first one is the name of the screen we want to navigate to, and the second(optional) argument adds more parameters to the route.
//In this case that addl parameter will be the campsiteId and we will give it the value of the id of the campsite that was pressed.Now when an item is pressed it will call this navigate function in order to switch to the CampsiteInfo screen, and the camspiteId parameter will be used to pass the correct campsite object to it.


class Directory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

    static navigationOptions = {
        title: "Directory"
    };

    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                   // onPress={() => props.onPress(item.id)}
                      onPress = {() => navigate("CampsiteInfo", { campsiteId: item.id })}
                    leftAvatar={{ source: require("./images/react-lake.jpg")}}
                />

            );
        };
        
        return (
            <FlatList
                data={this.state.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default Directory;