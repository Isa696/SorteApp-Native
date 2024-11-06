import React, { useState } from "react";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { styles } from "../styles/container";
import {
  useTheme,
  Text,
  Button,
  IconButton,
  Divider,
} from "react-native-paper";
import ModalWinner from "../components/ModalWinner";
import ModalInput from "../components/ModalInput";
import Prize from "../components/Prize";

const RandomName = () => {
  const theme = useTheme();
  const [names, setNames] = useState([]);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleWinner, setVisibleWinner] = useState(false);
  const [visibleChange, setVisibleChange] = useState(false);
  const [newName, setNewName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [winner , setWinner] = useState(null);
  const [prize, setPrize] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');

  const showModalNames = () => setVisible(true);
  const hideModalNames = () => {
    setVisible(false);
    setNewName("");
    setError("");
  };

  const showModalchange = (index) => {
    setVisibleChange(true)
    setNewName(names[index].newName);
    setCurrentIndex(index);
  };
  const hideModalchange = () => {
    setVisibleChange(false);
    setNewName("");
    setError("");
  };

  const showModalWinner = () => setVisibleWinner(true);
  const hideModalWinner = (currentIndex) => {
    setVisibleWinner(false);
    setNewName("");
    setError("");
    setWinner("");
    deleteName(currentIndex);
  };

  const addName = () => {

    if (newName.trim() === "") {
      setError("Por favor ingrese un nombre");
    } else if (names.includes(newName.trim())) {
      setError("El nombre ya existe");
    } else {
      setError("");
        setNames([...names, {newName: newName.trim()}]);
      }
      setNewName("");
    };

  const deleteName = (index) => {
    setNames(names.filter((_, i) => i !== index));
    };

    const changeName = (index) => {
      setNames(names.map((name, i) => (i === index ? { ...name, newName: newName.trim() } : name)));
      hideModalchange();
    };

    function handleWinner( names, showModalWinner, setWinner, setError, setCurrentIndex) {
      if (names.length === 0) {
        return setError("No hay nombres para ganar");
      }
      const randomIndex = Math.floor(Math.random() * names.length);
      const randomName = names[randomIndex].newName;
      setWinner(randomName);
      setCurrentIndex(randomIndex);
      showModalWinner();
    };

    function handleIconSelect (icon) {
      setSelectedIcon(icon);
      };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background, },
      ]}
    >
      <Prize prize={prize} setPrize={setPrize} onSelect={handleIconSelect}/>
      <View
        style={[
          stylesItems.BgContainer,
          styles.shadow,
          { backgroundColor: theme.colors.primary, shadowColor: theme.colors.text },
        ]}
      >
          <Button
            textColor={theme.colors.text}
            mode="elevated"
            style={[{ backgroundColor: theme.colors.secondary, }, stylesItems.button,]}
            icon="plus"
            onPress={showModalNames}
          >Agregar Nombres</Button>
        <View
          style={[
            stylesItems.itemContainer,
            styles.shadow,
            { backgroundColor: theme.colors.secondary, shadowColor: theme.colors.text },
          ]}
          >
          <FlatList
            data={names}
            keyExtractor={(item, index) => index.toString()}
            style={stylesItems.flatList}
            renderItem={({ item, index }) => (
              <>
              <View style={stylesItems.namesContainer}>
                <IconButton
                  mode="outlined"
                  iconColor={theme.colors.text}
                  rippleColor={theme.colors.accent}
                  style={{borderColor: theme.colors.accent}}
                  icon="delete"
                  size={20}
                  onPress={() => deleteName(index)}
                />
                  <Pressable
                    onPress={() => {showModalchange(index)}}>
                    <Text style={[stylesItems.text, { color: theme.colors.text }]}>{`${index + 1}° ${item.newName}`}</Text>
                  </Pressable>
                  </View>
                  <Divider
                  color={theme.colors.accent}
                  style={[stylesItems.divider, { backgroundColor: theme.colors.accent }]}/>
                  </>
            )}
          />
        </View>
      </View>

      {/* MODAL Modificar nombres */}
      <ModalInput
      hideModal={hideModalchange}
      visible={visibleChange}
      handleBtn={() => changeName(currentIndex)}
      btnText={"Cambiar"}
      iconBtn={"pencil"}
      newName={newName}
      setNewName={setNewName}
      error={error}
      stylesItems={stylesItems}
      labelInput="Cambiar nombre"
      />
      {/* MODAL Agregar nombres */}
      <ModalInput
        hideModal={hideModalNames}
        visible={visible}
        handleBtn={addName}
        btnText={"Agregar"}
        iconBtn={"plus"}
        newName={newName}
        setNewName={setNewName}
        error={error}
        stylesItems={stylesItems}
        labelInput="Agregar nombre"
      />

      <ModalWinner
        hideModal={() => hideModalWinner(currentIndex)}
        visible={visibleWinner}
        stylesItems={stylesItems}
        error={error}
        textWinner={winner}
        textPrize={prize}
        iconPrize={selectedIcon}
      />

      <Button
        textColor={theme.colors.text}
        mode="elevated"
        disabled={names.length === 0}
        style={[stylesItems.button,
          { backgroundColor: theme.colors.secondary},]}
        icon="shuffle-variant"
        onPress={() =>  handleWinner( names, showModalWinner, setWinner, setError, setCurrentIndex)}
      >Sortear</Button>
    </View>
  );
};

export default RandomName;

const stylesItems = StyleSheet.create({
  BgContainer: {
    width: "95%",
    maxWidth: 550,
    borderRadius: 50,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "60%",
    maxHeight: 600,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 4,
  },
  namesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
  },
  itemContainer: {
    alignItems: "center",
    borderRadius: 20,
    padding: 8,
    width: "90%",
    height: "70%",
    marginBottom: 10,
  },
  flatList: {
    width: "100%",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxWidth: 500,
    margin: "auto",
  },
  input: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  button: {
    padding: 5,
    marginTop: 10,
  },
  divider: {
    width: "100%",
    height: 1,
  },
});
