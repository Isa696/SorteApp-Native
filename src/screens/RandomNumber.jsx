import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { styles } from "../styles/container";
import {
  useTheme,
  Text,
  TextInput,
  Button,
} from "react-native-paper";
import ModalWinner from "../components/ModalWinner";
import Prize from "../components/Prize";
import CustomBannerAd from "../components/CustomBannerAd";

const RandomNumber = () => {
  const theme = useTheme();

  const [initialNumber, setInitialNumber] = useState("");
  const [finalNumber, setFinalNumber] = useState("");
  const [randomNumber, setRandomNumber] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [prize, setPrize] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');

  function handleIconSelect (icon) {
    setSelectedIcon(icon);
    };

  function generateRandomNumber(min, max, setRandomNumber, showModal) {
    min = parseInt(min, 10);
    max = parseInt(max, 10);
    if (isNaN(min) || isNaN(max)) {
      setError("Por favor ingrese números válidos");
    } else if (min < 0 || max < 0) {
      setError("Por favor ingrese números positivos");
    } else if (min > max) {
      setError("El número inicial debe ser menor que el final");
    } else {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      setRandomNumber(randomNumber);
    }
    showModal();
  }

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setError("");
    setInitialNumber("");
    setFinalNumber("");
    setRandomNumber("");
  };

  return (
    <View
    style={[styles.container, { backgroundColor: theme.colors.background }]}>


            <Prize prize={prize} setPrize={setPrize} onSelect={handleIconSelect}/>
      <View
        style={[
          stylesItems.BgContainer,
          { backgroundColor: theme.colors.primary },
        ]}
      >
        <View
          style={[
            stylesItems.numberInputContainer,
            { backgroundColor: theme.colors.accent },
            stylesItems.shadow,
          ]}
        >
          <Text style={[stylesItems.text, { color: theme.colors.text }]}>
            Desde
          </Text>
          <TextInput
            style={[
              stylesItems.input,
              stylesItems.shadow,
              { backgroundColor: theme.colors.secondary },
            ]}
            label="Número Inicial"
            mode="flat"
            keyboardType="numeric"
            placeholder="6 digitos maximos"
            textColor={theme.colors.text}
            maxLength={6}
            value={initialNumber}
            onChange={(e) => setInitialNumber(e.nativeEvent.text)}
          />
          <Text style={[stylesItems.text, { color: theme.colors.text }]}>
            Hasta
          </Text>
          <TextInput
            style={[
              stylesItems.input,
              stylesItems.shadow,
              { backgroundColor: theme.colors.secondary },
            ]}
            label="Número final"
            mode="flat"
            keyboardType="numeric"
            placeholder="6 digitos maximos"
            textColor={theme.colors.text}
            maxLength={6}
            value={finalNumber}
            onChange={(e) => setFinalNumber(e.nativeEvent.text)}
          />
        </View>
      </View>
      <Button
        textColor={theme.colors.text}
        disabled={!initialNumber || !finalNumber}
        style={[stylesItems.button, styles.shadow,
          { backgroundColor: theme.colors.secondary, shadowColor: theme.colors.text },]}
        icon="shuffle-variant"
        onPress={() =>
          generateRandomNumber(
            initialNumber,
            finalNumber,
            setRandomNumber,
            showModal
          )
        }
      >Sortear</Button>

      <ModalWinner
        hideModal={hideModal}
        visible={visible}
        error={error}
        textWinner={randomNumber}
        stylesItems={stylesItems}
        textPrize={prize}
        iconPrize={selectedIcon}
      />

        <CustomBannerAd />

    </View>
  );
};

export default RandomNumber;

const stylesItems = StyleSheet.create({
  BgContainer: {
    width: "90%",
    maxWidth: 550,
    aspectRatio: 1,
    borderRadius: 1000,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 4,
  },
  numberInputContainer: {
    alignItems: "center",
    borderRadius: 20,
    padding: 8,
    width: "60%",
    minHeight: 40,
    maxHeight: "70%",
  },
  input: {
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  modalContent: {
    padding: 20,
    margin: "auto",
    borderRadius: 10,
    maxWidth: 500,
  },
  button: {
    marginTop: 10,
  },
});
