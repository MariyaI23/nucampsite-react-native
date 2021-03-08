import React, { Component } from "react";
import { ScrollView, FlatList, Text} from "react-native";
import { ListItem, Card} from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

//The mapStateToProps function receives the state as a prop and returns the parthers data from the state
//In the FlatList at the bottom, after introducing redux and the json server we are no longer using this.state.partners but had to replace it with
//this.props.partners.partnes - the first partners ref. to the entire part of the state including the error messages, loading etc, including the actual partners array. The second partners is exactly that array that we are grabbing from the state.

const mapStateToProps = state => {
    return {
        partners: state.partners
    };
};


function Mission() {
    return (
        <Card title="Our Mission">
            <Text style={{margin: 10}}>
                We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness.
                We increase access to adventure for the public while promoting safe and respectful use of resources. 
                The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards.
                We also present a platform for campers to share reviews on campsites they have visited with each other.
            </Text>
        </Card>
    );
}


class About extends Component {
   
    static navigationOptions = {
        title: "About Us"
    }

    render() {
        
        const renderPartner = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: {uri: baseUrl + item.image}}}
                />
            );
        };

        return (
            <ScrollView>
                <Mission />
                <Card title="Community Partners">
                    <FlatList 
                        data= {this.props.partners.partners}
                        renderItem={renderPartner}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
                
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(About);