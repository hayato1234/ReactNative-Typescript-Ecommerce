import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/HomeScreen";
import ItemDetail from "../screens/ItemDetailScreen";
import About from "../screens/AboutScreen";
import Gear from "../screens/OfficialGearScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerNav() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Our Gears" component={Gear} />
      <Drawer.Screen name="About us" component={About} />
    </Drawer.Navigator>
  );
}

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="DrawerItems"
          component={DrawerNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ItemDetail" component={ItemDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
