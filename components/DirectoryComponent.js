import React from "react";
import { FlatList } from "react-native";
import { ListItem} from "react-native-elements";

//FlatList is somewhat simillar to <ol> tag and ListItem - to <li>
//FlatList has several props: data expects and array of data;renderItem-will specify how to render each item in the list. It will do that by using a call back function
//keyExtractor prop is simillar to "key" in React. It will need a unique identifier for every item in the array. This will be provided by the id property of each array item. Since keyExtractor expects a string we need to chain the .toString() method to convert the id from a number to a string.
//The 1 parameter gets passed by default from FlatList to renderDirectoryItem. The parameter that gets passed is actually an object. We need only 1 of the properties of this object and that is why we are desctructuring it inside the parameter list and using just the "item" property.
//Simillar to the map() method, FlatList will iterate over every item of the array we have provided to it's data prop. Then it will run the function we gave to it's renderItem prop on every single one of those items. So in the rednerDirectoryItem function we can access every item that has been iterated over as "item".
//In the renderDirectoryComponent we will return the <ListItem> component. It comes with it's own props:title-for the name of each item;subtitle-for the description; leftAvatar prop requires an object(that is why we are using 2 sets of {}-the first one to embed JS inside JSX and the second set- for the object.).
//This object has a property of source and for it's value we are setting up a function called "require()"- it is provided to us from node.js. We will give the require function as an argument the location of the image we want to use


function Directory(props) {

    const renderDirectoryItem = ({item}) => {
        return (
            <ListItem
                title={item.name}
                subtitle={item.description}
                leftAvatar={{ source: require("./images/react-lake.jpg")}}
            />

        );
    };
    
    return (
        <FlatList
            data={props.campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
        />
    );
}

export default Directory;