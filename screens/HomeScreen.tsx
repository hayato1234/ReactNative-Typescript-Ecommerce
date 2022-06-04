import React, { Component, useEffect, useState } from "react";
import { Text, FlatList, TouchableOpacity } from "react-native";
import { Card } from "@rneui/base";
import { ITEMS } from "../shared/items";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { getItemsStatus, itemSelector } from "../redux/item/item.selectors";
import { fetchItemList } from "../redux/item/item.reducer";

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

const Home = (props: PropType) => {
  const dispatch: any = useDispatch(); //fix any!!
  const [items, setItems] = useState(ITEMS);
  const myItems: Item[] = useSelector(itemSelector).items;
  const isLoading = useSelector(getItemsStatus);
  console.log(isLoading);
  useEffect(() => {
    if (isLoading === "idle") {
      dispatch(fetchItemList());
    }
  }, [isLoading, dispatch]);

  console.log(items.length);
  // setItems(items.concat(myItems));
  const { navigate } = props.navigation;
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
      data={items}
      keyExtractor={(item: Item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default Home;

// export default class Home extends Component<PropType, StateType> {
//   constructor(props: PropType) {
//     super(props);
//     // const myItems = useSelector(itemSelector)
//   }

//   state: StateType = {
//     items: ITEMS,
//   };

//   // myItems = useSelector(itemSelector);

//   render() {
//     // const myItems = useSelector(itemSelector);
//     // console.log(myItems);
//     const { navigate } = this.props.navigation;
//     const renderItem = ({ item }: { item: any }) => {
//       return (
//         <TouchableOpacity
//           style={{ flex: 1 }}
//           onPress={() => navigate("ItemDetail", { itemId: item.id })}
//         >
//           <Card>
//             <Card.Title>{item.title}</Card.Title>
//             <Card.Image source={item.image} resizeMode="center" />
//             <Text>{item.title}</Text>
//             <Text>${item.price}</Text>
//           </Card>
//         </TouchableOpacity>
//       );
//     };
//     return (
//       <FlatList
//         data={this.state.items}
//         keyExtractor={(item: Item) => item.id.toString()}
//         renderItem={renderItem}
//       />
//     );
//   }
// }
