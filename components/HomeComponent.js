import React, { Component } from "react";
import { render } from "react-dom";
import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";

//The ScrollView component can be used to render lists of items like FlatList can be used for that as well.
//Major difference between the two is that FlatList uses LazyLoading(it renders the items that are in the visible part of the screen or just aboutto become visible. Those that are scrolled far off screen are removed from memory to improve perforamnce)
//ScrollView however, renders all of its child components at once. If we have a long list of components-FlatList is a better choice.
//In ScrollView we will be rendering 3 cards to display the featured campsite, promotion and partner. Since they will have very simillar structure, we'll create a RenderItem component to use for them


const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners

    }
}

function RenderItem(props) {

    const {item} = props;

    if(props.isLoading) {
        return <Loading />;
    }

    if(props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }

    if(item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}} 
            >
                <Text
                    style={{margin: 10}}
                >
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />
}


class Home extends Component {
    
    static navigationOptions = {
        title: "Home"
    }

    render() {
        return (
             <ScrollView>
                 <RenderItem 
                     item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                     isLoading={this.props.campsites.isLoading}
                     errMess={this.props.campsites.errMess}
                 />
                 <RenderItem 
                     item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                     isLoading={this.props.promotions.isLoading}
                     errMess={this.props.promotions.errMess}
                 />
                 <RenderItem
                     item={this.props.partners.partners.filter(partner => partner.featured)[0]}
                     isLoading={this.props.partners.isLoading}
                     errMess={this.props.partners.errMess}
                />
             </ScrollView>
        );
    }

}

export default connect(mapStateToProps)(Home);