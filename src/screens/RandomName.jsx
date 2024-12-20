import React, { useEffect, useState } from "react";
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
import CustomBannerAd from "../components/CustomBannerAd";


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
  const [winnerIndex, setWinnerIndex] = useState(null);
  const [prize, setPrize] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [multiple, setMultiple] = useState(false);

  const showModalNames = () => setVisible(true);
  const hideModalNames = () => {
    setVisible(false);
    setNewName("");
    setError("");
    setMultiple(false);
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
  const hideModalWinner = () => {
    setVisibleWinner(false);
    setNewName("");
    setError("");
    setWinner(null);
    setWinnerIndex(null);
  };

// Función para agregar un solo nombre o múltiples nombres basados en el modo `multiline`
const addName = () => {
  if (newName.trim() === "") {
    setError("Por favor ingrese un nombre");
    return;
  }

  if (multiple) {
    // Si está en modo multilínea, llama a `addMultipleNames`
    addMultipleNames(newName);
  } else {
    // Modo de una sola línea
    if (names.some((name) => name.newName === newName.trim())) {
      setError("El nombre ya existe");
    } else {
      const updatedNames = [...names, { newName: newName.trim() }];
      setNames(updatedNames);
      console.log("Nombre único añadido:", updatedNames);
      setError("");
    }
  }

  setNewName("");
};

// Función para agregar múltiples nombres en caso de que `multiline` esté activado
const addMultipleNames = (inputText) => {
  const newNamesArray = inputText
    .split("\n")
    .map((name) => name.trim())
    .filter((name) => name !== "" && !names.some((n) => n.newName === name))
    .map((name) => {
      if (name.length > 20) {
        return name.slice(0, 20); // Trunca el nombre a 20 caracteres
      }
      return name;
    });

  if (newNamesArray.length === 0) {
    setError("Los nombres ya existen o están vacíos");
  } else {
    const updatedNames = [...names, ...newNamesArray.map((name) => ({ newName: name }))];
    setNames(updatedNames);
    console.log("Nombres añadidos:", updatedNames);
    setError("");
  }
};

useEffect(() => {
  console.log("names actualizado:", names);
}, [names]);

  const deleteName = (index) => {
    setNames(names.filter((_, i) => i !== index));
    };

    const changeName = (index) => {
      setNames(names.map((name, i) => (i === index ? { ...name, newName: newName.trim() } : name)));
      (newName.trim() === "") ? setError("Por favor ingrese un nombre") : setError("");
    };

    function handleWinner( names, showModalWinner, setWinner, setError) {
      setError("");
      if (names.length === 0) {
        setError("Hubo un error, intenta de nuevo");
        return;
      }
      const randomIndex = Math.floor(Math.random() * names.length);
      const randomName = names[randomIndex]?.newName;
      setWinner(randomName || "Sin ganador");
      setWinnerIndex(randomIndex);
      showModalWinner();
    };

    function handleIconSelect (icon) {
      setSelectedIcon(icon);
      };

      function handleMultipleNames () {
        multiple ? setMultiple(false) : setMultiple(true);
      };

  return (
    <View
    style={[styles.container, { backgroundColor: theme.colors.background }]}>

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
            icon="account-plus-outline"
            onPress={showModalNames}
          > Agregar Nombres</Button>
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
                  icon="pencil-outline"
                  size={20}
                  onPress={() => {showModalchange(index)}}
                />
                  <Pressable
                    onPress={() => {showModalchange(index)}}>
                    <Text style={[stylesItems.text, { color: theme.colors.text }]}>{`${index + 1}° ${item.newName}`}</Text>
                  </Pressable>
                <IconButton
                  mode="outlined"
                  iconColor={theme.colors.text}
                  rippleColor={theme.colors.accent}
                  style={{borderColor: theme.colors.accent}}
                  icon="delete"
                  size={20}
                  onPress={() => deleteName(index)}
                />
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
      allowMultiple={false}
      multiline={false}
      handleMultipleNames={handleMultipleNames}
      />
      {/* MODAL Agregar nombres */}
      <ModalInput
        hideModal={hideModalNames}
        visible={visible}
        handleBtn={addName}
        btnText={"Agregar"}
        iconBtn={"account-plus"}
        newName={newName}
        setNewName={setNewName}
        error={error}
        stylesItems={stylesItems}
        labelInput="Agregar nombre"
        allowMultiple={true}
        multiline={multiple}
        handleMultipleNames={handleMultipleNames}
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
        disabled={names.length < 2}
        style={[stylesItems.button,
          { backgroundColor: theme.colors.secondary},]}
        icon="shuffle-variant"
        onPress={() =>  handleWinner( names, showModalWinner, setWinner, setError, setCurrentIndex)}
      >Sortear</Button>

          <CustomBannerAd />
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
    justifyContent: "space-between",
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
