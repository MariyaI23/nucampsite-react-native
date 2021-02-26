import React, { Component } from "react";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import { View } from "react-native";
import { CAMPSITES } from "../shared/campsites";

//The flex: 1 in the View start tag is to make a flexible component of normal size
//The second prop in the Dircetory component-onPress-we will pass it an arrow function that takes the campsiteId as a parameter, and it containes the onCampsiteSelect event handler inside the funnction's body.
//We are not calling the onCampsiteSelect function here, we are just passing it to the Directory component, so it can be triggered from there.
//We are also rendering the CampsiteInfo component. We are passing a prop "campsite" but we need to pass the whole campsites array and filter through it to find the matching camspite id that was chosen from the user and triggered the onCampsiteSelect function.
//Filter method always returns an array so we will grab the first item with index 0 by adding- [0]

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            selectedCampsite: null
        };
    }

    onCampsiteSelect(campsiteId) {
        this.setState({selectedCampsite: campsiteId})
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Directory 
                    campsites={this.state.campsites} 
                    onPress={campsiteId => this.onCampsiteSelect(campsiteId)}
                />
                <CampsiteInfo
                    campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]}
                 />
            </View>
        );
    }
}

export default Main;