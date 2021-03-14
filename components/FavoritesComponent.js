import React, { Component } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { SwipeRow } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { deleteFavorite } from "../redux/ActionCreators";

//This component will displaying only the favorited campsites. In it's return method we are rendering a FlatList.
//In the FlatList we are using the data prop to access the campsites part of the whole campsites object. Then we need to filter through that to find
//the id of the campsite that matches one of ids that are in the list of favorites. We access that with this.props.favorites. The favorites array is an array of campsite ids.
//For every campsite object we'll check if the favorites array includes() the id of that campsite.
//The filter method will return a new array that consists of all the campsites with ids that found a match in tne favorites array.
//In the keyExtractor prop we will pass each item into a function that will extract the id from each item and then turn that id(which is a number) to a string. That way we have a unique key to use for each item.
//The SwipeRow component will surround the ListItem as we want to unable the ListItem to be swiped to have the additional functionallity become visible.
//The rightOpneValue prop of the SwipeRow determines that the user can swipe from the right. It takes a negative whole number which represents the number of pixels which the user will have to swipe from right to left for this row to open.
//The SwipeRow expects 2 View components after that. The first View will hold the things that stay hidden until the user swipes. The second View will hold the things that are shown on the screen by default before the user swipes.

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    deleteFavorite: campsiteId => deleteFavorite(campsiteId)
};

class Favorites extends Component {
   
    static navigationOptions = {
        title: "My Favorites"
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({item}) => {
            return (
              <SwipeRow rightOpenValue={-100} style={styles.swipeRow}>
                <View style={styles.deleteView}>
                    <TouchableOpacity
                        style={styles.deleteTouchable}
                        onPress={() => this.props.deleteFavorite(item.id)}
                    >
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                <View>
                  <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: { uri: baseUrl + item.image } }}
                    onPress={() =>
                      navigate("CampsiteInfo", { campsiteId: item.id })
                    }
                  />
                </View>
              </SwipeRow>
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

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: "red",
        height: "100%",
        justifyContent: "center"
    },
    deleteText: {
        color: "white",
        fontWeight: "700",
        textAlign: "center",
        fontSize: 16,
        width: 100
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Favorites);