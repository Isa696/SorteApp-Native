import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import themes from '../styles/themes';

const ThemeSwitch = ({ theme, setTheme }) => {
  const isDarkTheme = theme === themes.dark;

  const onToggleSwitch = () => {
    setTheme(isDarkTheme ? themes.light : themes.dark);
  };

  return (
    <TouchableOpacity
      onPress={onToggleSwitch}
      style={{
        width: 60,
        height: 30,
        borderRadius: 15,
        backgroundColor: isDarkTheme ? theme.colors.primary : theme.colors.surfaceDisabled,
        padding: 5,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: isDarkTheme ? 'flex-end' : 'flex-start',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <IconButton
          icon={isDarkTheme ? "moon-waning-crescent" : "white-balance-sunny"}
          iconColor={theme.colors.text}
          size={20}
          style={{ margin: 0 }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ThemeSwitch;
