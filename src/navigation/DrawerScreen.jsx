import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RandomName from "../screens/RandomName";
import RandomNumber from "../screens/RandomNumber";
import RandomMixGenerator from "../screens/RandomMixGenerator";
import CustomDrawerContent from "../components/CustomDrawerContent";
import RecordSwitch from "../components/RecordSwitch";
import iconLogo from "../../assets/icon.png";
import { Image } from "react-native";
import History from "../screens/History";

const RNDrawer = createDrawerNavigator();

const DrawerScreen = ({ theme, setTheme }) => {

  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [visible, setVisible] = useState(false);
  const [error , setError] = useState(null);

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
        headerTitle: () => (
          <Image
            source={iconLogo}
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
          />
        ),
        headerTitleAlign: 'center',
        headerTintColor: theme.colors.onPrimary,
        headerRight: () => (
          <RecordSwitch theme={theme} isRecording={isRecording} setIsRecording={setIsRecording} videoUri={videoUri} setVideoUri={setVideoUri}
            visible={visible} setVisible={setVisible} error={error} setError={setError} />
        ),
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} theme={theme} setTheme={setTheme} />}
    >
      <RNDrawer.Screen name="Names" component={RandomName} />
      <RNDrawer.Screen name="Numbers" component={RandomNumber} />
      <RNDrawer.Screen name="Mixs" component={RandomMixGenerator} />
      <RNDrawer.Screen name="History" component={History} />
    </RNDrawer.Navigator>
  );
};

export default DrawerScreen;
