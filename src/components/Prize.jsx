import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import {
  TextInput,
  useTheme,
  IconButton,
  Text,
  Modal
} from "react-native-paper";

export default function Component({ prize, setPrize, onSelect }) {
  const emojis = ["🏆", "🥇", "🥈", "🥉", "🎉", "🎁", "🎮", "📺", "🖥️", "📱"];
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const handlePress = () => setExpanded(!expanded);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setExpanded(false);
    onSelect(item);
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
                icon={expanded ? "chevron-up" : "chevron-down"}
                onPress={handlePress}
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

        <Modal
          visible={expanded}
          onDismiss={handlePress}
          // animationIn="slideInUp"
          // animationOut="slideOutDown"
          contentContainerStyle={[
            stylesPrize.emojiList,
            { backgroundColor: theme.colors.background },
          ]}
        >
          {emojis.map((emoji, index) => (
            <IconButton
              key={index}
              icon={() => <Text style={stylesPrize.emoji}>{emoji}</Text>}
              onPress={() => handleSelect(emoji)}
              style={stylesPrize.emojiButton}
            />
          ))}
        </Modal>
    </View>
  );
}

const stylesPrize = StyleSheet.create({
  container: {
    width: "95%",
    maxWidth: 550,
    borderRadius: 10,
    overflow: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  textInput: {
    width: "100%",
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  emojiList: {
    marginHorizontal: "auto",
    width: "90%",
    maxWidth: 550,
    overflow: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 15,
    gap: 10,
    maxHeight: 300,
    borderRadius: 10,
  },
  emojiButton: {
    margin: 5,
  },
  emoji: {
    fontSize: 20,
  },
});
