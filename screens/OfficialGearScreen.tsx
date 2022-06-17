import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { Card, ListItem } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import { OFFICIALS } from "../shared/officials";

type PropType = {};
type StateType = {
  items: Item[];
};

class Gear extends Component<PropType, StateType> {
  state: StateType = {
    items: OFFICIALS,
  };

  static navigationOptions = {
    title: "Official Gears",
  };

  render() {
    const renderItem = ({ item }: { item: any }) => {
      return (
        <Card>
          <Card.Image source={item.image} resizeMode="cover" />
          <Text>{item.title}</Text>
          <Text>{item.price ? "$" + item.price : ""}</Text>
        </Card>
      );
    };
    return (
      <FlatList
        data={this.state.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    );
  }
}

export default Gear;
