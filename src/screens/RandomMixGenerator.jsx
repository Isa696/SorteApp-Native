import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { styles } from "../styles/container";
import { FAB, useTheme, Text, IconButton, Button } from "react-native-paper";
import ModalWinner from "../components/ModalWinner";
import Prize from "../components/Prize";

const RandomMixGenerator = () => {
  const theme = useTheme();
  const [visibleWinner, setVisibleWinner] = useState(false);
  const [winner , setWinner] = useState(null);
  const [prize, setPrize] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [fabVisible, setFabVisible] = useState(true);
  const [iconDisabled, setIconDisabled] = useState(false);

  const [items, setItems] = useState([
    { value: "0" },
    { value: "0" },
  ]);

  const changeItem = (index) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const currentValue = newItems[index].value;
      if (currentValue === "0") {
        newItems[index].value = "A";
      } else if (currentValue === "A") {
        newItems[index].value = "0A";
      } else {
        newItems[index].value = "0";
      }
      return newItems;
    });
  };

  const deleteItem = (index) => {
    if (items.length > 2) {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    setFabVisible(true);
  } else if (items.length === 2) {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    setIconDisabled(true);
  }
};

function handleFabPress () {
    setIconDisabled(false);
    if (items.length < 3) {
    setItems((prevItems) => [...prevItems, { value: "0" }]);
  } else if (items.length === 3) {
    setItems((prevItems) => [...prevItems, { value: "0" }]);
    setFabVisible(false);
  }
}
  function handleIconSelect (icon) {
    setSelectedIcon(icon);
    };

    const showModalWinner = () => setVisibleWinner(true);
    const hideModalWinner = () => {
      setVisibleWinner(false);
      setWinner("");
    };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Prize prize={prize} setPrize={setPrize} onSelect={handleIconSelect}/>
      <View
        style={[
          stylesItems.BgContainer,
          { backgroundColor: theme.colors.primary },
        ]}
      >
        {items.map((item, index) => (
          <View
            key={index}
            style={[
              stylesItems.itemContainer,
              { backgroundColor: theme.colors.secondary },
            ]}
          >
            <IconButton
              icon="swap-horizontal-variant"
              size={24}
              onPress={() => changeItem(index)}
              iconColor={theme.colors.text}
              rippleColor={theme.colors.accent}
            />
            <Text
              editable={false}
              style={[stylesItems.textItems, { color: theme.colors.text }]}
            >
              {item.value}
            </Text>

              <IconButton
              iconColor={theme.colors.text}
              disabled={iconDisabled}
              rippleColor={theme.colors.accent}
              icon="delete"
              size={24}
              onPress={() => deleteItem(index)}
              />
          </View>
        ))}

        {fabVisible && (
          <FAB
          color={theme.colors.text}
          style={{ backgroundColor: theme.colors.secondary }}
          icon="plus"
          onPress={() => handleFabPress()}
          />
        )}
      </View>
      <Button
        textColor={theme.colors.text}
        disabled={false}
        style={[
          stylesItems.button,
          styles.shadow,
          {
            backgroundColor: theme.colors.secondary,
            shadowColor: theme.colors.text,
          },
        ]}
        icon="shuffle-variant"
        onPress={() => showModalWinner()}
      >
        Sortear
      </Button>

      <ModalWinner
        hideModal={() => hideModalWinner()}
        visible={visibleWinner}
        stylesItems={stylesItems}
        error={""}
        textWinner={winner}
        textPrize={prize}
        iconPrize={selectedIcon}
      />
    </View>
  );
};

export default RandomMixGenerator;

const stylesItems = StyleSheet.create({
  BgContainer: {
    width: "90%",
    aspectRatio: 1,
    borderRadius: 1000,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    maxWidth: 550,
  },
  textMix: {
    fontWeight: "bold",
    height: 30,
    width: 45,
    fontSize: 24,
    textAlign: "center",
    marginVertical: 8,
  },
  itemContainer: {
    alignItems: "center",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxWidth: 500,
    margin: "auto",
  },
  button: {
    padding: 5,
    marginTop: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 4,
  },
});
