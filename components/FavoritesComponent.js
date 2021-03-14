import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

//This component will displaying only the favorited campsites. In it's return method we are rendering a FlatList.
//In the FlatList we are using the data prop to access the campsites part of the whole campsites object. Then we need to filter through that to find
//the id of the campsite that matches one of ids that are in the list of favorites. We access that with this.props.favorites. The favorites array is an array of campsite ids.
//For every campsite object we'll check if the favorites array includes() the id of that campsite.
//The filter method will return a new array that consists of all the campsites with ids that found a match in tne favorites array.
//In the keyExtractor prop we will pass each item into a function that will extract the id from each item and then turn that id(which is a number) to a string. That way we have a unique key to use for each item.

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        favorites: state.favorites
    };
};

class Favorites extends Component {
   
    static navigationOptions = {
        title: "My Favorites"
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                    onPress={() => navigate("CampsiteInfo", {campsiteId: item.id})}
                />
            );
        };


        if (this.props.campsites.isLoading) {
            return <Loading />;
        }
        if ( this.props.campsites.errMess) {
            return (
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
                </View>
            );
        }

        return(
            <FlatList
                data={this.props.campsites.campsites.filter(campsite => this.props.favorites.includes(campsite.id))}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
            />
        )

    }
}


export default connect(mapStateToProps)(Favorites);