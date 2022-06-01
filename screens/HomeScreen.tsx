import React, { Component } from "react";
import { Text, FlatList, TouchableOpacity } from "react-native";
import { Card } from "@rneui/base";
import { ITEMS } from "../shared/items";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  ItemDetail: { itemId: number };
};

type PropType = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ItemDetail">;
};
type StateType = {
  items: Item[];
};

export default class Home extends Component<PropType, StateType> {
  state: StateType = {
    items: ITEMS,
  };

  render() {
    const { navigate } = this.props.navigation;
    const renderItem = ({ item }: { item: any }) => {
      return (
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => navigate("ItemDetail", { itemId: item.id })}
        >
          <Card>
            <Card.Title>{item.title}</Card.Title>
            <Card.Image source={item.image} resizeMode="center" />
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
          </Card>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        data={this.state.items}
        keyExtractor={(item: Item) => item.id.toString()}
        renderItem={renderItem}
      />
    );
  }
}
