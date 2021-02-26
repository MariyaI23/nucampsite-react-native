import React from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";

//From the props we will pull the campsite object and send it another component - the RenderCampsite.
//The RenderCampsite component will receive in it's parameter list the property "campsite" from the destructured campsite object it erecived as props
// with if(campsite) we are checking if campsites is null or undefined-if it is-it will return false, otherwsie it'll be truthy.
//The Card component from react-native-elements lets us use a featuredTitle prop-which value will be the campsite name. The image prop again will use the require() function with the path to the image
//The Text component from react-native is also rendered inside the Card component and we can use style prop to style it. Since this is an object we again need to use the 2 sets of {}. Style might look like CSS but it is not. This is JS.
//If the if statement returns as falsy we will just return an empty <View/> tag simillar to an empty <div>

function RenderCampsite({campsite}) {
    if (campsite) {
        return (
            <Card 
                featuredTitle={campsite.name}
                image={require("./images/react-lake.jpg")} >
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
            </Card>

        );
    }
    return <View />;
}


function CampsiteInfo(props) {
    return <RenderCampsite campsite={props.campsite} />;
}

export default CampsiteInfo;