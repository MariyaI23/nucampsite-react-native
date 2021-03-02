import React, { Component } from "react";
import { render } from "react-dom";
import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { CAMPSITES } from "../shared/campsites";
import { PROMOTIONS } from "../shared/promotions";
import { PARTNERS } from "../shared/partners";

//The ScrollView component can be used to render lists of items like FlatList can be used for that as well.
//Major difference between the two is that FlatList uses LazyLoading(it renders the items that are in the visible part of the screen or just aboutto become visible. Those that are scrolled far off screen are removed from memory to improve perforamnce)
//ScrollView however, renders all of its child components at once. If we have a long list of components-FlatList is a better choice.
//In ScrollView we will be rendering 3 cards to display the featured campsite, promotion and partner. Since they will have very simillar structure, we'll create a RenderItem component to use for them

function RenderItem({ item }) {
    if(item) {
        return (
            <Card
                featuredTitle={item.name}
                image={require("./images/react-lake.jpg")} 
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

    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            promotions: PROMOTIONS,
            partners: PARTNERS
        };
    }
    
    static navigationOptions = {
        title: "Home"
    }

    render() {
        return (
             <ScrollView>
                 <RenderItem 
                     item={this.state.campsites.filter(campsite => campsite.featured)[0]}
                 />
                 <RenderItem 
                     item={this.state.promotions.filter(promotion => promotion.featured)[0]}
                 />
                 <RenderItem
                     item={this.state.partners.filter(partner => partner.featured)[0]}
                />
             </ScrollView>
        );
    }

}

export default Home;