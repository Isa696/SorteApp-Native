import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RandomName from "../screens/RandomName";
import RandomNumber from "../screens/RandomNumber";
import RandomMixGenerator from "../screens/RandomMixGenerator";
import CustomDrawerContent from "../components/CustomDrawerContent";

const RNDrawer = createDrawerNavigator();

const DrawerScreen = ({ theme, setTheme }) => {

  return (
    <RNDrawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: "70%",
          backgroundColor: theme.colors.secondary,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTitle: "SorteApp",
        headerTintColor: theme.colors.onPrimary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} theme={theme} setTheme={setTheme} />}
    >
      <RNDrawer.Screen name="Names" component={RandomName} />
      <RNDrawer.Screen name="Numbers" component={RandomNumber} />
      <RNDrawer.Screen name="Mixs" component={RandomMixGenerator} />
    </RNDrawer.Navigator>
  );
};

export default DrawerScreen;
