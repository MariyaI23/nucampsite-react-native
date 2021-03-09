import React, { Component } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite } from "../redux/ActionCreators";

//From the props we will pull the campsite object and send it another component - the RenderCampsite.
//The RenderCampsite component will receive in it's parameter list the property "campsite" from the destructured campsite object it recieved as props. Later on we needed addl props so just added props in the parameter list so we can receive all of them. Then inside the function we still destructured the {campsite} prop
// with if(campsite) we are checking if campsites is null or undefined-if it is-it will return false, otherwsie it'll be truthy.
//The Card component from react-native-elements lets us use a featuredTitle prop-which value will be the campsite name. The image prop again will use the require() function with the path to the image
//The Text component from react-native is also rendered inside the Card component and we can use style prop to style it. Since this is an object we again need to use the 2 sets of {}. Style might look like CSS but it is not. This is JS.
//If the if statement returns as falsy we will just return an empty <View/> tag simillar to an empty <div>
//In the RenderComments functional component we will return a FlatList inside the Card as the FlatList expects an array and we are providing the comments array as its data. For tne renderItem prop we will give a function name renderCommentItem
//Since all the comments have an unique id we can set the keyExtractor prop of the FlatList to use that id for the unique key required for every item in the array.
//The renderCommentItem function automatically gets item as part of the props so we are destructuring it. We are using templete literal for the author and date of the comment in order to be able to use some dashes and a comma in the text that will be displayed
//The boolean favorite property in the state of the Campsite info component is set up there for now and it will store if the  selected campsite has been marked as a favorite or not. It is initialized to false and an event handler (markFavorite) has been set up to toggle it to true
//The the markFavorite event handler and the favorite state data has to passed as props in the rendering of the RenderCampsite component at the bottom
//The name prop of the Icon component is set up to check if it has received from props the favorite property as true or false. If true-that means the heart icon will be displayed in solid color, if false-it will just be outlined.

//After introducing redux and json server we are now getting all of the state data from redux
//Since we are now tracking the campsiteId through the store we need to pass it to markFavorite.

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId))
};

function RenderCampsite(props) {

    const {campsite} = props;
    if (campsite) {
        return (
            <Card 
                featuredTitle={campsite.name}
                image={{uri: baseUrl + campsite.image}} >
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
                <Icon 
                    name={props.favorite ? "heart" : "heart-o"}
                    type="font-awesome"
                    color="#f50"
                    raised
                    reverse
                    onPress={() => props.favorite? console.log("Already set as a favorite") : props.markFavorite()}
                />
            </Card>

        );
    }
    return <View />;
}


function RenderComments({comments}) {
    
        const renderCommentItem = ({item}) => {
            return (
              <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
              </View>
            );
        };

        return (
            <Card title="Comments">
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />

            </Card>
        );
}

class CampsiteInfo extends Component {

    markFavorite(campsiteId) {
        this.props.postFavorite(campsiteId);
    }

    static navigationOptions = {
        title: "Campsite Information"
    }

    render() {
        const campsiteId = this.props.navigation.getParam("campsiteId");
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
        return (
          <ScrollView>
            <RenderCampsite campsite={campsite} 
                favorite={this.props.favorites.includes(campsiteId)}
                markFavorite={() => this.markFavorite(campsiteId)}
            />
            <RenderComments comments={comments} />
          </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);