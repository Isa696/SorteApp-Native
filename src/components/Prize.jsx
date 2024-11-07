import React, { useRef, useState } from "react";
import { View, StyleSheet, Pressable, Animated  } from "react-native";
import {
  TextInput,
  useTheme,
  IconButton,
  Text,
  Menu
} from "react-native-paper";

export default function Component({ prize, setPrize, onSelect }) {
  const emojis = ["🏆", "🥇", "🥈", "🥉", "🎉", "🎁", "🎮", "📺", "🖥️", "📱"];
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });

  const fadeAnim = useRef(new Animated.Value(0)).current; // Valor de opacidad inicial

  const openMenu = () => {
    setMenuVisible(true);
    // Inicia la animación de desvanecimiento
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    // Inicia la animación de desvanecimiento para ocultar el menú
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false)); // Oculta el menú al finalizar la animación
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
    closeMenu();
  };

  const onLayout = (event) => {
    const { x, y, height } = event.nativeEvent.layout;
    setInputPosition({ x: x - 40, y: y + height + 10 }); // Ajuste para mostrar justo debajo del TextInput
  };

  return (
    <View style={stylesPrize.container}>
      <TextInput
        mode="flat"
        label="Premio"
        labelTextColor={theme.colors.primary}
        placeholder="20 letras max"
        placeholderTextColor={theme.colors.primary}
        textColor={theme.colors.text}
        underlineColor={theme.colors.primary}
        activeUnderlineColor={theme.colors.accent}
        value={prize}
        onChangeText={setPrize}
        onLayout={onLayout} // Captura la posición y altura del TextInput
        style={[
          stylesPrize.textInput,
          { backgroundColor: theme.colors.secondary, color: theme.colors.text },
        ]}
        maxLength={20}
        right={
          <TextInput.Icon
            icon={() => (
              <IconButton
                mode="outlined"
                iconColor={theme.colors.text}
                rippleColor={theme.colors.accent}
                style={{ borderColor: theme.colors.accent }}
                size={20}
                icon={menuVisible ? "chevron-up" : "chevron-down"}
                onPress={() => (menuVisible ? closeMenu() : openMenu())}
              />
            )}
          />
        }
        left={
          <TextInput.Icon
            icon={() => (
              <Pressable
                onPress={() => {
                  setSelectedItem(""), onSelect("");
                }}
                style={stylesPrize.emojiButton}
              >
                <Text style={stylesPrize.emoji}>{selectedItem}</Text>
              </Pressable>
            )}
          />
        }
      />

      {/* Menú posicionado debajo del TextInput */}
      {menuVisible && (
        <View style={[stylesPrize.menu, { top: inputPosition.y, left: inputPosition.x , backgroundColor: theme.colors.background}]}>
          {emojis.map((emoji, index) => (
            <Pressable key={index} onPress={() => handleSelect(emoji)}>
              <Text style={stylesPrize.emoji}>{emoji}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const stylesPrize = StyleSheet.create({
  container: {
    width: "95%",
    maxWidth: 550,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  emojiButton: {
    margin: 5,
  },
  emoji: {
    fontSize: 20,
  },
  menu: {
    position: "absolute",
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    zIndex: 999,
    maxHeight: 200,
    width: "100%",
    overflow: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 15,
    gap: 50,
  },
});
