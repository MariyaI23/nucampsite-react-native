import React, { Component } from "react";
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, Alert, PanResponder } from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

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
    postFavorite: campsiteId => (postFavorite(campsiteId)),
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text))
};

function RenderCampsite(props) {

    const {campsite} = props;

    const view = React.createRef();

    const recognizeDrag = ({dx}) => (dx < -200) ? true : false;

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
          view.current.rubberBand(1000)
          .then(endState => console.log(endState.finished ? "finished" : "canceled"));
      },
      onPanResponderEnd: (e, gestureState) => {
          console.log("pan responder end", gestureState);
          if (recognizeDrag(gestureState)) {
            Alert.alert(
              "Add Favorite",
              "Are you sure you wish to add " + campsite.name + " to favorites?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                  onPress: () => console.log("Cancel Pressed")
                },
                {
                  text: "OK",
                  onPress: () => props.favorite ? console.log("Already set as a favorite") : props.markFavorite()
                }
              ],
              { cancelable: false }
            );
          }

          return true;
      }
    });

    if (campsite) {
        return (
          <Animatable.View 
          animation="fadeInDown" 
          duration={2000} 
          delay={1000}
          ref={view}
          {...panResponder.panHandlers}
          >
            <Card
              featuredTitle={campsite.name}
              image={{ uri: baseUrl + campsite.image }}
            >
              <Text style={{ margin: 10 }}>{campsite.description}</Text>
              <View style={styles.cardRow}>
                <Icon
                  name={props.favorite ? "heart" : "heart-o"}
                  type="font-awesome"
                  color="#f50"
                  raised
                  reverse
                  onPress={() =>
                    props.favorite
                      ? console.log("Already set as a favorite")
                      : props.markFavorite()
                  }
                />
                <Icon
                  name="pencil"
                  type="font-awesome"
                  color="#5637DD"
                  raised
                  reverse
                  onPress={() => props.onShowModal()}
                />
              </View>
            </Card>
          </Animatable.View>
        );
    }
    return <View />;
}


function RenderComments({comments}) {
    
        const renderCommentItem = ({item}) => {
            return (
              <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Rating 
                    readonly
                    startingValue={item.rating}
                    imageSize={10}
                    style={{alignItems: "flex-start", paddingVertical: "5%"}}
                />
                {/*<Text style={{fontSize: 12}}>{item.rating} Stars</Text>*/}
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
              </View>
            );
        };

        return (
          <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
              <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
              />
            </Card>
          </Animatable.View>
        );
}

class CampsiteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: 5,
      author: "",
      text: "",
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment(campsiteId) {
    {
      /*console.log(JSON.stringify(this.state));*/
    }
    this.props.postComment(
      campsiteId,
      this.state.rating,
      this.state.author,
      this.state.text
    );
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      showModal: false,
      rating: 5,
      author: "",
      text: "",
    });
  }

  markFavorite(campsiteId) {
    this.props.postFavorite(campsiteId);
  }

  static navigationOptions = {
    title: "Campsite Information",
  };

  render() {
    const campsiteId = this.props.navigation.getParam("campsiteId");
    const campsite = this.props.campsites.campsites.filter(
      (campsite) => campsite.id === campsiteId
    )[0];
    const comments = this.props.comments.comments.filter(
      (comment) => comment.campsiteId === campsiteId
    );
    return (
      <ScrollView>
        <RenderCampsite
          campsite={campsite}
          favorite={this.props.favorites.includes(campsiteId)}
          markFavorite={() => this.markFavorite(campsiteId)}
          onShowModal={() => this.toggleModal()}
        />
        <RenderComments comments={comments} />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              showRating
              imageSize={40}
              startingValue={this.state.rating}
              onFinishRating={(rating) => this.setState({ rating: rating })}
              style={{ paddingVertical: 10 }}
            />
            <Input
              placeholder="Author"
              leftIcon={{ type: "font-awesome", name: "user-o" }}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(author) => this.setState({ author: author })}
              value={this.state.author}
            />
            <Input
              placeholder="Comment"
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(text) => {
                this.setState({ text: text });
              }}
              value={this.state.text}
            />
            <View style={{ margin: 10 }}>
              <Button
                title="Submit"
                color="#5637DD"
                onPress={() => {
                  this.handleComment(campsiteId);
                  this.resetForm();
                }}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color="#808080"
                title="Cancel"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
        margin: 20
    },
    modal: {
        justifyContent: "center",
        margin: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);